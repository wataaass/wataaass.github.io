# CLAUDE.md

## コーディングとテスト検証の分担

- Claude が司令塔、OpenCode Go の DeepSeek V4.1 Flash が実働役（deepseek-coder スキルの手順に従う）
  - Claude: 方針を決め、作業を小さく分け、DeepSeek への指示文を書く。返ってきた変更を `git diff` で読み、結果を確かめてユーザーに報告する
  - DeepSeek: コードを書く。テストを書いて実行する
  - Claude は自分でコードを書かない。直すときも DeepSeek に具体的に再依頼する
- 使うモデルは OpenCode Go のもの。無料版（`opencode/deepseek-v4.1-flash-free`）は使わない
- reasoning effort は high にする（`--variant high`）
- 実行例: `opencode run -m opencode-go/deepseek-v4.1-flash --variant high --dir "<プロジェクト>" "<指示文>"`
- クラウドでは API キーを Network secrets（`opencode.ai` 宛て）に置いている。opencode に OpenCode Go を認識させるため、環境変数 `OPENCODE_API_KEY` が空なら `OPENCODE_API_KEY=dummy` を付けて実行する
- OpenCode Go の API キーが環境にない、またはモデルが見つからないときは、無料版に切り替えずユーザーに知らせる
