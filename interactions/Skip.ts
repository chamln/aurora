import { AuroraClient } from "../structures/AuroraClient";
import { Command } from "../structures/Command";

export default class SkipCommand extends Command {
  constructor(client: AuroraClient) {
    super(client, {
      name: "skip",
      description: "Skips the current track, if it's not the last one",
    });
  }
  async execute(interaction) {
    const isChecked = await interaction.client.functions.checkVoice(
      interaction,
      true,
      true
    );
    const queue = await interaction.client.player.queues.get(
      interaction.guild.id
    );

    if (isChecked === true) {
      queue.skip();
      interaction.reply({
        content: interaction.client.functions.formatReply(
          `Skipped **${interaction.client.functions.escapeMd(
            queue.songs[0].name
          )}**.`,
          interaction.client.config.emojis.skip
        ),
      });
    }
  }
}
