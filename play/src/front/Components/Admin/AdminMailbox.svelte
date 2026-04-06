<script lang="ts">
    import { onMount } from "svelte";
    import { fade, fly } from "svelte/transition";

    interface MailMessage {
        id: string;
        content: string;
        timestamp: number;
    }

    let messages: MailMessage[] = [];
    let isLoading = true;
    let error = "";

    onMount(fetchMessages);

    async function fetchMessages() {
        isLoading = true;
        try {
            const response = await fetch("/admin-api/admin/mailbox");
            if (response.ok) {
                messages = await response.json();
            } else {
                error = "메시지를 불러오지 못했습니다.";
            }
        } catch (e) {
            error = "서버 연결 오류가 발생했습니다.";
        } finally {
            isLoading = false;
        }
    }

    async function deleteMessage(id: string) {
        if (!confirm("이 메시지를 삭제하시겠습니까?")) return;
        try {
            const response = await fetch(`/admin-api/admin/mailbox/${id}`, {
                method: "DELETE",
            });
            if (response.ok) {
                messages = messages.filter((m) => m.id !== id);
            }
        } catch (e) {
            alert("삭제 실패");
        }
    }

    function formatDate(timestamp: number) {
        return new Date(timestamp).toLocaleString("ko-KR", {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    }
</script>

<div class="admin-mailbox">
    <div class="header-row">
        <h2 class="text-xl font-bold">익명 우체통 관리</h2>
        <button class="refresh-btn" on:click={fetchMessages} disabled={isLoading}>
            {isLoading ? "동기화 중..." : "새로고침"}
        </button>
    </div>

    {#if isLoading && messages.length === 0}
        <div class="loading-state" in:fade>
            <div class="spinner"></div>
            <p>메시지를 가져오는 중...</p>
        </div>
    {:else if messages.length === 0}
        <div class="empty-state" in:fade>
            <span class="icon">📭</span>
            <p>도착한 편지가 없습니다.</p>
        </div>
    {:else}
        <div class="message-grid">
            {#each messages as msg (msg.id)}
                <div class="msg-card" in:fly={{ y: 10, duration: 300 }}>
                    <div class="msg-header">
                        <span class="date">{formatDate(msg.timestamp)}</span>
                        <button class="del-btn" on:click={() => deleteMessage(msg.id)}>삭제</button>
                    </div>
                    <div class="msg-body">
                        {msg.content}
                    </div>
                </div>
            {/each}
        </div>
    {/if}
</div>

<style lang="scss">
    .admin-mailbox {
        padding: 10px 0;
    }

    .header-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 24px;
    }

    .refresh-btn {
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        color: rgba(255, 255, 255, 0.6);
        padding: 8px 16px;
        border-radius: 8px;
        font-size: 13px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s;
        &:hover {
            background: rgba(255, 255, 255, 0.1);
            color: white;
        }
    }

    .loading-state, .empty-state {
        text-align: center;
        padding: 80px 0;
        color: rgba(255, 255, 255, 0.3);
        .icon { font-size: 40px; display: block; margin-bottom: 10px; }
        p { font-size: 15px; font-weight: 500; }
    }

    .message-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 20px;
    }

    .msg-card {
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.05);
        border-radius: 16px;
        padding: 20px;
        display: flex;
        flex-direction: column;
        transition: transform 0.2s;
        &:hover { transform: translateY(-3px); background: rgba(255, 255, 255, 0.05); }
    }

    .msg-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 12px;
        .date { font-size: 11px; font-weight: 700; color: rgba(255, 255, 255, 0.2); text-transform: uppercase; letter-spacing: 0.5px; }
        .del-btn {
            background: rgba(239, 68, 68, 0.1);
            border: none;
            color: #ef4444;
            font-size: 11px;
            font-weight: 700;
            padding: 4px 8px;
            border-radius: 6px;
            cursor: pointer;
            &:hover { background: #ef4444; color: white; }
        }
    }

    .msg-body {
        font-size: 14px;
        line-height: 1.6;
        color: rgba(255, 255, 255, 0.8);
        white-space: pre-wrap;
        word-break: break-all;
    }

    .spinner {
        width: 24px;
        height: 24px;
        border: 2px solid rgba(255, 255, 255, 0.1);
        border-top-color: #6366f1;
        border-radius: 50%;
        margin: 0 auto 15px;
        animation: spin 0.8s linear infinite;
    }

    @keyframes spin { to { transform: rotate(360deg); } }
</style>
