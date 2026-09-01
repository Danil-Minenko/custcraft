<script setup>

import { isScrollByMenu } from '../main.js'
const year = new Date().getFullYear()
</script>

<template>
    <footer class="footer">
        <div class="footer__container">
            <div class="footer__left">
                <span>{{ year }} CUSTCRAFT</span>
            </div>

            <div class="footer__info">
                <p class="footer__name">Миненко Данил Игоревич</p>
                <p>ИНН: 222210222957</p>
                <p>Email: custcraftserver@gmail.com</p>
                <p>г. Барнаул</p>
            </div>

            <div class="footer__right">
                <RouterLink to="/policy" class="footer__link" @click="isScrollByMenu">
                    Политика обработки данных
                </RouterLink>

                <RouterLink to="/offer" class="footer__link" @click="isScrollByMenu">
                    Оферта
                </RouterLink>
            </div>
        </div>
    </footer>
</template>

<style>
.footer__info {
    text-align: center;
    font-size: 14px;
    color: rgba(255, 255, 255, 0.7);
    line-height: 1.5;
    user-select: text;
}

.footer__info p {
    margin: 0;
}

.footer__name {
    color: #fff;
    font-weight: 600;
}

/* footer */

.footer {
    width: 100%;
    padding: 20px 0;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    background: #0b0b0b;
    color: #fff;
}

.footer__container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;

    display: flex;
    justify-content: space-between;
    align-items: center;
}

.footer__right {
    display: flex;
    gap: 20px;
}

.footer__link {
    color: rgba(255, 255, 255, 0.7);
    text-decoration: none;
    transition: 0.2s;
}

.footer__link:hover {
    color: #fff;
}

/* =========================
   ADAPTIVE
========================= */

/* ноутбуки */
@media (max-width: 1024px) {
    .footer__container {
        padding: 0 16px;
    }

    .footer__right {
        gap: 14px;
    }
}

/* планшеты */
@media (max-width: 768px) {
    .footer__container {
        flex-direction: column;
        gap: 16px;
        text-align: center;
    }

    .footer__info {
        order: 2;
    }

    .footer__right {
        order: 3;
        flex-direction: column;
        align-items: center;
    }

    .footer__link {
        font-size: 14px;
    }
}

/* телефоны */
@media (max-width: 480px) {
    .footer {
        padding: 16px 0;
    }

    .footer__container {
        gap: 10px;
    }

    .footer__link {
        font-size: 13px;
    }
}
</style>