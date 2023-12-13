import React from "react";
import Paper from "@mui/material/Paper";
import { useTheme } from "@mui/material";
import Box from "@mui/system/Box";

const PaperLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        width: "auto",
        mx: 2,
        [theme.breakpoints.up("sm")]: {
          width: 600,
          mx: "auto",
        },
      }}
    >
      <Paper
        sx={{
          my: 3,
          padding: 2,
          [theme.breakpoints.up("sm")]: {
            my: 6,
            padding: 3,
          },
        }}
      >
        {children}
      </Paper>
    </Box>
  );
};

export default PaperLayout;
