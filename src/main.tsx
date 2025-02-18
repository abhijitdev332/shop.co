import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./services/store/store.ts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ThemeProvider from "./services/providers/ThemeProvider.tsx";
import App from "./App.tsx";
import { registerSW } from "virtual:pwa-register";
// style
import "./index.css";
import "react-toastify/dist/ReactToastify.css";

// Register Service Worker
registerSW({
  onNeedRefresh() {
    console.log("New content available, reload required.");
    window.location.reload();
  },
  onOfflineReady() {
    console.log("App is ready to work offline!");
  },
});

// new client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 2, // Cache for 2 minutes
      gcTime: 1000 * 60 * 5, // Cache for 5 minutes
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </Provider>
    </ThemeProvider>
  </StrictMode>
);
