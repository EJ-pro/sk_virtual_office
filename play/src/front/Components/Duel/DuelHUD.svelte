<script lang="ts">
    import { duelStore } from "../../Stores/DuelStore";
    import { fade } from "svelte/transition";

    $: duel = $duelStore;

    function onClose() {
        duelStore.cancelOrEnd();
    }
</script>

{#if duel.status === "DUELING" || duel.status === "FINISHED"}
    <div
        class="fixed top-20 left-1/2 -translate-x-1/2 z-[1000] min-w-[300px]"
        transition:fade
    >
        <div class="bg-black/60 backdrop-blur-md rounded-full border-2 border-primary/50 p-2 px-6 flex items-center justify-between shadow-2xl relative overflow-hidden group">
            <!-- Background Glow -->
            <div class="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-red-500/10 opacity-50"></div>

            <div class="text-white text-center flex-1">
                <span class="block text-xs text-white/60 font-medium">나</span>
                <div class="text-2xl font-black text-blue-400 tabular-nums">
                    {duel.opponentHits} <span class="text-xs text-white/40 font-normal">/ 5</span>
                </div>
            </div>

            <div class="px-4 text-white/30 font-black italic select-none">VS</div>

            <div class="text-white text-center flex-1">
                <span class="block text-xs text-white/60 font-medium truncate max-w-[100px]">{duel.opponentName}</span>
                <div class="text-2xl font-black text-red-500 tabular-nums">
                    {duel.myHits} <span class="text-xs text-white/40 font-normal">/ 5</span>
                </div>
            </div>

            {#if duel.status === "FINISHED"}
                <div class="absolute inset-0 bg-black/90 flex flex-col items-center justify-center p-4 z-50">
                    <span class="text-yellow-400 font-black text-lg">대결 종료!</span>
                    <span class="text-white text-sm mt-1">{duel.winnerName === "Me" ? "승리했습니다!" : duel.winnerName + " 님이 승리했습니다."}</span>
                    <button class="mt-2 text-xs bg-white/20 hover:bg-white/40 text-white px-4 py-1 rounded-full transition-all" on:click={onClose}>닫기</button>
                </div>
            {/if}
        </div>
    </div>
{/if}

{#if duel.status === "WAITING_ACCEPT"}
    <div
        class="fixed top-20 left-1/2 -translate-x-1/2 z-[1000] bg-black/50 text-white px-6 py-2 rounded-full border border-white/20 backdrop-blur animate-pulse"
        transition:fade
    >
        {duel.opponentName} 님의 수락을 기다리고 있습니다...
    </div>
{/if}
