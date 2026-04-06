import { loginSceneVisibleStore } from "../Stores/LoginSceneStore";
import { gameManager } from "../Phaser/Game/GameManager";
import { LoginScene, LoginSceneName } from "../Phaser/Login/LoginScene";

/**
 * Triggers the internal custom login scene instead of redirecting to /login.
 */
export function triggerInternalLogin(): void {
    console.info("Triggering internal login scene...");
    
    // Set the Svelte store to show the login overlay
    loginSceneVisibleStore.set(true);
    
    // Direct Phaser to start the LoginScene
    // We use leaveGame to reset the state if needed, or just start the scene
    const currentScene = gameManager.getCurrentGameScene();
    if (currentScene) {
        gameManager.leaveGame(LoginSceneName, new LoginScene());
    } else {
        // Fallback for cases where no game scene is even loaded yet
        // EntryScene or GameManager usually handles initial routing
        // This is a safety measure
    }
}
