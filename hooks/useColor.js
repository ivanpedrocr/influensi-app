import { useTheme } from "../theme/theme-context";

export const useColor = () => {
  const [colorMode, toggleColorMode] = useTheme();
  const defaultColors = {
    primary: "#bd52ff",
    blue: "#2a5bfa",
    accentGray: "#666666",
    red: "#C70039",
  };
  const colors = {
    light: {
      ...defaultColors,
      background: "white",
      text: "black",
      contrastText: "white",
      card: "white",
      border: "white",
      lightGray: "#f0f0f0",
      notification: "#bd52ff",
      placeholderText: "#dad7e0",
    },
    dark: {
      ...defaultColors,
      background: "#252229",
      text: "white",
      contrastText: "black",
      card: "#252229",
      border: "#252229",
      lightGray: "#29292e",
      notification: "#bd52ff",
      placeholderText: "#424145",
    },
  };
  return {
    dark: colorMode === "dark" ? true : false,
    colors: colorMode === "light" ? colors.light : colors.dark,
    toggleColorMode,
  };
};
