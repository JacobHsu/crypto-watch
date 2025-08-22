# GitHub 自動截圖設定指南

## 🔧 必要設定步驟

### 1. 啟用 GitHub Actions
1. 前往你的 repository 頁面
2. 點擊 **Settings** 標籤
3. 在左側選單點擊 **Actions** > **General**
4. 確保選擇 **"Allow all actions and reusable workflows"**
5. 點擊 **Save**

### 2. 設定 Actions 權限
在同一個 Actions > General 頁面：
1. 滾動到 **"Workflow permissions"** 區域
2. 選擇 **"Read and write permissions"**
3. 勾選 **"Allow GitHub Actions to create and approve pull requests"**
4. 點擊 **Save**

### 3. 啟用 GitHub Pages
1. 前往 **Settings** > **Pages**
2. 在 **"Source"** 選擇 **"Deploy from a branch"**
3. 選擇 **"main"** branch 和 **"/ (root)"** folder
4. 點擊 **Save**
5. 等待幾分鐘讓 Pages 部署完成

### 4. 檢查 Repository 可見性
- 確保 repository 是 **Public**（或者如果是 Private，確保有 GitHub Pro/Team 方案）

## 🧪 測試設定

### 手動觸發 Actions
1. 前往 **Actions** 標籤
2. 選擇 **"Hourly Crypto Watch Screenshot"** workflow
3. 點擊 **"Run workflow"** 按鈕
4. 選擇 **main** branch
5. 點擊綠色的 **"Run workflow"** 按鈕

### 檢查執行狀態
- 在 Actions 頁面查看工作流程是否成功執行
- 如果失敗，點擊失敗的執行查看錯誤日誌

## 🔍 常見問題排除

### 如果 Actions 執行失敗
1. **權限問題**: 確認已設定 "Read and write permissions"
2. **網站無法訪問**: 確認 GitHub Pages 已啟用且網站可正常訪問
3. **依賴安裝失敗**: 檢查 package.json 是否正確

### 如果截圖空白或載入失敗
- 增加等待時間（目前是 15 秒）
- 檢查目標網站 https://jacobhsu.github.io/crypto-watch/ma 是否正常運行

### 如果無法訪問截圖
1. 確認 GitHub Pages 已正確設定
2. 等待 Pages 部署完成（可能需要幾分鐘）
3. 檢查 repository 是否為 public

## 📋 設定檢查清單

- [ ] GitHub Actions 已啟用
- [ ] Actions 權限設為 "Read and write permissions"
- [ ] GitHub Pages 已啟用並設定為 main branch
- [ ] Repository 為 Public 或有適當的 GitHub 方案
- [ ] 手動觸發 Actions 測試成功
- [ ] 可以訪問 GitHub Pages 網站
- [ ] 截圖文件已生成在 screenshots/ 目錄

## 🎯 預期結果

設定完成後，你應該能夠：
1. 在 Actions 頁面看到成功執行的工作流程
2. 在 repository 的 screenshots/ 目錄看到 crypto-watch-latest.png
3. 通過以下 URL 訪問截圖：
   - https://your-username.github.io/crypto-watch/screenshots/crypto-watch-latest.png
   - https://your-username.github.io/crypto-watch/screenshots/

## ⏰ 自動執行時間

- 系統會在每小時的整點（UTC 時間）自動執行
- 例如：00:00, 01:00, 02:00... UTC 時間