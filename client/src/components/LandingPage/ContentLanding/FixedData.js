import feature_music from "../../../assets/other/feature_music.png";
import feature_background from "../../../assets/other/feature_background.png";
import feature_timer from "../../../assets/other/feature_timer.png";
import feature_statistic from "../../../assets/other/feature_statistic.jpg";

const data = {
  About:
    "An application is built specifically for people who are interested in Lofi music and want a structured learning process. " +
    "If you're bored, enjoy the music. On the one hand, we provide a pomodoro timer for working focused and concentrated.",
  Features: {
    description: "",
    listFeatures: [
      {
        src: feature_statistic,
        title: "View",
        subtile: "Learning history",
      },
      {
        src: feature_music,
        title: "Listen to",
        subtile: "Music",
      },
      {
        src: feature_background,
        title: "Change",
        subtile: "Background",
      },
      {
        src: feature_timer,
        title: "Pomodoro",
        subtile: "Timer",
      },
    ],
  },
};

export default data;
