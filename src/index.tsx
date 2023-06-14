import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";
import { initializeIcons } from "@fluentui/react";

import "./index.scss";

import Layout from "./pages/layout/Layout";
import NoPage from "./pages/NoPage";
import OneShot from "./pages/oneshot/OneShot";
import Chat from "./pages/chat/Chat";
import { PorscheDesignSystemProvider } from "@porsche-design-system/components-react";

initializeIcons();

export default function App() {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Chat />} />
                    <Route path="qa" element={<OneShot />} />
                    <Route path="*" element={<NoPage />} />
                </Route>
            </Routes>
        </HashRouter>
    );
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <PorscheDesignSystemProvider>
            <App />
        </PorscheDesignSystemProvider>
    </React.StrictMode>
);