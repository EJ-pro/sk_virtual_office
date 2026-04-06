<script lang="ts">
    import { fade, fly } from "svelte/transition";
    import { mailboxVisibleStore, closeMailbox } from "../../Stores/MailboxStore";

    let content = "";
    let isSending = false;
    let status: "editing" | "success" | "error" = "editing";

    async function sendMail() {
        if (!content.trim() || isSending) return;
        isSending = true;
        try {
            // In our setup, play and back are separate but share the same domain or are proxied.
            // AdminDashboard uses /admin-api/..., but public mailbox can use /mailbox or similar.
            // Based on App.ts, it registers /mailbox on the main app.
            const response = await fetch("/admin-api/mailbox", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ content }),
            });
            if (response.ok) {
                status = "success";
                content = "";
            } else {
                status = "error";
            }
        } catch (e) {
            status = "error";
        } finally {
            isSending = false;
            if (status === "success") {
                setTimeout(() => {
                    status = "editing";
                    closeMailbox();
                }, 2000);
            }
        }
    }
</script>

{#if $mailboxVisibleStore}
    <div
        class="mailbox-overlay"
        on:mousedown|self={closeMailbox}
        transition:fade={{ duration: 200 }}
    >
        <div
            class="mailbox-card"
            in:fly={{ y: 20, duration: 400 }}
            out:fly={{ y: 20, duration: 400 }}
        >
            <div class="header">
                <div class="title-container">
                    <span class="icon">📮</span>
                    <h2>익명 우체통</h2>
                </div>
                <button class="close-btn" on:click={closeMailbox}>✕</button>
            </div>

            <div class="content">
                {#if status === "success"}
                    <div class="status-msg success" in:fade>
                        <div class="check">✓</div>
                        <p>소중한 의견이 전달되었습니다!</p>
                    </div>
                {:else}
                    <p class="description">
                        전하고 싶은 진심이나 건의사항을 자유롭게 남겨주세요. <br />
                        보내주신 내용은 익명으로 관리자에게 전달됩니다.
                    </p>
                    <textarea
                        bind:value={content}
                        placeholder="여기에 내용을 입력하세요..."
                        maxlength="1000"
                        disabled={isSending}
                    ></textarea>
                    
                    <div class="footer">
                        <span class="char-count" class:near-limit={content.length > 900}>
                            {content.length}/1000
                        </span>
                        <button 
                            class="send-btn" 
                            disabled={!content.trim() || isSending} 
                            on:click={sendMail}
                        >
                            {#if isSending}
                                전송 중...
                            {:else}
                                편지 보내기
                            {/if}
                        </button>
                    </div>
                {/if}

                {#if status === "error"}
                    <p class="status-msg error" in:fade>❌ 전송에 실패했습니다. 다시 시도해 주세요.</p>
                {/if}
            </div>
        </div>
    </div>
{/if}

<style lang="scss">
    .mailbox-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.4);
        backdrop-filter: blur(8px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000000;
    }

    .mailbox-card {
        width: 480px;
        background: rgba(30, 41, 59, 0.85);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 28px;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        overflow: hidden;
        color: white;
    }

    .header {
        padding: 24px 32px;
        background: rgba(255, 255, 255, 0.03);
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid rgba(255, 255, 255, 0.05);

        .title-container {
            display: flex;
            align-items: center;
            gap: 12px;
            
            .icon { font-size: 24px; }
            h2 { 
                margin: 0; 
                font-size: 20px; 
                font-weight: 800;
                letter-spacing: -0.5px;
            }
        }

        .close-btn {
            background: none;
            border: none;
            color: rgba(255, 255, 255, 0.4);
            font-size: 20px;
            cursor: pointer;
            transition: color 0.2s;
            &:hover { color: white; }
        }
    }

    .content {
        padding: 32px;

        .description {
            font-size: 14px;
            line-height: 1.6;
            color: rgba(255, 255, 255, 0.6);
            margin-top: 0;
            margin-bottom: 24px;
        }

        textarea {
            width: 100%;
            height: 180px;
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 16px;
            padding: 18px;
            color: white;
            font-size: 15px;
            resize: none;
            outline: none;
            transition: all 0.3s;
            box-sizing: border-box;

            &:focus {
                background: rgba(255, 255, 255, 0.08);
                border-color: rgba(99, 102, 241, 0.5);
                box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
            }

            &::placeholder { color: rgba(255, 255, 255, 0.2); }
        }
    }

    .footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 20px;

        .char-count {
            font-size: 12px;
            font-weight: 600;
            color: rgba(255, 255, 255, 0.3);
            &.near-limit { color: #f87171; }
        }

        .send-btn {
            background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
            border: none;
            border-radius: 12px;
            padding: 12px 28px;
            color: white;
            font-size: 14px;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.2s;
            box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);

            &:disabled {
                background: rgba(255, 255, 255, 0.1);
                color: rgba(255, 255, 255, 0.2);
                box-shadow: none;
                cursor: not-allowed;
            }

            &:hover:not(:disabled) {
                transform: translateY(-2px);
                box-shadow: 0 6px 20px rgba(99, 102, 241, 0.4);
            }
        }
    }

    .status-msg {
        text-align: center;
        padding: 40px 0;

        &.success {
            .check {
                width: 64px;
                height: 64px;
                background: rgba(16, 185, 129, 0.1);
                border: 2px solid #10b981;
                color: #10b981;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 32px;
                margin: 0 auto 20px;
            }
            p { font-weight: 700; color: #10b981; }
        }

        &.error {
            color: #f87171;
            font-size: 14px;
            font-weight: 600;
            margin-top: 16px;
            padding: 0;
        }
    }
</style>
