<script lang="ts">
    import { createEventDispatcher, onMount } from "svelte";
    const dispatch = createEventDispatcher();

    let users: Record<string, string> = {};
    let newId = "";
    let newPw = "1234";
    let isLoading = true;
    let isSaving = false;
    let message = "";
    let searchTerm = "";

    onMount(fetchUsers);

    async function fetchUsers() {
        isLoading = true;
        try {
            const response = await fetch("/admin-api/admin/users");
            users = await response.json();
        } catch (e) {
            message = "❌ Failed to load students.";
        } finally {
            isLoading = false;
        }
    }

    async function addUser() {
        if (!newId || !newPw) return;
        isSaving = true;
        try {
            const response = await fetch("/admin-api/admin/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: newId, pw: newPw }),
            });
            if (response.ok) {
                newId = "";
                newPw = "1234";
                await fetchUsers();
                message = "✅ Student added successfully!";
            }
        } catch (e) {
            message = "❌ Failed to add student.";
        } finally {
            isSaving = false;
            setTimeout(() => (message = ""), 3000);
        }
    }

    async function deleteUser(id: string) {
        if (!confirm(`Are you sure you want to delete ${id}?`)) return;
        try {
            const response = await fetch(`/admin-api/admin/users/${encodeURIComponent(id)}`, {
                method: "DELETE",
            });
            if (response.ok) {
                await fetchUsers();
                message = "🗑️ Student deleted.";
            }
        } catch (e) {
            message = "❌ Failed to delete student.";
        } finally {
            setTimeout(() => (message = ""), 3000);
        }
    }

    async function resetData() {
        if (!confirm("Are you sure you want to reset to the default 30 students?")) return;
        try {
            await fetch("/admin-api/admin/reset", { method: "POST" });
            await fetchUsers();
            message = "🔄 System reset complete.";
        } catch (e) {
            message = "❌ Reset failed.";
        }
    }

    $: filteredUsers = Object.entries(users)
        .filter(([id]) => id.toLowerCase().includes(searchTerm.toLowerCase()))
        .sort(([a], [b]) => a.localeCompare(b));
</script>

<div class="p-8 max-w-6xl mx-auto min-h-screen bg-[#0f172a] text-white">
    <!-- Header -->
    <header class="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
        <div>
            <h1 class="text-4xl font-black tracking-tight mb-2">CAMP MANAGER</h1>
            <p class="text-white/40 font-medium">SK Networks Family AI Camp 27th</p>
        </div>
        <div class="flex items-center gap-3">
            <button
                on:click={resetData}
                class="px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-xs font-bold uppercase tracking-widest text-white/50 hover:text-white"
            >
                Factory Reset
            </button>
            <button
                on:click={() => dispatch("logout")}
                class="px-6 py-3 rounded-xl bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 text-red-400 font-bold text-xs uppercase tracking-widest transition-all"
            >
                System Logout
            </button>
        </div>
    </header>

    <div class="grid lg:grid-cols-3 gap-10">
        <!-- Add Section -->
        <aside class="space-y-6">
            <div class="glass-card p-8 rounded-3xl border border-white/10 shadow-xl relative overflow-hidden">
                <div class="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
                    <svg class="w-12 h-12" fill="currentColor" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
                </div>
                <h2 class="text-xl font-bold mb-6">Create Student</h2>
                <form on:submit|preventDefault={addUser} class="space-y-4">
                    <div>
                        <label class="block text-[10px] uppercase font-bold text-white/30 mb-2 tracking-widest">Student ID</label>
                        <input
                            type="text"
                            bind:value={newId}
                            placeholder="e.g. 27기_홍길동"
                            class="dashboard-input w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-indigo-500/50 transition-all text-sm"
                            required
                        />
                    </div>
                    <div>
                        <label class="block text-[10px] uppercase font-bold text-white/30 mb-2 tracking-widest">Access Password</label>
                        <input
                            type="text"
                            bind:value={newPw}
                            placeholder="Default: 1234"
                            class="dashboard-input w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-indigo-500/50 transition-all text-sm"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isSaving}
                        class="add-btn w-full py-4 rounded-xl text-white font-bold text-xs uppercase tracking-widest transition-all"
                    >
                        {isSaving ? "Registering..." : "Add to Roster"}
                    </button>
                </form>
            </div>

            {#if message}
                <div role="alert" class="p-4 rounded-2xl border {message.includes('✅') ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-red-500/10 border-red-500/20 text-red-400'} text-center text-sm font-bold animate-fade-in">
                    {message}
                </div>
            {/if}
        </aside>

        <!-- List Section -->
        <main class="lg:col-span-2 space-y-6">
            <div class="glass-card rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
                <div class="p-6 bg-white/[0.02] border-b border-white/5 flex items-center justify-between">
                    <h2 class="text-xl font-bold flex items-center gap-3">
                        Student Roaster
                        <span class="px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase">
                            {Object.keys(users).length} total
                        </span>
                    </h2>
                    <div class="relative max-w-[200px] w-full">
                        <input
                            type="text"
                            bind:value={searchTerm}
                            placeholder="Search name..."
                            class="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-xs outline-none focus:border-indigo-500/30 transition-all"
                        />
                    </div>
                </div>

                <div class="overflow-x-auto max-h-[600px] overflow-y-auto custom-scrollbar">
                    <table class="w-full text-left border-collapse">
                        <thead class="sticky top-0 bg-[#161f35] z-10">
                            <tr>
                                <th class="px-8 py-5 text-[10px] uppercase font-bold text-white/30 tracking-widest">Student ID</th>
                                <th class="px-8 py-5 text-[10px] uppercase font-bold text-white/30 tracking-widest">Password</th>
                                <th class="px-8 py-5 text-[10px] uppercase font-bold text-white/30 tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-white/5">
                            {#if isLoading}
                                <tr>
                                    <td colspan="3" class="px-8 py-20 text-center text-white/20 font-medium animate-pulse">
                                        Downloading roster data...
                                    </td>
                                </tr>
                            {:else if filteredUsers.length === 0}
                                <tr>
                                    <td colspan="3" class="px-8 py-20 text-center text-white/20 font-medium">
                                        No students found matching your search.
                                    </td>
                                </tr>
                            {:else}
                                {#each filteredUsers as [id, pw]}
                                    <tr class="hover:bg-white/[0.02] transition-all group">
                                        <td class="px-8 py-5 font-bold text-indigo-100">{id}</td>
                                        <td class="px-8 py-5 text-white/40 font-mono text-sm">{pw}</td>
                                        <td class="px-8 py-5 text-right">
                                            <button
                                                on:click={() => deleteUser(id)}
                                                class="px-4 py-2 rounded-lg bg-red-500/10 text-red-500 opacity-0 group-hover:opacity-100 hover:bg-red-500 text-[10px] font-bold uppercase transition-all hover:text-white"
                                            >
                                                Expel
                                            </button>
                                        </td>
                                    </tr>
                                {/each}
                            {/if}
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    </div>
</div>

<style lang="scss">
    .glass-card {
        background: rgba(255, 255, 255, 0.02);
        backdrop-filter: blur(20px);
    }
    
    .dashboard-input:focus {
        background: rgba(255, 255, 255, 0.08);
        box-shadow: 0 0 15px rgba(99, 102, 241, 0.1);
    }

    .add-btn {
        background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
        box-shadow: 0 4px 15px rgba(99, 102, 241, 0.2);
        &:hover:not(:disabled) {
            transform: scale(1.02);
            filter: brightness(1.1);
        }
    }

    .custom-scrollbar {
        &::-webkit-scrollbar { width: 6px; }
        &::-webkit-scrollbar-track { background: transparent; }
        &::-webkit-scrollbar-thumb { 
            background: rgba(255, 255, 255, 0.05); 
            border-radius: 10px;
        }
        &::-webkit-scrollbar-thumb:hover { background: rgba(255, 255, 255, 0.1); }
    }

    .animate-fade-in {
        animation: fadeIn 0.3s ease-out forwards;
    }

    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
    }
</style>
