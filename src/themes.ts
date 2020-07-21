export enum Theme {
  Default = "Least\nDangerous",
  Haze = "Toxic\nFumes",
  Floss = "Floss\nDaily",
  Clear = "Cease &\nDesist",
  Pride = "The Letter People",
  LSD = "I think\nit's working",
  Greys = "Why bother",
}
export type ThemeDef = [string, string, string, string, string, string];

const themes: { [key in Theme]: ThemeDef } = {
  [Theme.Default]: [
    "#493D64",
    "#763D60",
    "#9B3C5B",
    "#B64B5A",
    "#C4785D",
    "#CC8E5F",
  ],
  [Theme.Clear]: [
    "#DA0215",
    "#DE3A17",
    "#E3591A",
    "#E4751C",
    "#E7921C",
    "#E9AF1D",
  ],
  [Theme.Haze]: [
    "#F27281",
    "#DB6F80",
    "#AD6A80",
    "#84657E",
    "#61617E",
    "#375C7D",
  ],
  [Theme.LSD]: [
    "#A1184B",
    "#FF8522",
    "#0298C9",
    "#6EBA08",
    "#711D79",
    "#FE61A7",
  ],
  [Theme.Pride]: [
    "#F13529",
    "#FA9E21",
    "#E9D61D",
    "#2EAE54",
    "#564795",
    "#824492",
  ],
  [Theme.Floss]: [
    "#77CEA2",
    "#6BBCAB",
    "#5FAAB3",
    "#5396BD",
    "#4988C4",
    "#3D75CD",
  ],
  [Theme.Greys]: [
    "#707070",
    "#7a7a7a",
    "#808080",
    "#8a8a8a",
    "#909090",
    "#9a9a9a",
  ],
};

export default themes;
