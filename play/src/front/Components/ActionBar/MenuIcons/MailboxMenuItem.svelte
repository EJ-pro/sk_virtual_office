<script lang="ts">
    import { openMailbox, mailboxVisibleStore } from "../../../Stores/MailboxStore";
    import ActionBarButton from "../ActionBarButton.svelte";
    import { IconMailBox } from "../../Icons.ts";
    import { LL } from "../../../../i18n/i18n-svelte";

    function handleClick(): void {
        openMailbox();
    }
</script>

<ActionBarButton
    on:click={handleClick}
    classList="group/btn-mailbox"
    state={$mailboxVisibleStore ? "active" : "normal"}
    dataTestId="mailbox-button"
    tooltipTitle="익명 우체통"
    desc="익명으로 메시지를 남겨보세요."
>
    <IconMailBox class="w-6 h-6" />
</ActionBarButton>
