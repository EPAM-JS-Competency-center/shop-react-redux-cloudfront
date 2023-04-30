import React from "react";
import { createRoot } from "react-dom/client";
import axios from "axios";
import App from "~/components/App/App";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { theme } from "~/theme";

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("error", error, "error", error.response);
    if (error?.response?.status === 400) {
      alert(error.response.data?.data);
    } else if (
      error?.response?.status === 401 ||
      error?.response?.status === 403
    ) {
      alert(error?.message);
    }
    return Promise.reject(error.response);
  }
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false, retry: false, staleTime: Infinity },
  },
});

if (import.meta.env.DEV) {
  const { worker } = await import("./mocks/browser");
  worker.start({ onUnhandledRequest: "bypass" });
}

const container = document.getElementById("app");
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
