module.exports = async (client, interaction) => {
  interaction
    .reply(
      `\\🔒 |${interaction.user}, esse mail será deletado em \`5 segundos\`...`
    )
    .then(() => {
      setTimeout(() => {
        interaction.channel.delete();
      }, 5000);
    });
};
