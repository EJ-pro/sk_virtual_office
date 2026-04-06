import type { CompanionTextureCollection, CompanionDetail } from "@workadventure/messages";
import fs from "fs";
import path from "path";
import type { CompanionServiceInterface } from "./CompanionServiceInterface";

/**
 * Companion Service list that the default list of companions
 */
class LocalCompanionService implements CompanionServiceInterface {
    async getCompanionList(roomUrl: string, token: string): Promise<CompanionTextureCollection[] | undefined> {
        try {
            const data = fs.readFileSync(path.resolve(__dirname, "../data/companions.json"), "utf8");
            const companionList: CompanionTextureCollection[] = JSON.parse(data);
            return companionList;
        } catch (e) {
            console.error("Failed to load companions.json:", e);
            return undefined;
        }
    }

    async fetchCompanionDetails(textureId: string): Promise<CompanionDetail | undefined> {
        const companionList = await this.getCompanionList("", "");
        if (!companionList) {
            return undefined;
        }

        for (const collection of companionList) {
            const texture = collection.textures.find((texture) => texture.id === textureId);

            if (texture) {
                return {
                    id: texture.id,
                    url: texture.url,
                };
            }
        }

        return undefined;
    }
}

export const localCompanionService = new LocalCompanionService();
