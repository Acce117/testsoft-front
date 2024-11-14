import { fontFamily } from "@unocss/preset-uno/theme";
import {
  defineConfig,
  presetTypography,
  presetAttributify,
  presetUno,
} from "unocss";
export default defineConfig({
  presets: [
    presetUno(),
    presetTypography(),
    presetAttributify(),
  ],
  theme:{
    colors:{
         'primary':'#3faee4',
         'secondary':'#2388bb'
    },
    
  }
    
  ,
  rules: [
    [
      /^anim-([^\s]+)-([\.\d]+)$/,
      ([_, name, num]) => ({ animation: `${name} ${num}s` }),
    ],
    [/^trans-([\.\d]+)$/, ([_, num]) => ({ transition: `all ease ${num}s` })],
    
    [
      "page-title",
      {
        "text-align": "center",
        animation: ".8s fade-in",
        "margin-top": "7rem",
        "font-size": "2rem",
      },
    ],
    [
      "page-subtitle",
      {
        "text-align": "center",
        animation: ".8s fade-in",
        "font-size": "2rem",
      },
    ],

    [
      "shadow-box",
      {
        "box-shadow": "var(--shadow)",
        "background-color": "white",
        "border-radius": "var(--bradius)",
      },
    ],
    [
      "shadow",
      {
        "box-shadow": "var(--shadow)",
      },
    ],
    
    
    [
      "centered",
      {
        display: "flex",
        "align-items": "center",
        "justify-content": "center",
      },
    ],
  ],
});
