import { createSlice } from "@reduxjs/toolkit";

// "light" | "dark" | "auto"
const savedTheme = localStorage.getItem("theme") || "auto";

const getSystemTheme = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

const resolveMode = (theme) => (theme === "auto" ? getSystemTheme() : theme);

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    mode: resolveMode(savedTheme), // resolved: "light" | "dark"
    preference: savedTheme,        // stored: "light" | "dark" | "auto"
  },
  reducers: {
    toggleTheme: (state) => {
      // cycle: light → dark → auto → light
      const next =
        state.preference === "light"
          ? "dark"
          : state.preference === "dark"
          ? "auto"
          : "light";
      state.preference = next;
      state.mode = resolveMode(next);
      localStorage.setItem("theme", next);
    },
    setTheme: (state, action) => {
      state.preference = action.payload;
      state.mode = resolveMode(action.payload);
      localStorage.setItem("theme", action.payload);
    },
    syncSystemTheme: (state) => {
      if (state.preference === "auto") {
        state.mode = getSystemTheme();
      }
    },
  },
});

export const { toggleTheme, setTheme, syncSystemTheme } = themeSlice.actions;
export default themeSlice.reducer;
