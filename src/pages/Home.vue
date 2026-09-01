<script setup>
import { ref, onMounted, onUnmounted, watch, nextTick, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import Donate from '../components/Donate.vue'
import Wiki from '../components/Wiki.vue'



const router = useRouter()
const route = useRoute()
const visible = ref(false)

/* =========================
   STATE
========================= */

let rafId = null

const serverStatus = ref('loading')
const ip = 'play.custcraft.ru'
const copied = ref(false)
const playersOnline = ref(0)



/* =========================
   SERVER
========================= */

const checkServer = async () => {
    serverStatus.value = 'loading'

    try {
        const res = await fetch(
            'https://api.mcstatus.io/v2/status/java/play.custcraft.ru'
        )

        const data = await res.json()

        const online = data.online
        playersOnline.value = online ? (data.players?.online ?? 0) : 0
        serverStatus.value = online ? 'online' : 'offline'

    } catch {
        playersOnline.value = 0
        serverStatus.value = 'offline'
    }
}

/* =========================
   COPY
========================= */

const copyIP = async () => {
    try {
        await navigator.clipboard.writeText(ip)
        copied.value = true
        setTimeout(() => (copied.value = false), 1200)
    } catch { }
}


onMounted(async () => {
    await nextTick()

    visible.value = true
    checkServer()
    setInterval(checkServer, 30000)
})

onUnmounted(() => {
    if (rafId) cancelAnimationFrame(rafId)
})
</script>


<template>
    <div class="home-content-wrapper" :class="{ visible }">
        <div class="home-content">
            <div class="main-content" id="info">
                <video class="bg-video" autoplay muted loop playsinline preload="auto">
                    <source src="/src/assets/img/bg-60.webm">
                </video>

                <div class="overlay"></div>

                <div class="container">

                    <div class="content-wrapper">

                        <div class="logo-wrapper">
                            <h1 class="logo">
                                <span>C</span>
                                <span>U</span>
                                <span>S</span>
                                <span>T</span>
                                <span>C</span>
                                <span>R</span>
                                <span>A</span>
                                <span>F</span>
                                <span>T</span>
                            </h1>
                            <div class="server-info">

                                <div class="ip" @click="copyIP">
                                    {{ ip }}
                                </div>

                                <div v-if="copied" class="copy-toast">
                                    Скопировано
                                </div>

                                <div class="meta">
                                    <span class="muted">Версия: Java 26.1.2 x Bedrock</span>

                                    <span class="dot" :class="serverStatus"></span>

                                    <span class="muted">
                                        {{ serverStatus === 'loading'
                                            ? 'Загрузка...'
                                            : serverStatus === 'online'
                                                ? `Онлайн: ${playersOnline}`
                                                : 'Оффлайн'
                                        }}
                                    </span>
                                </div>

                            </div>
                        </div>

                        <div class="social-links">
                            <div class="social-links-wrapper">

                                <a href="https://t.me/custcraft" target="_blank">
                                    <div class="social-link-item telegram"></div>
                                </a>

                                <a href="https://discord.gg/gRE4u9sXEc" target="_blank">
                                    <div class="social-link-item discord"></div>
                                </a>

                                <a href="https://www.twitch.tv/custx" target="_blank">
                                    <div class="social-link-item twitch"></div>
                                </a>

                                <a href="https://www.youtube.com/@Danil_Minenko" target="_blank">
                                    <div class="social-link-item youtube"></div>
                                </a>

                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
        <div class="pages-wrapper">
            <Donate />
            <Wiki />
        </div>
    </div>
</template>

<style scoped>
.home-content-wrapper {
    opacity: 0;
    transform: translateY(-50px);
    transition: opacity .5s, transform .5s;
}

.home-content-wrapper.visible {
    opacity: 1;
    transform: translateY(0px);
}

.pages-wrapper {
    position: relative;
    margin-top: -80px;

    background:
        radial-gradient(circle at 50% 10%,
            rgba(124, 255, 138, .04),
            transparent 25%),

        radial-gradient(circle at 50% 55%,
            rgba(159, 107, 255, .05),
            transparent 30%),

        radial-gradient(circle at 50% 90%,
            rgba(255, 93, 177, .04),
            transparent 25%),

        linear-gradient(to bottom,
            #050507 0%,
            #08090d 35%,
            #0b0d12 65%,
            #050507 100%);
}

/* ====== */
/* server-info */
/* ====== */

.server-info {
    position: absolute;

    top: calc(100% + 20px);
    left: 50%;

    transform: translateX(-50%);

    display: flex;
    flex-direction: column;
    gap: 6px;

    user-select: none;
}

.server-info .ip {
    font-size: 25px;
    font-weight: 700;

    color: rgba(255, 255, 255, 0.9);

    letter-spacing: 1px;

    padding: 10px 23px;

    border-radius: 999px;

    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.10);

    display: inline-flex;
    align-items: center;
    gap: 10px;

    width: fit-content;
    margin: 0 auto;

    backdrop-filter: blur(12px);

    cursor: pointer;
    user-select: none;

    transition: .2s ease;
    position: relative;
}

.server-info .ip:hover {
    transform: translateY(-2px);
    background: rgba(255, 255, 255, 0.10);
}

.server-info .ip::before {
    content: '';

    position: absolute;
    inset: 0;
    border-radius: 999px;

    background: linear-gradient(to bottom right,
            rgba(255, 255, 255, 0.12),
            transparent 40%);

    pointer-events: none;
}

.copy-toast {
    position: absolute;
    top: -40px;
    left: 50%;
    transform: translateX(-50%);

    padding: 6px 12px;
    border-radius: 999px;

    font-size: 13px;
    color: rgba(255, 255, 255, 0.8);

    background: rgba(0, 0, 0, 0.35);
    border: 1px solid rgba(255, 255, 255, 0.08);

    backdrop-filter: blur(10px);

    animation: fadeToast 1.2s ease forwards;
}

@keyframes fadeToast {
    0% {
        opacity: 0;
        transform: translate(-50%, 6px);
    }

    20% {
        opacity: 1;
        transform: translate(-50%, 0);
    }

    80% {
        opacity: 1;
    }

    100% {
        opacity: 0;
        transform: translate(-50%, -6px);
    }
}

.server-info .meta {
    display: flex;
    align-items: center;
    justify-content: center;

    gap: 10px;

    font-size: 13px;
    color: rgba(255, 255, 255, 0.5);
}

.server-info .dot {
    width: 4px;
    height: 4px;

    border-radius: 50%;

    background: rgba(255, 255, 255, 0.4);
}

.dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #666;
    position: relative;
}

.dot.loading {
    background: #ffd54a;
    box-shadow:
        0 0 6px rgba(255, 213, 74, 0.9),
        0 0 14px rgba(255, 213, 74, 0.7),
        0 0 28px rgba(255, 213, 74, 0.5),
        0 0 45px rgba(255, 213, 74, 0.35);

    animation: glowPulseYellow 1.2s ease-in-out infinite;
}

.dot.online {
    background: #7CFF8A;
    box-shadow:
        0 0 6px rgba(124, 255, 138, 0.9),
        0 0 14px rgba(124, 255, 138, 0.7),
        0 0 28px rgba(124, 255, 138, 0.5),
        0 0 45px rgba(124, 255, 138, 0.35);
    animation: glowPulseGreen 1.6s ease-in-out infinite;
}

.dot.offline {
    background: #ff4d4d;
    box-shadow:
        0 0 6px rgba(255, 77, 77, 0.9),
        0 0 14px rgba(255, 77, 77, 0.7),
        0 0 28px rgba(255, 77, 77, 0.5),
        0 0 45px rgba(255, 77, 77, 0.35);
    animation: glowPulseRed 1.6s ease-in-out infinite;
}

.server-info .online {
    color: #7CFF8A;
    font-weight: 600;
}

@keyframes glowPulseYellow {

    0%,
    100% {
        transform: scale(1);
        filter: brightness(1);
    }

    50% {
        transform: scale(1.25);
        filter: brightness(1.3);
    }
}

@keyframes glowPulseGreen {

    0%,
    100% {
        transform: scale(1);
        filter: brightness(1);
        box-shadow:
            0 0 6px rgba(124, 255, 138, 0.7),
            0 0 14px rgba(124, 255, 138, 0.5),
            0 0 28px rgba(124, 255, 138, 0.3);
    }

    50% {
        transform: scale(1.25);
        filter: brightness(1.3);
        box-shadow:
            0 0 10px rgba(124, 255, 138, 1),
            0 0 22px rgba(124, 255, 138, 0.8),
            0 0 60px rgba(124, 255, 138, 0.5);
    }
}

@keyframes glowPulseRed {

    0%,
    100% {
        transform: scale(1);
        filter: brightness(1);
        box-shadow:
            0 0 6px rgba(255, 77, 77, 0.7),
            0 0 14px rgba(255, 77, 77, 0.5),
            0 0 28px rgba(255, 77, 77, 0.3);
    }

    50% {
        transform: scale(1.25);
        filter: brightness(1.3);
        box-shadow:
            0 0 10px rgba(255, 77, 77, 1),
            0 0 22px rgba(255, 77, 77, 0.8),
            0 0 60px rgba(255, 77, 77, 0.5);
    }
}

/* =========================================
   ANIMATION
========================================= */

.logo span {
    display: inline-block;
    animation: letterBounce 3.6s infinite;
    animation-timing-function: ease-in-out;
}

/* задержки — создают “по очереди” */
.logo span:nth-child(1) {
    animation-delay: 0s;
}

.logo span:nth-child(2) {
    animation-delay: 0.4s;
}

.logo span:nth-child(3) {
    animation-delay: 0.8s;
}

.logo span:nth-child(4) {
    animation-delay: 1.2s;
}

.logo span:nth-child(5) {
    animation-delay: 1.6s;
}

.logo span:nth-child(6) {
    animation-delay: 2.0s;
}

.logo span:nth-child(7) {
    animation-delay: 2.4s;
}

.logo span:nth-child(8) {
    animation-delay: 2.8s;
}

.logo span:nth-child(9) {
    animation-delay: 3.2s;
}

@keyframes letterBounce {
    0% {
        transform: translateY(0);
    }

    10% {
        transform: translateY(-10px);
    }

    20% {
        transform: translateY(0);
    }

    100% {
        transform: translateY(0);
    }
}


/*.....................*/
.home-content {
    height: 100%;
}

.main-content {
    position: relative;
    height: 100dvh;
    z-index: 5;
    border-radius: 0 0 80px 80px;
    background: url(../assets/img/bg-img.png) no-repeat center top/cover;
}

/* Видео */

.bg-video {
    position: absolute;
    inset: 0;

    width: 100%;
    height: 100%;

    object-fit: cover;

    z-index: 5;
    border-radius: inherit;
}

/* Затемнение */

.overlay {
    position: absolute;
    inset: 0;

    background:
        linear-gradient(to bottom,
            rgba(0, 0, 0, 0) 0%,
            rgba(0, 0, 0, 0.08) 35%,
            rgba(0, 0, 0, 0.22) 60%,
            rgba(0, 0, 0, 0.45) 80%,
            rgba(0, 0, 0, 0.75) 100%);

    z-index: 6;
    border-radius: inherit;
}

/* Контент */

.main-content .container {
    position: relative;
    z-index: 7;

    height: 100%;
}

.main-content .content-wrapper {
    position: relative;

    height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;
}

/* Лого */

.logo-wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
}

h1 {
    font-size: 180px;
    font-weight: 1000;

    letter-spacing: -7px;
    line-height: 0.8;

    color: #f6efe3;

    user-select: none;

    text-shadow:
        0 0 20px rgba(255, 255, 255, .15),
        0 10px 40px rgba(0, 0, 0, .5);
}

/* Соцсети */

.social-links {
    position: absolute;

    left: 50%;
    bottom: 50px;

    transform: translateX(-50%);

    display: flex;
    justify-content: center;
}

.social-links-wrapper {
    display: flex;
    align-items: center;
    gap: 12px;

    padding: 10px 14px;

    border-radius: 999px;

    background: rgba(255, 255, 255, 0.05);

    border: 1px solid rgba(255, 255, 255, 0.08);

    backdrop-filter: blur(20px);

    box-shadow:
        0 20px 60px rgba(0, 0, 0, 0.35);
}

.social-link-item {
    width: 52px;
    height: 52px;

    border-radius: 999px;

    transition:
        transform .25s ease,
        background-color .25s ease,
        box-shadow .25s ease;

    cursor: pointer;
}

.social-link-item:hover {
    transform: translateY(-2px);
}

.social-link-item.telegram {
    background:
        rgba(255, 255, 255, .06) url('/src/assets/img/tg.png') center/44px no-repeat;
}

.social-link-item.discord {
    background: rgba(255, 255, 255, .06) url('/src/assets/img/discord.png') center/44px no-repeat;
}

.social-link-item.twitch {
    background:
        rgba(255, 255, 255, .06) url('/src/assets/img/twitch.png') center/44px no-repeat;
}

.social-link-item.youtube {
    background:
        rgba(255, 255, 255, .06) url('/src/assets/img/youtube.png') center/44px no-repeat;
}

/* Инфо */


/* =========================
   ADAPTIVE
========================= */

/* большие экраны (очень широкие мониторы) */
@media (min-width: 1921px) {
    h1 {
        font-size: 220px;
    }

    .main-content .container {
        max-width: 1500px;
    }

    .section-header h2 {
        font-size: 96px;
    }

    .cards-grid {
        grid-template-columns: repeat(3, 1fr);
        max-width: 1400px;
        margin: 0 auto;
    }
}

/* ноутбуки */
@media (max-width: 1440px) {
    h1 {
        font-size: 150px;
    }

    .server-info .ip {
        font-size: 22px;
    }
}

/* планшеты */
@media (max-width: 1024px) {
    h1 {
        font-size: 110px;
        letter-spacing: -4px;
    }

    .social-links {
        bottom: 30px;
    }

    .cards-grid {
        grid-template-columns: 1fr;
    }

    .donate-card {
        padding: 28px;
    }
}

/* большие телефоны */
@media (max-width: 768px) {
    h1 {
        font-size: 72px;
        letter-spacing: -3px;
    }

    .server-info .ip {
        font-size: 18px;
        padding: 8px 16px;
    }

    .server-info .meta {
        font-size: 12px;
        flex-wrap: wrap;
    }

    .social-links-wrapper {
        transform: scale(0.9);
    }

    .section-header h2 {
        font-size: 48px;
        letter-spacing: -2px;
    }
}

/* маленькие телефоны */
@media (max-width: 480px) {
    .main-content {
        border-radius: 0px 0px 24px 24px;
    }

    h1 {
        font-size: 52px;
    }

    .server-info {
        gap: 4px;
    }

    .server-info .ip {
        font-size: 16px;
        padding: 8px 14px;
    }

    .amount {
        font-size: 42px;
    }

    .card-top h3 {
        font-size: 34px;
    }

    .donate-card {
        border-radius: 24px;
    }

    .social-link-item {
        width: 44px;
        height: 44px;
    }
}
</style>