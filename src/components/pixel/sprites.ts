// Sprite maps. "x" takes the sprite's color prop; other letters are fixed:
// k = ink, o = orange, y = yellow, b = blue, p = purple, m = magenta.
export const SPRITES = {
  plus: ["..x..", "..x..", "xxxxx", "..x..", "..x.."],
  star: ["...x...", "...x...", "..xxx..", "xxxxxxx", "..xxx..", "...x...", "...x..."],
  heart: [".xx.xx.", "xxxxxxx", "xxxxxxx", ".xxxxx.", "..xxx..", "...x..."],
  invader: [
    "..x.....x..",
    "...x...x...",
    "..xxxxxxx..",
    ".xx.xxx.xx.",
    "xxxxxxxxxxx",
    "x.xxxxxxx.x",
    "x.x.....x.x",
    "...xx.xx...",
  ],
  ghost: ["..xxx..", ".xxxxx.", "x..x..x", "xxxxxxx", "xxxxxxx", "xxxxxxx", "x.x.x.x"],
  coin: [".kkk.", "koyok", "koyok", "koyok", ".kkk."],
  robot: [
    ".....y.....",
    ".....k.....",
    ".kkkkkkkkk.",
    ".koooooook.",
    ".kokkokkok.",
    ".koooooook.",
    ".kokkkkkok.",
    ".koooooook.",
    ".kkkkkkkkk.",
    "..kbbbbbk..",
    ".kkbpbpbkk.",
    "..kbbbbbk..",
    "..kk...kk..",
  ],
  sun: [
    "...x...",
    ".x.x.x.",
    "..xxx..",
    "xxxxxxx",
    "..xxx..",
    ".x.x.x.",
    "...x...",
  ],
  moon: ["..xxx..", ".xx....", "xx.....", "xx.....", "xx.....", ".xx....", "..xxx.."],
  arrowLeft: ["...x...", "..x....", ".x.....", "xxxxxxx", ".x.....", "..x....", "...x..."],
  arrowRight: ["...x...", "....x..", ".....x.", "xxxxxxx", ".....x.", "....x..", "...x..."],
  menu: ["xxxxxxx", ".......", "xxxxxxx", ".......", "xxxxxxx"],
  close: ["x.....x", ".x...x.", "..x.x..", "...x...", "..x.x..", ".x...x.", "x.....x"],
} as const

export type SpriteName = keyof typeof SPRITES

export const PIXEL_COLORS: Record<string, string> = {
  k: "var(--color-foreground)",
  o: "var(--color-pixel-orange)",
  y: "var(--color-pixel-yellow)",
  b: "var(--color-pixel-blue)",
  p: "var(--color-pixel-purple)",
  m: "var(--color-pixel-magenta)",
}
