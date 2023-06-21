import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";
import { initializeIcons } from "@fluentui/react";

import "./index.scss";

import Layout from "./pages/layout/Layout";
import NoPage from "./pages/NoPage";
// import OneShot from "./pages/oneshot/OneShot";
import { PorscheDesignSystemProvider } from "@porsche-design-system/components-react";
import Settings from "./pages/settings/Settings";
import Chat from "./pages/chat/Chat";
import { store } from "./store/store";
import { Provider } from "react-redux";

initializeIcons();

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Chat />} />
          {/* <Route path="qa" element={<OneShot />} /> */}
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <PorscheDesignSystemProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </PorscheDesignSystemProvider>
  </React.StrictMode>
);
