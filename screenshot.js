const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function takeScreenshot() {
  console.log('啟動瀏覽器...');
  
  const browser = await puppeteer.launch({
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
      '--window-size=1920,1080'
    ]
  });

  try {
    const page = await browser.newPage();
    
    // 設置視窗大小
    await page.setViewport({
      width: 1920,
      height: 1080,
      deviceScaleFactor: 1
    });

    console.log('導航到目標網站...');
    await page.goto('https://jacobhsu.github.io/crypto-watch/ma', {
      waitUntil: 'networkidle0',
      timeout: 60000
    });

    // 等待 TradingView 圖表完全載入
    console.log('等待圖表載入...');
    await page.waitForTimeout(15000);

    // 確保截圖目錄存在
    const screenshotDir = path.join(__dirname, 'screenshots');
    if (!fs.existsSync(screenshotDir)) {
      fs.mkdirSync(screenshotDir, { recursive: true });
    }

    // 生成時間戳 (僅用於顯示)
    const now = new Date();
    
    // 只保存固定檔名的截圖
    const fixedFilename = path.join(screenshotDir, 'crypto-watch-latest.png');

    console.log('拍攝截圖...');
    
    // 拍攝完整頁面截圖
    const screenshot = await page.screenshot({
      fullPage: false,
      type: 'png'
    });

    // 只保存固定檔名的截圖 (覆蓋舊版本)
    fs.writeFileSync(fixedFilename, screenshot);
    console.log(`截圖已保存: ${fixedFilename}`);

    // 創建或更新 index.html 來顯示最新截圖
    const indexHtml = `<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Crypto Watch - 最新截圖</title>
    <style>
        body {
            margin: 0;
            padding: 20px;
            background-color: #131722;
            color: white;
            font-family: Arial, sans-serif;
            text-align: center;
        }
        .container {
            max-width: 1920px;
            margin: 0 auto;
        }
        .timestamp {
            margin-bottom: 20px;
            font-size: 18px;
            color: #888;
        }
        .screenshot {
            width: 100%;
            max-width: 1920px;
            height: auto;
            border: 1px solid #333;
            border-radius: 8px;
        }
        .refresh-info {
            margin-top: 20px;
            font-size: 14px;
            color: #666;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Crypto Watch - 最新截圖</h1>
        <div class="timestamp">
            最後更新時間: ${now.toLocaleString('zh-TW', { timeZone: 'Asia/Taipei' })} (台北時間)<br>
            UTC 時間: ${now.toISOString().replace('T', ' ').slice(0, 19)}
        </div>
        <img src="crypto-watch-latest.png" alt="Crypto Watch Screenshot" class="screenshot">
        <div class="refresh-info">
            此截圖每小時自動更新一次
        </div>
    </div>
</body>
</html>`;

    fs.writeFileSync(path.join(screenshotDir, 'index.html'), indexHtml);
    console.log('index.html 已更新');

    console.log('截圖任務完成！');

  } catch (error) {
    console.error('截圖過程中發生錯誤:', error);
    throw error;
  } finally {
    await browser.close();
  }
}

// 執行截圖
takeScreenshot().catch(error => {
  console.error('截圖失敗:', error);
  process.exit(1);
});