import type { Config } from "@svgr/core";

const config: Config = {
  replaceAttrValues: {
    // Replace ANY hex color (#000, #fff, #132533, etc.)
    "#000": "currentColor",

    // Also replace named colors
    "black": "currentColor",
    "white": "currentColor",
  },

  svgProps: {
    stroke: "white", 
  },
};

export default config;
