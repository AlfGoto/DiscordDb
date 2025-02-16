import client, { dbClient, DiscordManager } from "./index.mjs"
import {token} from "./secret.mjs"





test()
async function test() {
  await dbClient.login(token);
  const dm = new DiscordManager(dbClient);
  await dm.init()

  console.log(dm.tables)

  return ""
}



// client.once('ready', async () => {
//   console.log(`Logged in as ${client.user.tag}!`);

//   const dm = new DiscordManager(client);

//   // Example: Get and log all channels
//   const channels = dm.getAllChannels();
//   console.log("Channels:", channels.map(ch => ch.name));

//   const exampleChannelId = 'YOUR_CHANNEL_ID';

//   try {
//     const messages = await dm.getAllMessages(exampleChannelId, 50);
//     console.log(`Fetched ${messages.length} messages.`);

//     // const messagesWithConditions = await dm.getMessagesWithConditions(exampleChannelId, { limit: 30, before: 'SOME_MESSAGE_ID' });
//     // console.log(`Fetched ${messagesWithConditions.length} messages with conditions.`);

//     // const modifiedMessage = await dm.modifyMessage(exampleChannelId, 'MESSAGE_ID', 'New message content!');
//     // console.log("Modified message:", modifiedMessage.content);

//     // const deletedMessage = await dm.deleteMessage(exampleChannelId, 'MESSAGE_ID');
//     // console.log("Deleted message with ID:", deletedMessage.id);
//   } catch (error) {
//     console.error("An error occurred:", error);
//   }
// });
















// const id = '1339938619279937637'

// const cli = new client("https://discord.com/api/webhooks/1339936500330139728/O9fL3C3jeFLMsCzyFRtCwVZPk2gknJEyXMpT02Jsrgc7-EKc48J3uEgUGOg1xRTrkr1a", id)

// cli.post("Hello")

// console.log("hub_id", cli.hub_id)
// console.log("webhook_id", cli.webhook_id)
// console.log("    id", id)