# DaDablock Documentation

This repository contains the DaDablock VitePress multi-version documentation
site. The source files live under `content/<version>/docs/` and are copied into
`docs/docs/` by the versioned dev/build scripts.

## Local development

Install dependencies and start the local documentation server:

```bash
npm ci
npm run dev:latest
npm run dev:standard-kit
npm run dev:advanced-kit
npm run dev:ultimate-kit
```

Build the production site and stage the artifacts:

```bash
npm run docs:build
npm run docs:stage-main
npm run build:all
```

The staged production files are generated in:

```text
projects/DaDablock/en/latest/
projects/DaDablock/en/standard-kit/
projects/DaDablock/en/advanced-kit/
projects/DaDablock/en/ultimate-kit/
```

## GitHub Pages deployment

The build artifacts under `projects/` are committed to the repository. Open
**Settings > Pages**, select **Deploy from a branch**, and choose **main** and
**/(root)**. Do not bind a custom domain.

The GitHub Pages direct URL is:

```text
https://Hiwonder-docs.github.io/DaDablock-vite/projects/DaDablock/en/latest/
```

The public-facing URL (via the baota Nginx reverse proxy) is:

```text
https://wiki.hiwonder.com/projects/DaDablock/en/latest/docs/index.html
https://wiki.hiwonder.com/projects/DaDablock/en/standard-kit/docs/1_Product_Introduction.html
https://wiki.hiwonder.com/projects/DaDablock/en/advanced-kit/docs/1_Product_Introduction.html
https://wiki.hiwonder.com/projects/DaDablock/en/ultimate-kit/docs/1_Product_Introduction.html
```
