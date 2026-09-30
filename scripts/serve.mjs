// 確認用のサーバー。GitHub Pages と同じように、サイトのフォルダを「/」として配信する
// 使い方: npm run serve （ブラウザで http://localhost:8123/ を開く）
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

// このファイルの 1 つ上（サイトのフォルダ）を配信する
export const siteRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
};

// port に 0 を渡すと、空いている番号が自動で選ばれる
export function startServer(port = 8123) {
  const server = http.createServer((req, res) => {
    let p = decodeURIComponent(new URL(req.url, "http://x").pathname);
    if (p.endsWith("/")) p += "index.html";
    const file = path.join(siteRoot, p);
    // サイトのフォルダの外（../ などで上にさかのぼった先）は見せない
    if (!file.startsWith(siteRoot)) {
      res.writeHead(403);
      return res.end();
    }
    fs.readFile(file, (err, data) => {
      if (err) {
        res.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
        return res.end("404 " + p);
      }
      res.writeHead(200, { "content-type": types[path.extname(file)] || "application/octet-stream" });
      res.end(data);
    });
  });
  return new Promise((resolve) => server.listen(port, () => resolve(server)));
}

// node scripts/serve.mjs として直接実行されたときだけ、サーバーを起動したままにする
if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const server = await startServer(Number(process.argv[2]) || 8123);
  console.log(`http://localhost:${server.address().port}/ （止めるときは Ctrl + C）`);
}
