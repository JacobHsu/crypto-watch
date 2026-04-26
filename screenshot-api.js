const https = require('https');
const fs = require('fs');
const path = require('path');

const pages = [
  { url: 'https://jacobhsu.github.io/crypto-watch/btc', file: 'screenshots/btc.png' },
  { url: 'https://jacobhsu.github.io/crypto-watch/eth', file: 'screenshots/eth.png' },
];

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, res => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        https.get(res.headers.location, r => r.pipe(file).on('finish', resolve)).on('error', reject);
      } else {
        res.pipe(file).on('finish', resolve);
      }
    }).on('error', reject);
  });
}

async function main() {
  const screenshotDir = path.join(__dirname, 'screenshots');
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }

  for (const { url, file } of pages) {
    const apiUrl = `https://api.microlink.io?url=${encodeURIComponent(url)}&screenshot=true&waitForTimeout=15000&viewport.width=1920&viewport.height=1080&viewport.deviceScaleFactor=1`;
    console.log(`截圖 ${url} ...`);
    const result = await fetchJson(apiUrl);
    if (result.status === 'success') {
      await downloadFile(result.data.screenshot.url, file);
      console.log(`已儲存 ${file}`);
    } else {
      console.error(`失敗 (${url}):`, result.message || result.status);
      process.exit(1);
    }
  }

  console.log('完成！');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
