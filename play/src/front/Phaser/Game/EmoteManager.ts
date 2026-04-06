import type { Subscription } from "rxjs";
import type { RoomConnection } from "../../Connection/RoomConnection";
import { localUserStore } from "../../Connection/LocalUserStore";
import { duelStore } from "../../Stores/DuelStore";
import type { GameScene } from "./GameScene";




export class EmoteManager {
    private subscription: Subscription;

    constructor(private scene: GameScene, private connection: RoomConnection) {
        this.subscription = connection.emoteEventMessageStream.subscribe((event) => {
            const actor = this.scene.MapPlayersByKey.get(event.actorUserId);
            if (actor) {
                if (event.emote === "monster_ball") {
                    actor.throwMonsterBall();
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
                    // event.actorUserId is the one who got hit?
                    // Let's say if I get hit, I emit "duel_hit".
                    // So if actor is ME, addMyHit(). If actor is OPPONENT, addOpponentHit().
                    // Wait, logic is subjective to who receives it.
                    // Let's use simple: if actor is NOT me, it means they got hit.
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
