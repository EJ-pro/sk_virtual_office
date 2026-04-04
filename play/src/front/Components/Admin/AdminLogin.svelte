<script lang="ts">
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    let id = "";
    let pw = "";
    let error = "";
    let isLoading = false;

    async function handleLogin() {
        isLoading = true;
        error = "";
        try {
            const response = await fetch("/admin-api/admin/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, pw }),
            });
            const data = await response.json();
            if (data.success) {
                dispatch("loginSuccess");
            } else {
                error = "Access Denied: Invalid Admin Credentials";
            }
        } catch (e) {
            error = "Connection Error: Backend unreachable";
        } finally {
            isLoading = false;
        }
    }
</script>

<div class="flex items-center justify-center min-h-screen p-6 relative overflow-hidden bg-[#0f172a]">
    <!-- Background Decor -->
    <div class="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-500/10 blur-[120px]"></div>
    <div class="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-500/10 blur-[120px]"></div>

    <div class="glass-card w-full max-w-md p-10 rounded-2xl border border-white/10 relative z-10 animate-fade-in shadow-2xl">
        <div class="text-center mb-10">
            <h1 class="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 mb-2">
                ADMIN PORTAL
            </h1>
            <p class="text-white/40 text-sm font-medium tracking-wide">Family AI Camp Management</p>
        </div>

        <form on:submit|preventDefault={handleLogin} class="space-y-6">
            <div>
                <label for="admin-id" class="block text-[10px] uppercase font-bold text-white/30 mb-2 ml-1 tracking-widest">Administrator ID</label>
                <input
                    id="admin-id"
                    type="text"
                    bind:value={id}
                    placeholder="Enter ID"
                    class="admin-input w-full px-5 py-4 rounded-xl bg-black/30 border border-white/5 text-white placeholder-white/20 outline-none focus:border-indigo-500/50 transition-all font-mono"
                    required
                />
            </div>

            <div>
                <label for="admin-pw" class="block text-[10px] uppercase font-bold text-white/30 mb-2 ml-1 tracking-widest">Master Password</label>
                <input
                    id="admin-pw"
                    type="password"
                    bind:value={pw}
                    placeholder="••••••••"
                    class="admin-input w-full px-5 py-4 rounded-xl bg-black/30 border border-white/5 text-white placeholder-white/20 outline-none focus:border-indigo-500/50 transition-all font-mono"
                    required
                />
            </div>

            {#if error}
                <div class="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-center">
                    <p class="text-red-400 text-xs font-semibold">{error}</p>
                </div>
            {/if}

            <button
                type="submit"
                disabled={isLoading}
                class="login-btn w-full py-4 rounded-xl text-white font-bold text-sm tracking-widest uppercase shadow-lg shadow-indigo-500/20 disabled:opacity-50 transition-all"
            >
                {isLoading ? "Authenticating..." : "System Entry"}
            </button>
        </form>

        <button 
            type="button"
            on:click={() => window.location.hash = ""}
            class="mt-8 w-full text-white/30 hover:text-white/60 text-[10px] uppercase font-bold tracking-widest transition-colors"
        >
            ← Return to Lobby
        </button>
    </div>
</div>

<style lang="scss">
    .glass-card {
        background: rgba(255, 255, 255, 0.03);
        backdrop-filter: blur(24px);
        -webkit-backdrop-filter: blur(24px);
    }

    .admin-input:focus {
        background: rgba(0, 0, 0, 0.5);
        box-shadow: 0 0 20px rgba(99, 102, 241, 0.1);
    }

    .login-btn {
        background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
        &:hover:not(:disabled) {
            transform: translateY(-2px);
            filter: brightness(1.1);
            box-shadow: 0 10px 25px rgba(99, 102, 241, 0.3);
        }
        &:active:not(:disabled) {
            transform: translateY(0);
        }
    }

    .animate-fade-in {
        animation: fadeInScale 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }

    @keyframes fadeInScale {
        from { opacity: 0; transform: scale(0.9) translateY(20px); }
        to { opacity: 1; transform: scale(1) translateY(0); }
    }
</style>
