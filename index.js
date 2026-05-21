const express = require("express");
const cron = require("node-cron");
const { Client, GatewayIntentBits } = require("discord.js");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ]
});

app.use(express.static("public"));

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    bot: client.user ? client.user.tag : "not ready",
    time: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`網站已啟動：http://localhost:${PORT}`);
});

const loveWords = [
  "你是不是近視？怎麼看不出我喜歡你。",
  "你是不是魔法師？不然怎麼一下子就把我心偷走了。",
  "你知道你像什麼嗎？像我未來的另一半。",
  "你是不是路痴？不然你怎麼一直在我心裡徘徊。",
  "你是不是太陽？怎麼看到你就暖暖的。",
  "你是不是披著人皮的小鹿？怎麼總在我心裡亂撞。",
  "我最近很emo耶。e直momo（默默）想著你。",
  "我有兩個心願，在你身邊和你在身邊。",
  "你是不是喜歡我？找出這句話中重複的字。",
  "你幹嘛害我！害我那麼喜歡你。",
  "你能不能閉嘴？因為我滿腦子都是你的聲音。",
  "告訴你一個壞消息，我對你的思想不單純了。",
  "你能不能好好走路，都撞到我的心口了。",
  "談戀愛挺麻煩的，那以後就麻煩你了。",
  "距離不是問題，你離我不夠近才是問題。",
  "偷偷跟你講，我都有超能力，就是超喜歡你。",
  "老虎不發威，你當我男/女朋友吧。",
  "有謠言說我喜歡你。我澄清一下，那不是謠言。",
  "猜猜我的心在哪邊？左邊。錯，在你那邊。",
  "你臉上有東西，有點帥氣/可愛。",
  "見到你之後我只想成為一種人，就是你的人。",
  "我一向看人很準的，你一看就知道是我的人。",
  "我覺得我現在越來越不像自己了。比較像你男/女朋友。",
  "我沒辦法跟你玩123木頭人耶。因為一看到你，我就心動。",
  "我好像買到假的甜心卡耶？裡面沒有你。",
  "你喜歡喝水嗎？喜歡？那你已經喜歡上70%的我囉！",
  "世界上有兩種人是最可愛的，第一種是記性差的。第二種？上次不是有跟你說過嗎，你記性很差耶。",
  "你是不是作弊？不然你怎麼總是在我心裡得到滿分。",
  "想跟你講一段有點長的故事，但我就長話短說好了。我喜歡你，很久了。",
  "你跑得快嗎？不然我怕我追不到。",
  "你現在可以喜歡我嗎？不行的話，我等等再問一次。",
  "你爸爸是不是怪盜？不然怎麼能把天上的星星偷下來放在你眼裡。",
  "你可以幫我指路嗎？走到你心裡的路。",
  "我最近要找新工作。請問當你的男/女朋友要到哪裡面試？",
  "我跟你沒什麼好談的，除了戀愛。",
  "你會喜歡我嗎？不會我可以教你。",
  "你早起，我早起，我們遲早在一起。",
  "你是不是WiFi？不然我怎麼一靠近就自動連線。",
  "我剛剛去算命，算命師說我命中缺你。",
  "我沒有很會聊天，但跟你可以聊到忘記時間。",
  "我手機最近怪怪的，拿起來就會打給你。",
  "我沒有很會告白，但我很會喜歡你。",
  "不要抱怨，抱我。",
  "我做事十拿九穩，差的那一穩，是你的吻。",
  "我最喜歡的酒，是和你天長地久。",
  "我是九你是三，除了你還是你。",
  "我覺得你這個人不適合跟我談戀愛，適合跟我結婚。",
  "你知道你和星星有什麼區別嗎？星星在天上，你在我心裡。",
  "這是我的手背，這是我的腳背，這是我的寶貝。",
  "我最近買了一塊地。對你的死心塌地。",
  "你累不累啊？不累？可是你都在我腦裡跑了一天了欸！",
  "你知道我為什麼感冒嗎？因為我對你完全沒有抵抗力。",
  "莫文蔚的陰天，孫燕姿的雨天，周杰倫的晴天，都不如有你的每一天。",
  "你知道我和唐僧有什麼不一樣嗎？唐僧取經，我娶你。",
  "想說些漂亮的話哄你，但想來想去，最漂亮的只有你。",
  "你知道我最怕什麼嗎？最怕失去你。",
  "如果我是魚，那你就是水，沒有你我活不下去。",
  "我結婚你一定要來，沒有新郎/新娘會很尷尬。",
  "落葉歸根，我歸你。",
  "我想你一定很忙，所以你只看前三個字就好。",
  "我不能跟你玩捉迷藏，因為像你這麼完美的人，我找不到了。",
  "你知道我是什麼系的嗎？某哩挖欸系（台語：沒有你我會死）。",
  "我好像變心了。比起昨天的你，我又更喜歡今天的你。",
  "你可以把你的位置發給我嗎？我想看我的心跑去哪了。",
  "最近一直熬夜，你可以叫我小心肝嗎？",
  "和你一起吃魚，我吃魚頭就好。因為我想把魚身（餘生）留給你。",
  "我想當你的馬，因為我想聽你說一聲「嫁！」",
  "我和你猜拳都只能出剪刀，因為你是我的拳布。",
  "如果女人是水做的，那你應該是海水，因為你顏值（鹽質）很高。",
  "你長得很像我親戚欸。長得像我媽的媳婦/女婿。",
  "你知道牆壁、眼睛、膝蓋的英文嗎？Wall（我）、Eye（愛）、Knee（你）。",
  "以後我要對你尊稱「您」了。因為你在我心上。",
  "最好不要再讓我看到你，不然我看你一次，就喜歡你一次。",
  "你是不是學音樂的？不然怎麼總是撥動我的心弦？",
  "我可以繞著你轉一圈嗎？這樣就可以環遊世界了！",
  "貴重物品要帶在身上。那我可要緊緊牽著你才行。",
  "好想去喝酒喔。喝我們的喜酒。",
  "昨天我夢到我娶妳，但人家都說夢境是相反的，所以現實應該是妳嫁給我。",
  "我好像有點太花心了，你的每個樣子我都好喜歡。",
  "我覺得你可能要稍微減肥一下，不然你一個人就塞滿我的心了。",
  "我最近體重變重了，因為心裡裝了你。",
  "我本來方向感很好，遇到你之後，怎麼走都走到你那。",
  "我本來想好好做人，結果一遇到你就只想當你的人。"
];

let lastSentDate = null;
let todayRandomHour = null;
let todayRandomMinute = null;

function drawTodayRandomTime() {
  // 預設每天台灣時間 09:00～20:59 之間隨機發送
  todayRandomHour = Math.floor(Math.random() * 12) + 9;
  todayRandomMinute = Math.floor(Math.random() * 60);

  console.log(
    `今天預計發送時間：${todayRandomHour}:${String(todayRandomMinute).padStart(2, "0")}`
  );
}

async function getRandomMember(guild) {
  await guild.members.fetch();

  const members = guild.members.cache.filter(member => {
    return !member.user.bot;
  });

  const memberArray = Array.from(members.values());

  if (memberArray.length === 0) {
    return null;
  }

  const randomIndex = Math.floor(Math.random() * memberArray.length);
  return memberArray[randomIndex];
}

async function sendLoveMessage() {
  try {
    const channel = await client.channels.fetch(process.env.CHANNEL_ID);

    if (!channel) {
      console.log("找不到指定頻道，請確認 CHANNEL_ID 是否正確");
      return;
    }

    const guild = channel.guild;
    const randomMember = await getRandomMember(guild);

    if (!randomMember) {
      await channel.send("今天找不到可以告白的人 QQ");
      return;
    }

    const randomLoveWord = loveWords[Math.floor(Math.random() * loveWords.length)];

    await channel.send(`${randomMember} ${randomLoveWord}`);

    console.log(`已發送情話給：${randomMember.user.tag}`);
  } catch (error) {
    console.error("發送情話失敗：", error);
  }
}

function getTaiwanDateString() {
  return new Date().toLocaleDateString("zh-TW", {
    timeZone: "Asia/Taipei"
  });
}

function getTaiwanHourMinute() {
  const now = new Date();

  const parts = new Intl.DateTimeFormat("zh-TW", {
    timeZone: "Asia/Taipei",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  }).formatToParts(now);

  const hour = Number(parts.find(part => part.type === "hour").value);
  const minute = Number(parts.find(part => part.type === "minute").value);

  return { hour, minute };
}

function startRandomDailySchedule() {
  drawTodayRandomTime();

  cron.schedule(
    "* * * * *",
    async () => {
      const taiwanDate = getTaiwanDateString();
      const { hour, minute } = getTaiwanHourMinute();

      if (lastSentDate !== null && lastSentDate !== taiwanDate) {
        drawTodayRandomTime();
      }

      if (
        lastSentDate !== taiwanDate &&
        hour === todayRandomHour &&
        minute === todayRandomMinute
      ) {
        await sendLoveMessage();
        lastSentDate = taiwanDate;
      }
    },
    {
      timezone: "Asia/Taipei"
    }
  );
}

client.once("ready", () => {
  console.log(`Discord Bot 已上線：${client.user.tag}`);
  startRandomDailySchedule();
});

client.on("messageCreate", async message => {
  if (message.author.bot) return;

  // 手動測試：輸入 !情話 就會馬上隨機 @ 一個人
  if (message.content === "!情話") {
    await sendLoveMessage();
  }
});

client.login(process.env.DISCORD_TOKEN);
