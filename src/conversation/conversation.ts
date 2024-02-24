import { Conversation } from "@grammyjs/conversations"
import { MyContext } from "../session/session"
import { Keyboard } from "grammy"
import { UserType, users } from "../data/users.data"

export type MyConversation = Conversation<MyContext>


export async function startConversation(conversation: MyConversation, ctx: MyContext) {
    const user = users.find((user) => user.tgId === ctx.from?.id)

    if ((!user)) {
        if (ctx.from?.id) await ctx.reply('Как тебя зовут?')
        const firstName = (await conversation.waitFor(':text')).message?.text
        console.log(firstName);


        await ctx.reply('Как твоя фамилия?')
        const lastName = (await conversation.waitFor(':text')).message?.text
        console.log(lastName);


        await ctx.reply('Надо поделиться номером', {
            reply_markup: new Keyboard()
                .requestContact('☎️ Поделиться номером')
                .resized()
        })
        const phoneNumber = (await conversation.waitFor(':contact')).message?.contact.phone_number

        const newUser: UserType = {
            tgId: ctx.from?.id,
            firstName,
            lastName,
            phoneNumber,
        }

        users.push(newUser)

        await ctx.reply(`Ты успешно зарегистрировался. Добро пожаловать ${firstName}`, {
            reply_markup: {
                remove_keyboard: true,
            },
        })
    } else {
        await ctx.reply(`Welcome ${user.firstName} ${user.lastName}!`, {
            reply_markup: {
                remove_keyboard: true,
            },
        })
    }
}
