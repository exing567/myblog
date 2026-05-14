type MdastNode = {
  type?: string;
  lang?: string | null;
  value?: string;
  children?: MdastNode[];
};

type AnsiState = {
  fg: string | null;
  bg: string | null;
  bold: boolean;
  dim: boolean;
  italic: boolean;
  underline: boolean;
  strikethrough: boolean;
};

const ANSI_ESCAPE = /\u001B\[([0-9;]*)?([A-Za-z])/g;

const ANSI_COLORS = [
  "#000000",
  "#cd3131",
  "#0dbc79",
  "#e5e510",
  "#2472c8",
  "#bc3fbc",
  "#11a8cd",
  "#e5e5e5",
];

const ANSI_BRIGHT_COLORS = [
  "#666666",
  "#f14c4c",
  "#23d18b",
  "#f5f543",
  "#3b8eea",
  "#d670d6",
  "#29b8db",
  "#ffffff",
];

const DEFAULT_STATE = (): AnsiState => ({
  fg: null,
  bg: null,
  bold: false,
  dim: false,
  italic: false,
  underline: false,
  strikethrough: false,
});

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");

const cloneState = (state: AnsiState): AnsiState => ({ ...state });

const palette256ToHex = (index: number) => {
  if (index < 0 || index > 255) return null;

  if (index < 8) return ANSI_COLORS[index];
  if (index < 16) return ANSI_BRIGHT_COLORS[index - 8];

  if (index < 232) {
    const offset = index - 16;
    const r = Math.floor(offset / 36);
    const g = Math.floor((offset % 36) / 6);
    const b = offset % 6;
    const value = [r, g, b]
      .map(channel => (channel === 0 ? 0 : channel * 40 + 55))
      .map(channel => channel.toString(16).padStart(2, "0"))
      .join("");
    return `#${value}`;
  }

  const gray = (index - 232) * 10 + 8;
  const hex = gray.toString(16).padStart(2, "0");
  return `#${hex}${hex}${hex}`;
};

const styleToString = (state: AnsiState) => {
  const styles: string[] = [];

  if (state.fg) styles.push(`color:${state.fg}`);
  if (state.bold) styles.push("font-weight:700");
  if (state.dim) styles.push("opacity:0.7");
  if (state.italic) styles.push("font-style:italic");

  const decorations: string[] = [];
  if (state.underline) decorations.push("underline");
  if (state.strikethrough) decorations.push("line-through");
  if (decorations.length > 0) {
    styles.push(`text-decoration:${decorations.join(" ")}`);
  }

  return styles.join(";");
};

const set8Color = (index: number, bright: boolean) =>
  (bright ? ANSI_BRIGHT_COLORS : ANSI_COLORS)[index] ?? null;

const applySgr = (state: AnsiState, rawCodes: string) => {
  const codes = rawCodes.length === 0 ? [0] : rawCodes.split(";").map(Number);

  for (let i = 0; i < codes.length; i += 1) {
    const code = Number.isNaN(codes[i]) ? 0 : codes[i];

    if (code === 0) {
      Object.assign(state, DEFAULT_STATE());
      continue;
    }
    if (code === 1) {
      state.bold = true;
      continue;
    }
    if (code === 2) {
      state.dim = true;
      continue;
    }
    if (code === 3) {
      state.italic = true;
      continue;
    }
    if (code === 4) {
      state.underline = true;
      continue;
    }
    if (code === 9) {
      state.strikethrough = true;
      continue;
    }
    if (code === 22) {
      state.bold = false;
      state.dim = false;
      continue;
    }
    if (code === 23) {
      state.italic = false;
      continue;
    }
    if (code === 24) {
      state.underline = false;
      continue;
    }
    if (code === 29) {
      state.strikethrough = false;
      continue;
    }
    if (code >= 30 && code <= 37) {
      state.fg = set8Color(code - 30, false);
      continue;
    }
    if (code === 39) {
      state.fg = null;
      continue;
    }
    if (code >= 40 && code <= 47) {
      continue;
    }
    if (code === 49) {
      continue;
    }
    if (code >= 90 && code <= 97) {
      state.fg = set8Color(code - 90, true);
      continue;
    }
    if (code >= 100 && code <= 107) {
      continue;
    }
    if (code === 38 || code === 48) {
      const type = codes[i + 1];
      if (type === 5) {
        const color = palette256ToHex(codes[i + 2] ?? -1);
        if (code === 38) state.fg = color;
        i += 2;
        continue;
      }
      if (type === 2) {
        const rgb = codes.slice(i + 2, i + 5);
        if (rgb.length === 3 && rgb.every(channel => channel >= 0 && channel <= 255)) {
          const color = `rgb(${rgb.join(" ")})`;
          if (code === 38) state.fg = color;
        }
        i += 4;
      }
    }
  }
};

const renderAnsiToHtml = (input: string) => {
  const state = DEFAULT_STATE();
  const segments: string[] = [];
  let lastIndex = 0;

  for (const match of input.matchAll(ANSI_ESCAPE)) {
    const [fullMatch, codes = "", command = ""] = match;
    const matchIndex = match.index ?? 0;

    if (matchIndex > lastIndex) {
      const text = escapeHtml(input.slice(lastIndex, matchIndex));
      const style = styleToString(cloneState(state));
      segments.push(style ? `<span style="${style}">${text}</span>` : text);
    }

    if (command === "m") {
      applySgr(state, codes);
    }

    lastIndex = matchIndex + fullMatch.length;
  }

  if (lastIndex < input.length) {
    const text = escapeHtml(input.slice(lastIndex));
    const style = styleToString(cloneState(state));
    segments.push(style ? `<span style="${style}">${text}</span>` : text);
  }

  return segments.join("");
};

const renderAnsiBlock = (value: string) =>
  `<pre class="ansi-code" data-language="ansi"><code>${renderAnsiToHtml(value)}</code></pre>`;

const visitTree = (node: MdastNode) => {
  if (!Array.isArray(node.children)) return;

  node.children = node.children.map(child => {
    if (child.type === "code" && child.lang?.toLowerCase() === "ansi") {
      return {
        type: "html",
        value: renderAnsiBlock(child.value ?? ""),
      };
    }

    visitTree(child);
    return child;
  });
};

export default function remarkAnsiBlocks() {
  return (tree: MdastNode) => {
    visitTree(tree);
  };
}
