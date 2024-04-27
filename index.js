import {Telegraf} from "telegraf"
import userModel from "./src/models/user.model.js";

const bot = new Telegraf(process.env.bot_api)

bot.start( async(ctx) => {
  const from = ctx.update.message.from;
  console.log('from',ctx)

  try {
     await userModel.findOneAndUpdate({tgId: from.id},{
        $setOnInsert:{
            firstName: from.first_name,
            lastName: from.last_name,
            isBot: from.is_bot,
            username: from.username,

        },
     },{
        upsert: true, new: true
     });
  } catch (error) {
    
  }

   // Store the information into db 

  await ctx.reply("welcome to my bot");
})

bot.launch();

//enable gracefull shutdown

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));