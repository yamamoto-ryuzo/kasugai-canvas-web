# kasugai-canvas-web

KASUGAI Canvas のエンジン(`web/` 一式)を静的配信する公開ホスト。

QGIS プラグイン `geo_webview` が出力する `.kasc`+`DATA/` を、
KASUGAI Canvas 未インストール環境でもブラウザ再生できるようにする
ための CDN 的な配信先。`https://yamamoto-ryuzo.github.io/kasugai-canvas-web/`
で GitHub Pages 公開。

## 構成(ステージ選択)

| パス | 内容 | 更新元 |
|---|---|---|
| `stable/` | 安定版(既定の起動先) | kasugai_canvas 公開リリース時に unstable から格上げ |
| `unstable/` | 開発版 | kasugai_canvas `develop` ブランチの `web/` |
| `latest/` | `stable/` への互換リダイレクト | - |
| `index.html` | `stable/` へのリダイレクト | - |
| `channels.json` | 各ステージの現在バージョン | 同期時に更新 |

各ステージ配下は `index.html` / `cesium/` `maplibre/` `openlayers/`
`leaflet/` / `shared/` `lib/` `projects/` / `version.json` の構成。

## GitHub Pages での公開

本リポジトリは `main` ブランチのルートがそのまま GitHub Pages で公開されます。

- **公開 URL**: `https://yamamoto-ryuzo.github.io/kasugai-canvas-web/`
- ルート `index.html` は `stable/` へリダイレクトされるため、
  ベース URL にアクセスするだけで安定版が開きます
- **エンジンを直接開く**: `…/kasugai-canvas-web/<stage>/<engine>/`
  - 例: `…/stable/cesium/` `…/stable/maplibre/` `…/unstable/openlayers/`
- **`.kasc` プロジェクトを開く**: `?kasc=<url>` を付与
  - 例: `…/stable/cesium/?kasc=https://example.com/project.kasc`
- 公開されるのは git にコミット済みのファイルのみ。
  `.gitignore` 対象の `guide/` などローカルファイルは配信されません

## 正本と更新ルール

- **正本は `yamamoto-ryuzo/kasugai_canvas` の `web/`**。このリポジトリは
  発行物のみ置き、直接編集しない
- `unstable/` は develop の `web/` を同期、`stable/` はリリース時に
  検証済み unstable の中身をそのままコピーして格上げ(再ビルドしない)
- 使い方: `https://yamamoto-ryuzo.github.io/kasugai-canvas-web/<stage>/<engine>/?kasc=<url>`

## ライセンス

[MIT License](LICENSE)。コンテンツの正本は `yamamoto-ryuzo/kasugai_canvas` の `web/` であり、ライセンスも正本に準じます。

## git 管理外

- `guide/` — ローカル作業用ディレクトリ（ガイド用スクリーンショット等）。`.gitignore` で除外し、公開・同期の対象外とする
