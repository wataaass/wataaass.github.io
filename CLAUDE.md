# CLAUDE.md

## コーディングとテスト検証の分担

- コードを書く作業とテストの検証は、OpenCode Go の DeepSeek V4.1 Flash に任せる（deepseek-coder スキルの手順に従う）。Claude は設計・指示・レビューを担当する
- 使うモデルは OpenCode Go のもの。無料版（`opencode/deepseek-v4.1-flash-free`）は使わない
- reasoning effort は high にする（`--variant high`）
- 実行例: `opencode run -m opencode-go/<DeepSeek V4.1 Flash のモデル ID> --variant high --dir "<プロジェクト>" "<指示文>"`
  - モデル ID は `opencode models opencode-go` で確かめる
- OpenCode Go の API キーが環境にない、またはモデルが見つからないときは、無料版に切り替えずユーザーに知らせる
