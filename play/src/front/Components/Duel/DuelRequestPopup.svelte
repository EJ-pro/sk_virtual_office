<script lang="ts">
    import { duelStore } from "../../Stores/DuelStore";
    import { gameManager } from "../../Phaser/Game/GameManager";
    import { fade } from "svelte/transition";


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
    class="fixed inset-0 z-[1100] flex items-center justify-center p-4 pointer-events-none"
    transition:fade
>
    <div
        class="bg-contrast/90 backdrop-blur-xl rounded-2xl border-2 border-primary/30 shadow-[0_0_50px_rgba(0,0,0,0.5)] max-w-sm w-full pointer-events-auto overflow-hidden transform hover:scale-[1.02] transition-transform"
        data-testid="duel-request-popup"
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
</div>
