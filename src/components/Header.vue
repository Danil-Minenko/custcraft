<script setup>
import { isScrollByMenu } from '../main.js'
</script>

<template>
    <header>
        <nav class="menu-wrapper">
            <ul class="menu">
                <li>
                    <RouterLink to="/" class="menu-item" active-class="active" @click="isScrollByMenu">
                        Информация
                    </RouterLink>
                </li>

                <li>
                    <RouterLink to="/donate" class="menu-item" active-class="active" @click="isScrollByMenu">
                        [Премиум]
                    </RouterLink>
                </li>

                <li>
                    <RouterLink to="/wiki" class="menu-item" active-class="active" @click="isScrollByMenu">
                        Команды
                    </RouterLink>
                </li>
            </ul>
        </nav>
    </header>
</template>

<style>
header {
    position: fixed;
    top: 0;
    left: 0;

    width: 100%;

    z-index: 100;

    display: flex;
    align-items: center;
    justify-content: center;

    padding-top: 24px;

    pointer-events: none;
}

/* Menu */

.menu-wrapper {
    pointer-events: all;

    padding: 10px 14px;

    border-radius: 999px;

    background: rgba(20, 20, 20, 0.45);

    border: 1px solid rgba(255, 255, 255, 0.08);

    backdrop-filter: blur(20px);

    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.35);
}

.menu {
    display: flex;
    align-items: center;
    gap: 8px;

    list-style: none;

    padding: 0;
    margin: 0;
}

/* Items */

.menu-item {
    display: flex;
    align-items: center;
    justify-content: center;

    padding: 12px 18px;

    border-radius: 999px;

    font-size: 15px;
    font-weight: 700;
    letter-spacing: 0.3px;

    color: rgba(246, 239, 227, 0.82);

    cursor: pointer;

    user-select: none;

    transition:
        background .25s ease,
        color .25s ease,
        transform .25s ease;
}

.menu-item:hover {
    /* background: rgba(255, 255, 255, 0.08); */

    color: #f6efe3;

    transform: translateY(-1px);
}

.menu-item.active {
    background: rgba(255, 255, 255, 0.12);
    color: #f6efe3;
    transform: none;
}

.menu-item.active:hover {
    background: rgba(255, 255, 255, 0.15);
}

/* =========================
   RESPONSIVE HEADER (NO BURGER)
========================= */

/* very large screens */
@media (min-width: 1921px) {
    header {
        padding-top: 32px;
    }

    .menu-wrapper {
        padding: 12px 18px;
    }

    .menu-item {
        font-size: 16px;
        padding: 14px 22px;
    }
}

/* laptops */
@media (max-width: 1440px) {
    .menu-item {
        font-size: 14px;
        padding: 11px 16px;
    }
}

/* tablets */
@media (max-width: 1024px) {
    header {
        padding-top: 18px;
    }

    .menu-wrapper {
        padding: 8px 10px;
    }

    .menu {
        gap: 6px;
    }

    .menu-item {
        font-size: 13px;
        padding: 10px 14px;
    }
}

/* phones */
@media (max-width: 768px) {
    header {
        padding-top: 12px;
    }

    .menu-wrapper {
        width: auto;
        max-width: calc(100% - 24px);

        padding: 6px 8px;

        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
    }

    /* важно: чтобы меню не ломалось, а скроллилось */
    .menu {
        gap: 6px;
        flex-wrap: nowrap;
        white-space: nowrap;
    }

    .menu-item {
        font-size: 12px;
        padding: 8px 12px;
        flex-shrink: 0;
    }
}

/* very small phones */
@media (max-width: 480px) {
    .menu-wrapper {
        padding: 6px;
    }

    .menu-item {
        font-size: 11px;
        padding: 7px 10px;
    }
}
</style>