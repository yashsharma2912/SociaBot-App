import {Telegraf} from "telegraf"

import userModel from "./src/models/user.model.js";

import connectDb from "./src/config/db.js"

const bot = new Telegraf(process.env.bot_api)

try {
    connectDb()
    console.log("hello mongoose")
} catch (error) {
    console.log(error);
    process.kill(process.pid, "SIGTERM")
}

bot.start( async(ctx) => {

   //cmf for getting details of user
   const from = ctx.update.message.from;

   console.log('from',from);
    
   try {
       await userModel.findOneAndUpdate({tgId: from.id},{
          $setOnInsert: {
             firstName: from.first_name,
             lastName: from.last_name,
             isBot: from.is_bot,
             username: from.username
          }
       }, {upsert:true, new:true})
        // Store the information into db 
         await ctx.reply(`hey! ${from.first_name}, Welcome Captain !🔥`);
   } catch (error) {
       console.log(error)
       await ctx.reply("facing difficulties boss")
   }
     
   
 

  
})

bot.launch();

//enable gracefull shutdown

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));