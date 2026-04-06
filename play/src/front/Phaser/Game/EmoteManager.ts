import type { Subscription } from "rxjs";
import type { RoomConnection } from "../../Connection/RoomConnection";
import { localUserStore } from "../../Connection/LocalUserStore";
import { duelStore } from "../../Stores/DuelStore";
import { ProtobufClientUtils } from "../../Network/ProtobufClientUtils";
import { PositionMessage_Direction } from "@workadventure/messages";
import type { GameScene } from "./GameScene";

export class EmoteManager {
    private subscription: Subscription;

    constructor(private scene: GameScene, private connection: RoomConnection) {
        this.subscription = connection.emoteEventMessageStream.subscribe((event) => {
            const actor = this.scene.MapPlayersByKey.get(event.actorUserId);
            if (actor) {
                if (event.emote.startsWith("monster_ball")) {
                    const parts = event.emote.split(":");
                    const directionStr = parts[1];
                    let direction: PositionMessage_Direction | undefined = undefined;
                    if (directionStr) {
                         direction = ProtobufClientUtils.toDirection(directionStr);
                    }
                    actor.throwMonsterBall(direction);
                } else if (event.emote.startsWith("duel_request")) {
                    const parts = event.emote.split(":");
                    const targetUuid = parts[1];
                    const myUuid = localUserStore.getLocalUser()?.uuid;
                    
                    if (targetUuid === myUuid) {
                        duelStore.receiveRequest(event.actorUserId, actor.playerName);
                    }
                } else if (event.emote === "duel_accept") {
                    duelStore.startDuel();
                } else if (event.emote === "duel_hit") {
                    // if someone else emits duel_hit, it means THEY got hit.
                    // (Assuming symmetric logic for now)
                    duelStore.addOpponentHit();
                } else {
                    actor.playEmote(event.emote);
                }
            }
        });
    }

    destroy() {
        this.subscription.unsubscribe();
    }
}
