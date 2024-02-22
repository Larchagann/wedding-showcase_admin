"use client";

const { createTheme } = require("@mui/material");

export const cardHeaderTitleTypographyProps = {
  fontFamily: "allura",
  fontSize: "28px",
  fontWeight: "600",
};

export const cardHeaderMobileTitleTypographyProps = {
  fontSize: "14px",
  fontWeight: "600",
};

export const primaryTheme = createTheme({
  palette: {
    primary: {
      main: "#daa520",
      contrastText: "#ffffff",
    },
  },
});

export const logoutBtnTheme = createTheme({
  palette: {
    primary: {
      main: "#a60202",
      contrastText: "#ffffff",
    },
  },
});

export const logoutBtnThemeMobile = createTheme({
  typography: {
    fontSize: 9,
    //fontFamily:"allura"
  },
  palette: {
    primary: {
      main: "#a60202",
      contrastText: "#ffffff",
    },
  },
});
