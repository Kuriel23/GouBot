module.exports = async (client, message) => {
  const id = message.channel.name;
  client.users
    .fetch(id, false)
    .then((user) => {
      user
        .send(message.content)
        .then(() => message.react("📨"))
        .catch(() => {
          message.reply("O usuário saiu do servidor ou bloqueou a DM.");
        });
    })
    .catch(() => {
      message.reply(
        "Não encontrei esse usuário, será que ele está no servidor ainda?"
      );
    });
};
