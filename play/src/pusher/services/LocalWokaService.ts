import type { WokaDetail, WokaList } from "@workadventure/messages";
import { wokaPartNames } from "@workadventure/messages";
import fs from "fs";
import path from "path";
import type { WokaServiceInterface } from "./WokaServiceInterface";

class LocalWokaService implements WokaServiceInterface {
    /**
     * Returns the list of all available Wokas & Woka Parts for the current user.
     */
    async getWokaList(roomUrl: string, token: string): Promise<WokaList | undefined> {
        try {
            const data = fs.readFileSync(path.resolve(__dirname, "../data/woka.json"), "utf8");
            const wokaData: WokaList = JSON.parse(data);
            return wokaData;
        } catch (e) {
            console.error("Failed to load woka.json:", e);
            return undefined;
        }
    }

    /**
     * Returns the URL of all the images for the given texture ids.
     *
     * Key: texture id
     * Value: URL
     *
     * If one of the textures cannot be found, undefined is returned (and the user should be redirected to Woka choice page!)
     */
    async fetchWokaDetails(textureIds: string[]): Promise<WokaDetail[] | undefined> {
        const wokaData = await this.getWokaList("", "");
        if (!wokaData) {
            return undefined;
        }
        const textures = new Map<string, string>();
        const searchIds = new Set(textureIds);

        for (const part of wokaPartNames) {
            const wokaPartType = wokaData[part];
            if (!wokaPartType) {
                continue;
            }

            for (const collection of wokaPartType.collections) {
                for (const id of searchIds) {
                    const texture = collection.textures.find((texture) => texture.id === id);

                    if (texture) {
                        textures.set(id, texture.url);
                        searchIds.delete(id);
                    }
                }
            }
        }

        if (textureIds.length !== textures.size) {
            return undefined;
        }

        const details: WokaDetail[] = [];

        textures.forEach((value, key) => {
            details.push({
                id: key,
                url: value,
            });
        });

        return details;
    }
}

export const localWokaService = new LocalWokaService();
