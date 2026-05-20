# 每日土味情話 Discord Bot

這是一個可以部署到 Render 的 Discord 機器人。

## 功能

- 每天台灣時間 09:00～20:59 之間隨機一個時間發送
- 隨機 @ 一位 Discord 伺服器成員
- 隨機抽一句土味情話
- 可以用 `!情話` 手動測試
- 內建網站狀態頁與 `/health`，可給 UptimeRobot ping

## 本機啟動

```bash
npm install
cp .env.example .env
npm start
```

請把 `.env` 裡面的內容改成自己的資料：

```env
DISCORD_TOKEN=你的DiscordBotToken
CHANNEL_ID=你的Discord頻道ID
PORT=3000
```

## Discord Developer Portal 必開

到 Discord Developer Portal → Bot → Privileged Gateway Intents，打開：

- SERVER MEMBERS INTENT
- MESSAGE CONTENT INTENT

## Render 部署

Build Command：

```bash
npm install
```

Start Command：

```bash
npm start
```

Environment Variables：

```env
DISCORD_TOKEN=你的DiscordBotToken
CHANNEL_ID=你的Discord頻道ID
PORT=3000
```

## UptimeRobot

監控網址：

```txt
https://你的render網址.onrender.com/health
```
