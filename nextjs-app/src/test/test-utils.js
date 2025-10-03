// MUI uses Emotion for styling
// Wrap your component in an Emotion ThemeProvider or MUI CssBaseline + ThemeProvider in tests.

import { render } from "@testing-library/react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme();

export const renderWithTheme = (ui, options) =>
  render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>, options);
