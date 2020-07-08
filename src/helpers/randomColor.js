export default {
  methods: {
    randomColor() {
      const colors = [
        "#59caa5",
        "#94B8CF",
        "#68B877",
        "#BABFFF",
        "#BA9C51",
        "#9350DC",
        "#0890FF",
        "#d650a8",
      ];
      let rand = colors[Math.floor(Math.random() * colors.length)];
      return rand;
    }
  }
}