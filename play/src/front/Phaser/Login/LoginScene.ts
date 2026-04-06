import { loaderVisibleStore } from "../../Stores/LoaderStore";
import { loginSceneVisibleIframeStore, loginSceneVisibleStore } from "../../Stores/LoginSceneStore";
import { localUserStore } from "../../Connection/LocalUserStore";
import { connectionManager } from "../../Connection/ConnectionManager";
import { gameManager } from "../Game/GameManager";
import { analyticsClient } from "../../Administration/AnalyticsClient";
import { isUserNameTooLong, isUserNameValid } from "../../Connection/LocalUserUtils";
import { NameNotValidError, NameTooLongError } from "../../Exception/NameError";
import { hasCapability } from "../../Connection/Capabilities";
import { ResizableScene } from "./ResizableScene";

export const LoginSceneName = "LoginScene";

export class LoginScene extends ResizableScene {
    private name = "";

    constructor() {
        super({
            key: LoginSceneName,
        });
        this.name = gameManager.getPlayerName() || "";
    }

    preload() {}

    create() {
        loginSceneVisibleIframeStore.set(false);
        loginSceneVisibleStore.set(true);
        loaderVisibleStore.set(false);

        if (gameManager.currentStartedRoom?.backgroundColor != undefined) {
            this.cameras.main.setBackgroundColor(gameManager.currentStartedRoom.backgroundColor);
        }
    }

    public async login(name: string): Promise<void> {
        if (isUserNameTooLong(name)) {
            throw new NameTooLongError();
        }
        if (!isUserNameValid(name)) {
            throw new NameNotValidError();
        }

        analyticsClient.validationName();
        name = name.trim();
        const didSaveName = await connectionManager.saveName(name);
        gameManager.setPlayerName(name);
        if (!didSaveName) {
            // Only save the name if the user is not logged in
            // If the user is logged in, the name will be fetched from the server. No need to save it locally.
            if (!localUserStore.isLogged() || !hasCapability("api/save-name")) {
                localUserStore.setName(name);
            }
        }

        this.scene.stop(LoginSceneName);
        gameManager.goToNextScene(LoginSceneName);
        this.scene.remove(LoginSceneName);
        loginSceneVisibleStore.set(false);
    }

    update(_time: number, _delta: number): void {}

    public onResize(): void {}
}
