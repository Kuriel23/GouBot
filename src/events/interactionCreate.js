const discord = require("discord.js");

module.exports = (client, interaction) => {
  if (interaction.isButton()) {
    try {
      require("../button/" + interaction.customId)(client, interaction);
    } catch (error) {
      return 0;
    }
  }
  if (interaction.isChatInputCommand()) {
    const command = client.commands.get(interaction.commandName);
    if (!command) return;
    try {
      command.execute(interaction, client);
    } catch (err) {
      if (err) console.error(err);
      const emberror = new discord.EmbedBuilder()
        .setTitle("Erro encontrado!")
        .setColor(client.cor);
      interaction.reply({ embeds: [emberror] });
    }
  }
};
