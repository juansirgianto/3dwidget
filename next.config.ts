// next.config.js
const isProd = process.env.NODE_ENV === 'production';
const repo = 'nama-repository-kamu'; // ganti!

module.exports = {
  output: 'export',                 // <-- penting: static export ke /out
  basePath: isProd ? `/${repo}` : '',     // untuk path di GitHub Pages (project pages)
  assetPrefix: isProd ? `/${repo}/` : '', // supaya CSS/JS/assets ketemu
  images: { unoptimized: true },    // GitHub Pages tidak support next/image loader
  trailingSlash: true,              // aman untuk hosting static
};