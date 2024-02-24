import { conversations, createConversation } from "@grammyjs/conversations";
import { Bot, MemorySessionStorage, webhookCallback } from "grammy";
import { MyContext, setupSession } from "./session/session";
import { startConversation } from "./conversation/conversation";
import { dowloadConversation } from "./conversation/dowload.conversation";
import { autoChatAction } from "@grammyjs/auto-chat-action";
import dotenv from 'dotenv'
import config from "./config/config";
import express from "express";


dotenv.config()
const bot = new Bot<MyContext>(config.TOKEN)

setCommands()
async function setCommands() {
  await bot.api.setMyCommands([
    {
      command: 'start',
      description: 'start bot'
    }
  ])
}



bot.use(setupSession())
bot.use(conversations())
bot.use(createConversation(startConversation))
bot.use(createConversation(dowloadConversation))
bot.use(autoChatAction())



bot.command('start', async (ctx) => {
  await ctx.reply('Бот работает уже!')
  await ctx.conversation.enter('startConversation')

})

bot.on("message::url", async (ctx) => {
  await ctx.conversation.enter('dowloadConversation')
})

bot.catch((error) => {
  console.log(error);

})

if (config.NODE_ENV === 'DEVELOPMENT') {
  bot.api.deleteWebhook();
  bot.start({
    onStart(botInfo) {
      console.log('Bot started')
    },
  })
} else {
  const port = config.PORT || 3000
  const app = express()
  app.use(express.json())
  app.use(`/${bot.token}`, webhookCallback(bot, 'express'))

  app.get('/', (req, res) => {
    res.json({
      status: 'OK',
      message: 'Bot is running...',
    })
  })

  app.listen(port, () => console.log(`Server listening on port ${port}`))
}                                                                                                                          