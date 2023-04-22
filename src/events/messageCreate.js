const path = "../messages/";

module.exports = async (client, message) => {
  if (message.guild) {
    if (message.author.bot) return 0;
    if (message.parentId && message.parentId !== client.parentId) return 0;
    require(path + "mail")(client, message);
  } else {
    require(path + "dm")(client, message);
  }
};
