import "phaser";
import "./front/style/index.scss";

import App from "./front/Components/App.svelte";
import { HtmlUtils } from "./front/WebRtc/HtmlUtils";
import { e2eHooks } from "./front/Utils/E2EHooks";

// Initialize E2E hooks
declare global {
    interface Window {
        e2eHooks: typeof e2eHooks;
    }
}
window.e2eHooks = e2eHooks;

// Global error handler for initialization
window.addEventListener("error", (event) => {
    console.error("Critical Runtime Error:", event.error);
});

let app;
try {
    app = new App({
        target: HtmlUtils.getElementByIdOrFail("app"),
    });
} catch (e) {
    console.error("Failed to initialize Svelte application:", e);
    const appDiv = document.getElementById("app");
    if (appDiv) {
        appDiv.innerHTML = `<div style="color: white; padding: 20px; background: rgba(0,0,0,0.8); border: 1px solid red;">
            <h2>Initialization Error</h2>
            <p>The application failed to start correctly. Please check the console for details.</p>
            <pre style="color: #ffaaaa;">${e instanceof Error ? e.message : String(e)}</pre>
        </div>`;
    }
}

export default app;
