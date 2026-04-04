<script lang="ts">
    import { onMount } from "svelte";
    import type { Game } from "../../Phaser/Game/Game";
    import type { LoginScene } from "../../Phaser/Login/LoginScene";
    import { LoginSceneName } from "../../Phaser/Login/LoginScene";
    import logoImg from "../images/logo.svg";
    import poweredByWorkAdventureImg from "../images/Powered_By_WorkAdventure_Big.png";
    import bgMap from "../images/map-exemple.png";
    import { gameManager } from "../../Phaser/Game/GameManager";
    import { LL, locale } from "../../../i18n/i18n-svelte";
    import { NameNotValidError, NameTooLongError } from "../../Exception/NameError";
    import { fetchCredentials } from "../../Utils/Credentials";

    export let game: Game;

    let loginScene: LoginScene | undefined;
    $: if (game) {
        loginScene = game.scene.getScene(LoginSceneName) as LoginScene;
    }

    let id = "";
    let password = "";
    let startValidating = false;
    let isAuthenticating = false;
    let errorMessage = "";

    let logo = gameManager.currentStartedRoom?.loginSceneLogo ?? logoImg;
    let legals = gameManager.currentStartedRoom?.legals ?? {};
    const sceneBg = gameManager.currentStartedRoom?.backgroundSceneImage ?? bgMap;

    let legalStrings: string[] = [];
    if (legals?.termsOfUseUrl) {
        legalStrings.push(
            '<a href="' +
                encodeURI(legals.termsOfUseUrl) +
                '" target="_blank" class="text-white/70 no-underline hover:underline transition-all hover:text-white">' +
                $LL.login.termsOfUse() +
                "</a>"
        );
    }
    if (legals?.privacyPolicyUrl) {
        legalStrings.push(
            '<a href="' +
                encodeURI(legals.privacyPolicyUrl) +
                '" target="_blank" class="text-white/70 no-underline hover:underline transition-all hover:text-white">' +
                $LL.login.privacyPolicy() +
                "</a>"
        );
    }

    let legalString: string | undefined;
    onMount(() => {
        if (legalStrings.length > 0) {
            if (Intl.ListFormat) {
                const formatter = new Intl.ListFormat($locale, { style: "long", type: "conjunction" });
                legalString = formatter.format(legalStrings);
            } else {
                legalString = legalStrings.join(", ");
            }
        }
    });

    async function submit() {
        startValidating = true;
        errorMessage = "";

        const trimmedId = id.trim();
        const trimmedPw = password.trim();

        if (!trimmedId || !trimmedPw) {
            return;
        }

        isAuthenticating = true;
        try {
            // 관리자 페이지에서 설정한 최신 계정 정보 가져오기
            const credentials = await fetchCredentials();

            // 인증 로직 (동적 계정 대조)
            if (credentials[trimmedId] && credentials[trimmedId] === trimmedPw) {
                try {
                    if (!loginScene) {
                        throw new Error("Game scene not yet created");
                    }
                    // 인증 성공 시 ID를 이름으로 사용하여 로그인 진행
                    await loginScene.login(trimmedId);
                } catch (err) {
                    if (err instanceof NameTooLongError) {
                        errorMessage = $LL.login.input.name.tooLongError();
                    } else if (err instanceof NameNotValidError) {
                        errorMessage = $LL.login.input.name.notValidError();
                    } else {
                        errorMessage = $LL.login.genericError();
                    }
                }
            } else {
                // @ts-ignore - i18n keys might not be fully generated yet but will work at runtime
                errorMessage = $LL.login.error.invalid();
            }
        } catch (e) {
            errorMessage = "인증 서버에 연결할 수 없습니다. 잠시 후 다시 시도해 주세요.";
        } finally {
            isAuthenticating = false;
        }
    }

    function getBackgroundColor() {
        if (!gameManager?.currentStartedRoom) return "rgba(15, 23, 42, 0.9)";
        return gameManager.currentStartedRoom.backgroundColor || "rgba(15, 23, 42, 0.9)";
    }
</script>

<style lang="scss">
    .glass-container {
        background: rgba(255, 255, 255, 0.05);
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
    }

    .input-field {
        background: rgba(0, 0, 0, 0.2);
        border: 1px solid rgba(255, 255, 255, 0.1);
        transition: all 0.3s ease;
        &:focus {
            border-color: #6366f1;
            box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
            background: rgba(0, 0, 0, 0.3);
        }
    }

    .login-btn {
        background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
        transition: all 0.3s transform;
        &:hover:not(:disabled) {
            transform: translateY(-2px);
            filter: brightness(1.1);
        }
        &:active:not(:disabled) {
            transform: translateY(0);
        }
    }

    .animate-in {
        animation: fadeInScale 0.6s ease-out forwards;
    }

    @keyframes fadeInScale {
        from {
            opacity: 0;
            transform: scale(0.95) translateY(10px);
        }
        to {
            opacity: 1;
            transform: scale(1) translateY(0);
        }
    }

    .bg-animation {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
        overflow: hidden;
        &::after {
            content: "";
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 60%);
            animation: rotate 20s linear infinite;
        }
    }

    @keyframes rotate {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
</style>

<div class="bg-animation"></div>

<section class="absolute inset-0 flex flex-col items-center justify-center p-4 z-30 pointer-events-none">
    <div class="w-full max-w-md animate-in pointer-events-auto">
        <!-- Logo Section -->
        <div class="flex justify-center mb-8">
            <img
                draggable="false"
                src={logo}
                alt="logo"
                class="h-16 md:h-24 object-contain transition-transform hover:scale-105 duration-500"
            />
        </div>

        <!-- Login Card -->
        <div class="glass-container rounded-2xl p-8 md:p-10 text-center relative overflow-hidden">
            <div class="relative z-10">
                <h1 class="text-2xl md:text-3xl font-bold text-white mb-2">
                    SK Networks Family AI Camp
                </h1>
                <p class="text-white/60 text-sm mb-8">27기 수강생 전용 아지트 입장</p>

                <form on:submit|preventDefault={submit} class="space-y-5">
                    <!-- ID Field -->
                    <div class="text-left">
                        <label for="student-id" class="block text-xs font-medium text-white/50 mb-1.5 ml-1">
                             ID
                        </label>
                        <input
                            id="student-id"
                            type="text"
                            bind:value={id}
                            placeholder={$LL.login.input.id.placeholder()}
                            class="input-field w-full h-12 px-4 rounded-xl text-white placeholder-white/20 outline-none"
                            class:border-red-500={startValidating && !id}
                            on:input={() => { startValidating = false; errorMessage = ""; }}
                        />
                    </div>

                    <!-- Password Field -->
                    <div class="text-left">
                        <label for="student-pw" class="block text-xs font-medium text-white/50 mb-1.5 ml-1">
                             Password
                        </label>
                        <input
                            id="student-pw"
                            type="password"
                            bind:value={password}
                            placeholder={$LL.login.input.password.placeholder()}
                            class="input-field w-full h-12 px-4 rounded-xl text-white placeholder-white/20 outline-none"
                            class:border-red-500={startValidating && !password}
                            on:input={() => { startValidating = false; errorMessage = ""; }}
                        />
                    </div>

                    <!-- Error Message -->
                    {#if errorMessage}
                        <div class="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                            <p class="text-red-400 text-xs italic font-medium">
                                {errorMessage}
                            </p>
                        </div>
                    {/if}

                    <!-- Submit Button -->
                    <button
                        type="submit"
                        disabled={!id || !password}
                        class="login-btn w-full h-14 rounded-xl text-white font-bold text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                    >
                        {$LL.login.continue()}
                    </button>
                </form>

                <!-- Footer / Legals -->
                {#if legalString}
                    <div class="mt-8 pt-6 border-t border-white/5">
                        <p class="text-white/30 text-[10px] sm:text-xs leading-relaxed leading-tight">
                            {@html $LL.login.terms({
                                links: legalString,
                            })}
                        </p>
                    </div>
                {/if}
            </div>
        </div>

        <!-- Powered By -->
        {#if logo !== logoImg && gameManager.currentStartedRoom.showPoweredBy !== false}
            <div class="mt-6 flex justify-center opacity-30 hover:opacity-100 transition-opacity duration-500">
                <img draggable="false" src={poweredByWorkAdventureImg} alt="Powered by WorkAdventure" class="h-10" />
            </div>
        {/if}
    </div>
</section>

<!-- Background Layer -->
<div
    class="absolute inset-0 z-20 transition-colors duration-1000"
    style="background: linear-gradient(to bottom, {getBackgroundColor()}, rgba(15, 23, 42, 0.95)); opacity: 0.85;"
/>
<div 
    class="absolute inset-0 bg-cover bg-center z-10 grayscale-[30%] brightness-[40%]" 
    style="background-image: url('{sceneBg}');" 
/>
