import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { store } from "@/app/store";
import NotificationStream from "@/features/notifications/NotificationStream";
import SessionExpiry from "@/features/auth/SessionExpiry";
import { ThemeProvider } from "@/components/ui/theme-provider";

import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <SessionExpiry />
      <NotificationStream />

      <BrowserRouter>
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);
