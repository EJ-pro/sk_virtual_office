<script lang="ts">
    import AdminLogin from "./AdminLogin.svelte";
    import AdminDashboard from "./AdminDashboard.svelte";
    import { onMount } from "svelte";

    let isAdminLoggedIn = false;

    function handleLoginSuccess() {
        isAdminLoggedIn = true;
    }

    function handleLogout() {
        isAdminLoggedIn = false;
        window.location.hash = "";
    }
</script>

<div class="admin-portal-wrapper w-full h-full bg-[#0f172a] text-white overflow-auto">
    {#if !isAdminLoggedIn}
        <AdminLogin on:loginSuccess={handleLoginSuccess} />
    {:else}
        <AdminDashboard on:logout={handleLogout} />
    {/if}
</div>

<style lang="scss">
    .admin-portal-wrapper {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }
</style>
