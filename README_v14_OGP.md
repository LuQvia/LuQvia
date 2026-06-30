# LuQvia HP v14 OGP Ready

v13公開前最終版に、正式OGP画像 `ogp.png` を追加した版です。

## 追加内容

- `ogp.png` を追加
- サイズ：1200px × 630px
- 各HTMLに `og:image` を追加
- 各HTMLに `twitter:image` を追加

## OGP画像の内容

- LuQvia
- 静岡のHP制作・LINE導線構築
- HPを作るだけで終わらせない
- 問い合わせ・予約・応募につながる導線まで設計
- HP → LINE → FORM → 申込

## 公開前に必ず差し替えるURL

現在、HTML・sitemap・robotsには仮URLが入っています。

```text
https://YOUR_GITHUB_PAGES_URL/
```

GitHub Pages公開URLが決まったら、実URLへ一括置換してください。

例：

```text
https://axis-agency.github.io/LuQvia/
```

## 確認項目

- LINEでURL共有した時に画像が出るか
- XやFacebookでURL共有した時に画像が出るか
- OGP画像の文字がスマホでも読めるか
- 公開URLに置換後、`ogp.png` が直接開けるか
