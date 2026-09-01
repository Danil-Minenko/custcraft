<script setup>
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue'

const activeTab = ref('main')

let wikiLenis = window.lenis;

const tabs = [
    { id: 'main', label: 'Основное' },
    { id: 'teleport', label: 'Телепортация' },
    { id: 'regions', label: 'Приваты' },
    { id: 'auction', label: 'Магазин и аукционы' },
    { id: 'clans', label: 'Кланы' },
    { id: 'premium', label: 'Премиум' }
]

const commands = {
    main: [
        {
            command: '!',
            plugin: 'Essentials',
            description: 'Написать сообщение в общий чат'
        },
        {
            command: '?',
            plugin: 'Essentials',
            description: 'Задать вопрос в чате'
        },
        {
            command: '/spawn',
            plugin: 'Essentials',
            description: 'Телепортация на спавн сервера'
        },
        {
            command: '/balance',
            plugin: 'Essentials',
            description: 'Посмотреть свой баланс'
        },
        {
            command: '/pay',
            plugin: 'Essentials',
            description: 'Перевести деньги игроку'
        },
        {
            command: '/msg',
            plugin: 'Essentials',
            description: 'Личное сообщение игроку'
        },
        {
            command: '/r',
            plugin: 'Essentials',
            description: 'Ответить на последнее сообщение'
        },
        {
            command: '/kit start',
            plugin: 'Essentials',
            description: 'Получить стартовый набор'
        }
    ],

    clans: [
        {
            command: '/clan create',
            plugin: 'ClansLite',
            description: 'Создать клан'
        },
        {
            command: '/clan invite',
            plugin: 'ClansLite',
            description: 'Пригласить игрока в клан'
        },
        {
            command: '/clan kick',
            plugin: 'ClansLite',
            description: 'Исключить игрока из клана'
        },
        {
            command: '/clan home',
            plugin: 'ClansLite',
            description: 'Телепортация на базу клана'
        },
        {
            command: '/clan sethome',
            plugin: 'ClansLite',
            description: 'Установить базу клана'
        },
        {
            command: '/clan chat',
            plugin: 'ClansLite',
            description: 'Чат клана'
        },
        {
            command: '/clan disband',
            plugin: 'ClansLite',
            description: 'Удалить клан'
        }
    ],

    auction: [
        {
            command: '/market',
            plugin: 'EconomyShop',
            description: 'Открыть меню магазина'
        },
        {
            command: '/ah',
            plugin: 'AuctionHouse',
            description: 'Открыть меню аукциона'
        },
        {
            command: '/ah bid',
            plugin: 'AuctionHouse',
            description: 'Выставить предмет на продажу по конечной цене'
        },
        {
            command: '/ah sell',
            plugin: 'AuctionHouse',
            description: 'Выставить предмет на аукцион'
        }
    ],

    regions: [
        {
            command: '//wand',
            plugin: 'WorldEdit',
            description: 'Получить инструмент выделения'
        },
        {
            command: '//expired',
            plugin: 'WorldEdit',
            description: 'Расширить регион'
        },
        {
            command: '//contract',
            plugin: 'WorldEdit',
            description: 'Уменьшить регион'
        },
        {
            command: '/rg claim',
            plugin: 'WorldGuard',
            description: 'Создать приват'
        },
        {
            command: '/rg addmember',
            plugin: 'WorldGuard',
            description: 'Добавить участника в регион'
        },
        {
            command: '/rg removemember',
            plugin: 'WorldGuard',
            description: 'Удалить участника из региона'
        },
        {
            command: '/rg info',
            plugin: 'WorldGuard',
            description: 'Информация о регионе'
        }
    ],

    teleport: [
        {
            command: '/sethome',
            plugin: 'Essentials',
            description: 'Установить точку дома'
        },
        {
            command: '/home',
            plugin: 'Essentials',
            description: 'Телепортация домой'
        },
        {
            command: '/clan home',
            plugin: 'ClansLite',
            description: 'Телепортация на базу клана'
        },
        {
            command: '/clan sethome',
            plugin: 'ClansLite',
            description: 'Установить базу клана'
        },
        {
            command: '/tpa',
            plugin: 'Essentials',
            description: 'Отправить запрос телепортации'
        },
        {
            command: '/tpaccept',
            plugin: 'Essentials',
            description: 'Принять телепортацию'
        },
        {
            command: '/tpdeny',
            plugin: 'Essentials',
            description: 'Отклонить телепортацию'
        },
        {
            command: '/warp pvp',
            plugin: 'Essentials',
            description: 'Телепортация на арену'
        }
    ],

    premium: [
        {
            command: '/hat',
            plugin: 'Премиум СТАРТ',
            description: 'Надеть предмет на голову'
        },
        {
            command: '/workbench',
            plugin: 'Премиум СТАРТ',
            description: 'Открыть верстак'
        },
        {
            command: '/enderchest',
            plugin: 'Премиум БАЗА',
            description: 'Открыть эндер сундук'
        },
        {
            command: '/feed',
            plugin: 'Премиум БАЗА',
            description: 'Восстановить голод'
        },
        {
            command: '/back',
            plugin: 'Премиум БАЗА',
            description: 'Телепортация на прошлую точку'
        },
        {
            command: '/pp',
            plugin: 'Премиум ПРО',
            description: 'Включить частицы'
        },
        {
            command: '/anvil',
            plugin: 'Премиум ПРО',
            description: 'Открыть наковальню'
        },
        {
            command: '/cartographytable',
            plugin: 'Премиум ПРО',
            description: 'Открыть стол картографа'
        },
        {
            command: '/ptime',
            plugin: 'Премиум ПРО',
            description: 'Изменить время для себя'
        },
        {
            command: '/pweather',
            plugin: 'Премиум ПРО',
            description: 'Изменить погоду для себя'
        }
    ]
}

const currentCommands = computed(() => commands[activeTab.value])

// Resize при смене таба
const resizeOnTabChange = async () => {
    await nextTick()
    if (wikiLenis) {
        wikiLenis.resize()
        setTimeout(() => wikiLenis?.resize(), 80)
        setTimeout(() => wikiLenis?.resize(), 220)
    }
}

watch(activeTab, resizeOnTabChange)
</script>

<template>
    <div class="wiki-page" id="wiki">

        <div class="container">

            <div class="wiki-header">
                <h2>Команды</h2>
                <p>Основные возможности сервера</p>
            </div>

            <div class="wiki-wrapper">

                <div class="wiki-sidebar">

                    <button v-for="tab in tabs" :key="tab.id" class="wiki-tab" :class="{ active: activeTab === tab.id }"
                        @click="activeTab = tab.id">
                        {{ tab.label }}
                    </button>

                </div>

                <Transition name="wiki-fade" mode="out-in">

                    <div class="wiki-content" :key="activeTab">

                        <div class="wiki-category">

                            <div class="wiki-command" v-for="item in currentCommands" :key="item.command">

                                <div class="command-top">

                                    <span class="command">
                                        {{ item.command }}
                                    </span>

                                    <span class="plugin">
                                        {{ item.plugin }}
                                    </span>

                                </div>

                                <p>
                                    {{ item.description }}
                                </p>

                            </div>

                        </div>

                    </div>

                </Transition>

            </div>

        </div>

    </div>
</template>

<style scoped>
.wiki-page {
    min-height: 100dvh;

    padding: 60px 24px 80px;

    background: transparent;
}

.wiki-header {
    text-align: center;

    margin-bottom: 70px;
}

.wiki-header h2 {
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

.wiki-header p {
    color: rgba(255, 255, 255, .45);

    font-size: 18px;
    font-weight: 500;
}

.wiki-wrapper {
    display: grid;

    grid-template-columns: 280px 1fr;

    gap: 30px;
}

.wiki-sidebar {
    display: flex;
    flex-direction: column;

    gap: 14px;
}

.wiki-tab {
    height: 62px;

    border: none;

    border-radius: 18px;

    background: rgba(255, 255, 255, .04);

    border: 1px solid rgba(255, 255, 255, .06);

    color: rgba(255, 255, 255, .7);

    font-size: 15px;
    font-weight: 700;

    text-align: left;

    padding: 0 22px;

    cursor: pointer;

    transition: .25s ease;

    backdrop-filter: blur(12px);
}

.wiki-tab:hover {
    transform: translateX(4px);

    background: rgba(255, 255, 255, .06);
}

.wiki-tab.active {
    background:
        linear-gradient(135deg,
            rgba(255, 255, 255, .12),
            rgba(255, 255, 255, .04));

    color: white;

    border-color: rgba(255, 255, 255, .14);

    box-shadow:
        0 10px 30px rgba(0, 0, 0, .35);
}

.wiki-content {
    border-radius: 34px;

    padding: 36px;

    background:
        linear-gradient(to bottom,
            rgba(255, 255, 255, .06),
            rgba(255, 255, 255, .03));

    border: 1px solid rgba(255, 255, 255, .08);

    backdrop-filter: blur(18px);
}

.wiki-category {
    display: flex;
    flex-direction: column;

    gap: 18px;
}

.wiki-command {
    padding: 22px;

    border-radius: 22px;

    background: rgba(255, 255, 255, .03);

    border: 1px solid rgba(255, 255, 255, .06);

    transition: .25s ease;
}

.wiki-command:hover {
    transform: translateY(-2px);

    border-color: rgba(255, 255, 255, .12);

    background: rgba(255, 255, 255, .05);
}

.command-top {
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-bottom: 10px;
}

.command {
    color: #f6efe3;

    font-size: 20px;
    font-weight: 800;
}

.plugin {
    padding: 6px 10px;

    border-radius: 999px;

    background: rgba(255, 255, 255, .06);

    color: rgba(255, 255, 255, .55);

    font-size: 12px;
    font-weight: 700;
}

.wiki-command p {
    color: rgba(255, 255, 255, .62);

    line-height: 1.5;
}

.wiki-fade-enter-active,
.wiki-fade-leave-active {
    transition: opacity .18s ease;
}

.wiki-fade-enter-from,
.wiki-fade-leave-to {
    opacity: 0;
}

/* =========================
   ADAPTIVE (MATCH HOME.VUE)
========================= */

/* large screens */
@media (min-width: 1920px) {
    .wiki-wrapper {
        grid-template-columns: 320px 1fr;
        max-width: 1400px;
        margin: 0 auto;
    }

    .wiki-content {
        padding: 44px;
    }

    .wiki-command {
        padding: 26px;
    }

    .command {
        font-size: 22px;
    }
}

/* laptops */
@media (max-width: 1440px) {
    .wiki-wrapper {
        grid-template-columns: 260px 1fr;
    }

    .wiki-content {
        padding: 32px;
    }
}

/* tablets */
@media (max-width: 1024px) {
    .wiki-wrapper {
        grid-template-columns: 1fr;
        gap: 20px;
    }

    .wiki-sidebar {
        flex-direction: row;
        overflow-x: auto;
        padding-bottom: 10px;
    }

    .wiki-tab {
        flex-shrink: 0;
        height: 56px;
    }
}

/* large phones */
@media (max-width: 768px) {
    .wiki-page {
        padding: 50px 18px 60px;
    }

    .wiki-content {
        padding: 24px;
        border-radius: 26px;
    }

    .wiki-header h2 {
        letter-spacing: -2px;
    }

    .command {
        font-size: 18px;
    }
}

/* small phones */
@media (max-width: 480px) {
    .wiki-page {
        padding: 40px 14px 50px;
    }

    .wiki-tab {
        height: 48px;
        font-size: 13px;
        padding: 0 16px;
    }

    .wiki-command {
        padding: 18px;
        border-radius: 18px;
    }

    .plugin {
        font-size: 11px;
    }
}
</style>