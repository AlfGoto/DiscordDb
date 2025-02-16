import { Client, GatewayIntentBits } from "discord.js"

// Create a new client with the required intents.
const dbClient = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessageReactions,
  ],
});

class DiscordManager {
  constructor(client) {
    this.client = client;
  }
  async init() {
    await this.initTables()
  }

  async initTables() {
    const channels = await this.getAllChannels()
    this.tables = channels.map(c => {
      if (c.type === 0) return { name: c.name, id: c.id }
    }).filter(e => e)
  }

  /**
   * Get all channels cached by the client.
   * @returns {Array} Array of Channel objects.
   */
  async getAllChannels() {
    let allChannels = [];

    for (const guild of this.client.guilds.cache.values()) {
      const channels = await guild.channels.fetch();
      allChannels = allChannels.concat(channels.map(c => c));
    }

    return allChannels;
  }

  /**
   * Fetch messages from a channel, paginating if necessary.
   * @param {string} channelId - The ID of the channel.
   * @param {number} max - Maximum number of messages to fetch.
   * @returns {Promise<Array>} Array of Message objects.
   */
  async getAllMessages(channelId, max = 100) {
    // Fetch the channel
    const channel = await this.client.channels.fetch(channelId);
    if (!channel || !channel.isTextBased()) {
      throw new Error("Channel not found or is not text-based");
    }

    let allMessages = [];
    let options = { limit: 100 };
    let lastMessageId;

    // Continue fetching until no more messages or max reached.
    while (true) {
      if (lastMessageId) options.before = lastMessageId;
      const messages = await channel.messages.fetch(options);
      if (messages.size === 0) break;

      // Append fetched messages to our array.
      allMessages.push(...messages.values());
      lastMessageId = messages.last().id;

      // Stop if we've reached or exceeded the maximum requested.
      if (allMessages.length >= max) {
        allMessages = allMessages.slice(0, max);
        break;
      }
    }

    return allMessages;
  }

  /**
   * Fetch messages from a channel using specific conditions.
   * Options may include `limit` (max messages per call), `before`, `after`, or `around`.
   * @param {string} channelId - The ID of the channel.
   * @param {object} options - Options for fetching messages.
   * @param {number} options.limit - Number of messages to fetch (max 100 per API call).
   * @param {string} [options.before] - Message ID to fetch messages before.
   * @param {string} [options.after] - Message ID to fetch messages after.
   * @param {string} [options.around] - Message ID to fetch messages around.
   * @returns {Promise<Array>} Array of Message objects.
   */
  async getMessagesWithConditions(channelId, { limit = 50, before, after, around } = {}) {
    const channel = await this.client.channels.fetch(channelId);
    if (!channel || !channel.isTextBased()) {
      throw new Error("Channel not found or is not text-based");
    }

    const fetchOptions = { limit };
    if (before) fetchOptions.before = before;
    if (after) fetchOptions.after = after;
    if (around) fetchOptions.around = around;

    const messages = await channel.messages.fetch(fetchOptions);
    return Array.from(messages.values());
  }

  /**
   * Modify a specific message in a channel.
   * @param {string} channelId - The ID of the channel.
   * @param {string} messageId - The ID of the message.
   * @param {string|object} newContent - The new content for the message (or message options object).
   * @returns {Promise<Message>} The updated Message object.
   */
  async modifyMessage(channelId, messageId, newContent) {
    const channel = await this.client.channels.fetch(channelId);
    if (!channel || !channel.isTextBased()) {
      throw new Error("Channel not found or is not text-based");
    }

    const message = await channel.messages.fetch(messageId);
    if (!message) throw new Error("Message not found");

    return message.edit(newContent);
  }

  /**
   * Delete a specific message from a channel.
   * @param {string} channelId - The ID of the channel.
   * @param {string} messageId - The ID of the message.
   * @returns {Promise<Message>} The deleted Message object.
   */
  async deleteMessage(channelId, messageId) {
    const channel = await this.client.channels.fetch(channelId);
    if (!channel || !channel.isTextBased()) {
      throw new Error("Channel not found or is not text-based");
    }

    const message = await channel.messages.fetch(messageId);
    if (!message) throw new Error("Message not found");

    return message.delete();
  }
}
export { dbClient, DiscordManager };
















































































export default class client {

  constructor(webhook_url, hub_id = null) {
    this.webhook_url = webhook_url
    this.webhook_id = webhook_url.split("/")[5]
    if (hub_id) this.hub_id = hub_id
    else this.init()
    console.log("webhook_id:", this.webhook_id)
  }

  async init() {
    const initMessage = await this.post("The Hub")
    this.hub_id = initMessage.id
  }

  async post(messageContent) {
    const f = await fetch(this.webhook_url + "?wait=true", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: messageContent,
      }),
    })
    const json = await f.json()
    return json
  }
}

