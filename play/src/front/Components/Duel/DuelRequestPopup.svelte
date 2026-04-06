<script lang="ts">
    import { duelStore } from "../../Stores/DuelStore";
    import { gameManager } from "../../Phaser/Game/GameManager";

    $: request = $duelStore;

    function onAccept() {
        gameManager.getCurrentGameScene().connection?.emitEmoteEvent("duel_accept");
        duelStore.startDuel();
    }

    function onDecline() {
        duelStore.cancelOrEnd();
    }
</script>

<div
    class="m-auto my-0 h-fit min-h-fit max-w-lg min-w-48 max-sm:max-w-[89%] z-50 bg-contrast/80 transition-all backdrop-blur rounded-lg pointer-events-auto overflow-hidden md:mr-0 border border-primary/30 shadow-xl"
>
    <div class="p-4 flex flex-col gap-4">
        <div class="flex items-start gap-3">
            <div class="flex-1 min-w-0 pt-0.5">
                <p class="text-sm text-white/95 font-bold leading-snug">
                    ⚔️ {request.opponentName} 님이 1:1 대결을 신청했습니다!
                </p>
                <p class="text-xs text-white/70 mt-1">
                    몬스터볼을 5번 먼저 맞히는 사람이 승리합니다.
                </p>
            </div>
        </div>
    </div>
    <div class="flex items-center bg-contrast/50 w-full justify-center flex-row p-2">
        <button
            type="button"
            class="px-4 py-2 bg-primary/80 hover:bg-primary text-white rounded text-sm transition-colors mr-2"
            on:click={onAccept}
        >
            수락
        </button>
        <button
            type="button"
            class="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded text-sm transition-colors"
            on:click={onDecline}
        >
            거절
        </button>
    </div>
</div>
