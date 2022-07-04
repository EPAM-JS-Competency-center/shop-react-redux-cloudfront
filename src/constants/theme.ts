import { createTheme } from "@material-ui/core";
import { deepOrange, deepPurple } from "@material-ui/core/colors";

export const theme = createTheme({
  palette: {
    primary: {
      main: deepPurple[500],
    },
    secondary: {
      main: deepOrange[500],
    },
  },
});
