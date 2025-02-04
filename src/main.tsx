import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { persisStore, store } from "./services/store/store.ts";
import { PersistGate } from "redux-persist/integration/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App.tsx";
// style
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import ThemeProvider from "./services/providers/ThemeProvider.tsx";
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
        {/* <PersistGate loading={null} persistor={persisStore}> */}
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
        {/* </PersistGate> */}
      </Provider>
    </ThemeProvider>
  </StrictMode>
);
