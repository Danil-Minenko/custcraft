<script setup>
import { useUiStore } from '../stores/ui.js'
const ui = useUiStore()

function openModal(product) {
    ui.selectedProduct = product
    ui.showNicknameModal = true
}
</script>

<template>
    <div class="premium"  id="donate">
        <div class="container">
            <div class="section-header">
                <h2>[Премиум]</h2>
                <p>Поддержи сервер и получи дополнительные возможности</p>
            </div>

            <div class="cards-grid">
                <!-- START -->
                <div class="donate-card start">
                    <div class="card-glow"></div>

                    <div class="card-top">
                        <span class="plan">ПРЕМИУМ</span>
                        <h3>СТАРТ</h3>
                        <div class="price">
                            <span class="amount">29₽</span>
                            <span class="time">/ 7 дней</span>
                        </div>
                    </div>

                    <ul class="features">
                        <li class="section-title">Улучшения</li>
                        <li>Все возможности игрока</li>
                        <li>Префикс [Премиум]</li>
                        <li>До 2 /sethome</li>
                        <li>До 2 регионов WorldGuard</li>
                        <li>До 6 участников клана</li>
                        <li>До 10 аукционов</li>
                        <li>Перезарядка команды /rtp снижена до 30 секунд</li>
                        <li class="section-title">Новые возможности</li>
                        <li class="highlight"><span class="icon">🔥</span>/hat</li>
                        <li>/workbench</li>
                    </ul>

                    <button class="buy-btn" @click="openModal('PremiumStart_7d')">Купить</button>
                </div>

                <!-- BASE -->
                <div class="donate-card base popular">
                    <div class="popular-tag">РЕКОМЕНДУЕМ</div>
                    <div class="card-glow"></div>

                    <div class="card-top">
                        <span class="plan">ПРЕМИУМ</span>
                        <h3>БАЗА</h3>
                        <div class="price">
                            <span class="amount">49₽</span>
                            <span class="time">/ 7 дней</span>
                        </div>
                    </div>

                    <ul class="features">
                        <li class="section-title">Улучшения</li>
                        <li>Все возможности СТАРТ</li>
                        <li>Префикс [Премиум+]</li>
                        <li>До 3 /sethome</li>
                        <li>До 3 регионов WorldGuard</li>
                        <li>До 10 участников клана</li>
                        <li>До 15 аукционов</li>
                        <li>Перезарядка команды /rtp снижена до 15 секунд</li>
                        <li class="section-title">Новые возможности</li>
                        <li class="highlight"><span class="icon">🔥</span>/enderchest</li>
                        <li class="highlight"><span class="icon">🔥</span>/back (После смерти команда недоступна 30
                            секунд)</li>
                        <li class="highlight"><span class="icon">🔥</span>/feed (Перезарядка команды 10 минут)</li>
                    </ul>

                    <button class="buy-btn" @click="openModal('PremiumBase_7d')">Купить</button>
                </div>

                <!-- PRO -->
                <div class="donate-card pro">
                    <div class="card-glow"></div>

                    <div class="card-top">
                        <span class="plan">ПРЕМИУМ</span>
                        <h3>ПРО</h3>
                        <div class="price">
                            <span class="amount">79₽</span>
                            <span class="time">/ 7 дней</span>
                        </div>
                    </div>

                    <ul class="features">
                        <li class="section-title">Улучшения</li>
                        <li>Все возможности БАЗА</li>
                        <li>Префикс [Премиум+]</li>
                        <li>До 5 /sethome</li>
                        <li>До 5 регионов WorldGuard</li>
                        <li>До 20 участников клана</li>
                        <li>До 21 аукционов</li>
                        <li>Перезарядка команды /rtp снижена до 5 секунд</li>
                        <li class="section-title">Новые возможности</li>
                        <li class="highlight"><span class="icon">🔥</span>Доступ к частицам (particles)</li>
                        <li>/anvil</li>
                        <li>/cartographytable</li>
                        <li>/loom</li>
                        <li>/ptime</li>
                        <li>/pweather</li>
                    </ul>

                    <button class="buy-btn" @click="openModal('PremiumPro_7d')">Купить</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
/* =========================================
   PREMIUM SECTION
========================================= */

.premium {
    position: relative;
    padding: 140px 24px 60px;
    overflow: hidden;
    background: transparent;
}


/* =========================================
   HEADER
========================================= */

.section-header {
    position: relative;
    z-index: 2;

    text-align: center;

    margin-bottom: 80px;
}

.section-header h2 {
    color: #f6efe3;

    font-size: clamp(42px, 6vw, 88px);

    font-weight: 900;

    line-height: .9;

    letter-spacing: -4px;

    margin-bottom: 18px;

    text-shadow:
        0 0 20px rgba(255, 255, 255, .08),
        0 10px 40px rgba(0, 0, 0, .5);
}

.section-header p {
    color: rgba(255, 255, 255, 0.45);

    font-size: 18px;

    font-weight: 500;
}

/* =========================================
   GRID
========================================= */

.cards-grid {
    position: relative;
    z-index: 2;

    display: grid;

    grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));

    gap: 28px;
    align-items: stretch;
}

/* =========================================
   CARD
========================================= */

.donate-card {
    position: relative;

    padding: 38px;

    border-radius: 36px;

    display: flex;
    flex-direction: column;

    overflow: hidden;

    background:
        linear-gradient(to bottom,
            rgba(255, 255, 255, 0.07),
            rgba(255, 255, 255, 0.03));

    border: 1px solid rgba(255, 255, 255, 0.08);

    backdrop-filter: blur(18px);

    transition:
        transform .35s ease,
        border-color .35s ease,
        box-shadow .35s ease;
    height: 100%;
}

.donate-card::before {
    content: '';

    position: absolute;
    inset: 0;

    background:
        linear-gradient(to bottom right,
            rgba(255, 255, 255, 0.08),
            transparent 40%);

    pointer-events: none;
}

.donate-card:hover {
    transform: translateY(-10px);

    border-color: rgba(255, 255, 255, 0.18);

    box-shadow:
        0 20px 60px rgba(0, 0, 0, .45);
}

/* =========================================
   GLOW
========================================= */
.card-glow {
    position: absolute;

    width: 300px;
    height: 300px;

    border-radius: 50%;

    top: -120px;
    right: -120px;

    opacity: .25;

    filter: blur(80px);

    pointer-events: none;
}

.start .card-glow {
    background: #4da3ff;
}

.base .card-glow {
    background: #9f6bff;
}

.pro .card-glow {
    background: #ff5db1;
}

/* =========================================
   CARD CONTENT
========================================= */

.card-top,
.features,
.buy-btn,
.popular-tag {
    position: relative;
    z-index: 2;
}

.buy-btn {
    margin-top: auto;
}

.plan {
    color: rgba(255, 255, 255, 0.45);

    font-size: 12px;
    font-weight: 700;

    letter-spacing: 2px;
}

.card-top h3 {
    margin-top: 12px;
    margin-bottom: 24px;

    font-size: 48px;
    font-weight: 900;

    line-height: .9;

    letter-spacing: -2px;

    color: #f6efe3;
}

.price {
    display: flex;
    align-items: flex-end;

    gap: 10px;

    margin-bottom: 34px;
}

.amount {
    font-size: 58px;
    font-weight: 900;

    line-height: .9;

    color: white;
}

.time {
    margin-bottom: 6px;

    color: rgba(255, 255, 255, 0.45);

    font-size: 15px;
}

/* =========================================
   FEATURES
========================================= */

.features {
    list-style: none;
    padding: 0;
    margin: 0 0 34px;
}

.features li {
    position: relative;
    padding-left: 28px;
    margin-bottom: 12px;

    display: flex;
    align-items: flex-start;

    color: rgba(255, 255, 255, 0.78);
    font-size: 15px;
    line-height: 1.5;
}

.features li::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0.75em;

    width: 7px;
    height: 7px;
    border-radius: 50%;

    background: rgba(255, 255, 255, 0.85);
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.6);
}

.features li.highlight {
    display: flex;
    align-items: center;
    gap: 8px;

    padding: 10px 14px 10px 34px;
    margin: 8px 0;

    border-radius: 10px;

    color: #fff;
    font-weight: 700;

    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.08);

    position: relative;
}

.features li.highlight::before {
    display: none;
}

.features li.highlight .icon {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);

    font-size: 12px;
    filter: drop-shadow(0 0 6px rgba(255, 120, 0, 0.5));
}

.features .section-title::before {
    display: none;
}

.features .section-title {
    margin: 18px 0 10px;

    font-size: 12px;
    font-weight: 800;
    letter-spacing: 1.5px;

    text-transform: uppercase;

    color: rgba(255, 255, 255, 0.35);
}

/* =========================================
   BUTTON
========================================= */

.buy-btn {
    width: 100%;
    height: 58px;

    border: none;

    border-radius: 18px;

    background:
        linear-gradient(to bottom,
            rgba(255, 255, 255, 1),
            rgba(255, 255, 255, .88));

    color: #050507;

    font-size: 15px;
    font-weight: 800;

    cursor: pointer;

    transition:
        transform .25s ease,
        box-shadow .25s ease;
}

.buy-btn:hover {
    transform: scale(1.02);

    box-shadow:
        0 10px 30px rgba(255, 255, 255, .15);
}

/* =========================================
   POPULAR
========================================= */

.popular {
    transform: scale(1.03);

    border-color: rgba(159, 107, 255, 0.35);

    box-shadow:
        0 0 60px rgba(159, 107, 255, 0.12);
}

.popular:hover {
    transform: scale(1.03) translateY(-10px);
}

.popular-tag {
    position: absolute;

    top: 20px;
    right: 20px;

    padding: 8px 14px;

    border-radius: 999px;

    background:
        linear-gradient(135deg,
            #9f6bff,
            #6d7cff);

    color: white;

    font-size: 11px;
    font-weight: 800;

    letter-spacing: 1px;

    box-shadow:
        0 10px 25px rgba(159, 107, 255, .35);
}

/* =========================
   ADAPTIVE (MATCH HOME.VUE)
========================= */

/* very large screens */
@media (min-width: 1920px) {
    .premium {
        padding-top: 180px;
    }

    .cards-grid {
        grid-template-columns: repeat(3, 1fr);
        max-width: 1400px;
        margin: 0 auto;
    }

    .donate-card {
        padding: 42px;
    }

    .card-top h3 {
        font-size: 54px;
    }

    .amount {
        font-size: 64px;
    }
}

/* laptops */
@media (max-width: 1440px) {
    .premium {
        padding-top: 120px;
    }

    .donate-card {
        padding: 34px;
    }

    .card-top h3 {
        font-size: 42px;
    }

    .amount {
        font-size: 52px;
    }
}

/* tablets */
@media (max-width: 1024px) {
    .premium {
        padding-top: 140px;
    }

    .cards-grid {
        grid-template-columns: 1fr;
        gap: 22px;
    }

    .donate-card {
        padding: 30px;
    }

    .popular {
        transform: none;
    }

    .popular:hover {
        transform: translateY(-10px);
    }
}

/* large phones */
@media (max-width: 768px) {
    .premium {
        padding: 80px 18px 40px;
    }

    .section-header h2 {
        letter-spacing: -2px;
    }

    .card-top h3 {
        font-size: 34px;
    }

    .amount {
        font-size: 44px;
    }

    .features li {
        font-size: 14px;
    }
}

/* small phones */
@media (max-width: 480px) {
    .premium {
        padding: 140px 14px 30px;
    }

    .donate-card {
        padding: 22px;
        border-radius: 24px;
    }

    .card-top h3 {
        font-size: 30px;
    }

    .amount {
        font-size: 38px;
    }

    .buy-btn {
        height: 52px;
        font-size: 14px;
    }
}
</style>