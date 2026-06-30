# LuQvia 公開前チェックリスト v13

このフォルダは、GitHub Pagesにそのままアップロードしやすいように整理した公開前最終版です。

## 公開用ファイル構成

```text
/
├ index.html
├ styles.css
├ script.js
├ robots.txt
├ sitemap.xml
├ hp-production-shizuoka/
├ cost-performance/
├ high-quality/
├ line-form/
├ recruit-site/
├ beauty-salon/
└ restaurant/
```

## 反映済みページ

1. トップページ
2. 静岡のHP制作 `/hp-production-shizuoka/`
3. コスパ重視のHP制作 `/cost-performance/`
4. 高品質HP制作 `/high-quality/`
5. 公式LINE・申込フォーム導線構築 `/line-form/`
6. 採用ページ制作 `/recruit-site/`
7. 美容サロン向けHP制作 `/beauty-salon/`
8. 飲食店向けHP制作 `/restaurant/`

## 反映済みURL

- 無料導線診断フォーム: https://forms.gle/LFzrDn36osnjPEd6A
- 公式LINE: https://lin.ee/nTfIJLT

## 公開前に必ず差し替える箇所

現在、以下の仮URLが入っています。

```text
https://YOUR_GITHUB_PAGES_URL/
```

GitHub Pages公開URLが確定したら、全ファイル内の以下を実URLへ一括置換してください。

```text
https://YOUR_GITHUB_PAGES_URL/
```

例：

```text
https://axis-agency.github.io/LuQvia/
```

対象：

- `sitemap.xml`
- `robots.txt`
- 各HTMLの `canonical`
- 将来設定するOGP画像URL

## 公開前チェック

- [ ] トップページが表示される
- [ ] 7つの下層ページが表示される
- [ ] 無料診断フォームリンクが開く
- [ ] 公式LINEリンクが開く
- [ ] スマホ表示で文字が崩れない
- [ ] 固定CTAが邪魔すぎない
- [ ] `sitemap.xml` のURLを実URLに差し替えた
- [ ] `robots.txt` のURLを実URLに差し替えた
- [ ] Google Search Consoleに登録した
- [ ] サイトマップを送信した
- [ ] URL検査でトップページのインデックス登録をリクエストした

## 公開後に行う改善

1. OGP画像 `ogp.png` を作成
2. トップページに制作サンプルの実URLを接続
3. 各ページ間の内部リンクをさらに強化
4. 実績・お客様の声を追加
5. 写真・スクリーンショットを追加
6. ブログ/コラムまたは事例ページを追加


## v14追加チェック

- [ ] `ogp.png` がアップロードされている
- [ ] 各HTMLの `og:image` が実URLになっている
- [ ] 各HTMLの `twitter:image` が実URLになっている
- [ ] LINEでURL共有時にOGP画像が表示される
