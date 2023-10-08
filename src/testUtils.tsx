import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { render, RenderOptions } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { theme } from "~/theme";

function Providers({ children }: { children: React.ReactElement }) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
        staleTime: Infinity,
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export function renderWithProviders(
  ui: React.ReactElement,
  options?: RenderOptions
) {
  return render(ui, { wrapper: Providers, ...options });
}
