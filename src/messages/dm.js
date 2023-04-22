const discord = require("discord.js");

module.exports = async (client, message) => {
  const guild = client.guilds.cache.get(client.guildId);
  if (guild.channels.cache.find((c) => c.name === message.author.id)) {
    const c = guild.channels.cache.find((c) => c.name === message.author.id);
    if (message.content) c.send({ content: message.content });
    if (message.attachments)
      c.send({
        content:
          "Arquivos enviados:\n\n" +
          message.attachments
            .map((att) => {
              return att.url;
            })
            .join("\n"),
      });
  } else {
    guild.channels
      .create({
        name: message.author.id,
        type: 0,
        parent: client.parentId,
        permissionOverwrites: [
          {
            id: guild.id,
            deny: [discord.PermissionFlagsBits.ViewChannel],
          },
          {
            id: "985997300662960229",
            allow: [
              discord.PermissionFlagsBits.ViewChannel,
              discord.PermissionFlagsBits.SendMessages,
              discord.PermissionFlagsBits.AttachFiles,
              discord.PermissionFlagsBits.AddReactions,
            ],
          },
        ],
      })
      .then((c) => {
        message.reply({
          content: `Olá, ${message.author}. Sua mensagem foi enviada como um novo mail para a equipe de Suporte do Gou! Você poderá obter uma resposta em momentos, não esqueça de manter sua DM ativada para receber a nova DM.`,
        });

        const embed = new discord.EmbedBuilder()
          .setAuthor({
            name: message.author.username,
            iconURL: message.author.displayAvatarURL({ dynamic: true }),
          })
          .setColor(client.cor)
          .setDescription(
            `Um novo mail foi enviado através da minha DM, responda por aqui para responder ao usuário!`
          );

        const botao = new discord.ActionRowBuilder().addComponents(
          new discord.ButtonBuilder()
            .setCustomId("ft")
            .setEmoji("🔒")
            .setLabel("Fechar Mail")
            .setStyle(2)
        );

        c.send({
          content: "<@&985997300662960229>",
          embeds: [embed],
          components: [botao],
        }).then((msg) => msg.pin());
        if (message.content) c.send({ content: message.content });
        if (message.attachments)
          c.send({
            content:
              "Arquivos enviados:\n\n" +
              message.attachments
                .map((att) => {
                  return att.url;
                })
                .join("\n"),
          });
      });
  }
};
