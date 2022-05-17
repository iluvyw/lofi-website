import feature_music from "../../../assets/other/music_player.png";
import feature_background from "../../../assets/other/background.png";
import feature_timer from "../../../assets/other/timer.png";
import feature_album from "../../../assets/other/new_album.png";

const data = {
  About:
    "An application is built specifically for people who are interested in Lofi music and want a structured learning process. " +
    "If you're bored, enjoy the music. On the one hand, we provide a pomodoro timer for working focused and concentrated.",
  Features: {
    description: "",
    listFeatures: [
      {
        src: feature_album,
        title: "Create",
        subtile: "New album",
      },
      {
        src: feature_music,
        title: "Listen to",
        subtile: "Music",
      },
      {
        src: feature_background,
        title: "Changing",
        subtile: "Background",
      },
      {
        src: feature_timer,
        title: "Learning",
        subtile: "Timer",
      },
    ],
  },
};

export default data;
