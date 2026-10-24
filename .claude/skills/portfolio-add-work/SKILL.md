---
name: portfolio-add-work
description: このサイトに作品を追加・更新する。「作品を追加して」「〜を作品に載せて」「作品ページを作って」で使う。作品ページ、作品一覧、タイムライン、README をまとめて更新する。
---

# portfolio-add-work

最後まで Claude が進める。ただし経歴にあたる事実（制作期間、役割分担など）は推測で書かない。

**1. 材料**: 作品名、ファイル名（英小文字とハイフン）、制作期間（開始日と終了日、または制作中）、制作時の学年、使った AI ツールとモデル、使った技術、自分と AI の役割、作った理由・工夫・学んだこと、URL（あれば）。指示文、作品のリポジトリ（README、DECISIONS.md、git log）、study-log から埋め、残った事実だけを質問機能でまとめて聞く。

**2. 作品ページ**: `cp works/portfolio-site.html works/<名前>.html` で複製し、変わる部分だけ Edit で書き換える（全文を書き直さない）。直すのは `<title>`、description、og:*、`work-date` と最後の奥付（`work-okuzuke`）の両方の制作期間、本文の3節（作った理由・工夫したところ・学んだこと）。本文は本人の答えから書き、natural-japanese で推敲する。

**3. ほかのページ**:
- `works/index.html` の `<ol class="catalog">` に行を足す（制作開始の新しい順なので上に）
- 節目なら `timeline.html` の `<ol class="timeline">` に足す（古い順なので日付の位置に）
- 最終更新日（全ページのフッターと README）を今日にする。portfolio-edit-common の手順でまとめて置換する
- README のページ構成は `works/*.html` でまとめてあるので足さない。新しく決めたことがあれば「設計上の判断」に「何を：なぜ」で足す

**4. 確認**: `npm run check` を実行し、新しいページを表示して確かめる。公開は portfolio-publish で行う。
