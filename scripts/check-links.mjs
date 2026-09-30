// サイト内の全ページを巡回し、内部リンク・CSS・JS・画像の参照先が存在するか確認する
// 使い方: npm run links （確認用サーバーの起動と停止も自動で行う）
import fs from "node:fs";
import { siteRoot, startServer } from "./serve.mjs";

// サイトのフォルダにある HTML をすべて探す（作品ページを増やしても書き直さなくてよい）
const pages = fs
  .readdirSync(siteRoot, { recursive: true })
  .map((f) => f.replaceAll("\\", "/"))
  .filter((f) => f.endsWith(".html") && !f.startsWith("node_modules/"));

// 空いている番号でサーバーを起動する（npm run serve と同時に動かしてもぶつからない）
const server = await startServer(0);
const base = `http://localhost:${server.address().port}/`;

const checked = new Map(); // 同じ参照先を何度も確認しないための記録
let bad = 0;
for (const p of pages) {
  const url = new URL(p, base);
  const html = await (await fetch(url)).text();
  console.log(url.pathname);
  const refs = [...html.matchAll(/(?:href|src)="([^"]+)"/g)].map((m) => m[1]);
  for (const r of refs) {
    // 外部サイト・ページ内の移動・埋め込みデータは対象外
    if (/^(https?:|mailto:|#|data:)/.test(r)) continue;
    const target = new URL(r, url);
    target.hash = "";
    if (!checked.has(target.href)) checked.set(target.href, (await fetch(target)).status);
    const status = checked.get(target.href);
    if (status !== 200) {
      bad++;
      console.log(`  NG ${status} ${r} -> ${target.pathname}`);
    }
  }
}
server.close();

console.log(bad === 0 ? `${pages.length} ページ: すべてのリンク先が存在します` : `リンク切れ ${bad} 件`);
// リンク切れがあれば「失敗」として終わる（npm run check が途中で止まる）
if (bad > 0) process.exitCode = 1;
