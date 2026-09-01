<script setup>
import { ref } from 'vue'
import { useUiStore } from '../stores/ui'
import axios from 'axios'

const ui = useUiStore()
const nickname = ref('')
const agreed = ref(false) // состояние чекбокса
const result = ref(null)  // результат проверки ника
const loading = ref(false) // состояние загрузки

const buying = ref(false)

function close() {
    ui.showNicknameModal = false
}

async function check() {
    if (!nickname.value) return

    loading.value = true
    result.value = null

    try {
        const res = await axios.get(`/api/Check_nick.php?nick=${encodeURIComponent(nickname.value)}`)
        // Ожидаем { isExists: true/false }
        result.value = res.data
        console.log('Результат проверки ника:', result.value)
    } catch (e) {
        console.error('Ошибка при проверке ника:', e)
        result.value = { isExists: false }
    } finally {
        loading.value = true
    }
}
async function buyPremium(productCode) {
    buying.value = true

    try {
        const res = await axios.post('/api/payments/robokassa_create.php', {
            nickname: nickname.value,
            product: productCode
        })

        const data = res.data

        if (!data.success) {
            throw new Error(data.error || 'Ошибка подготовки платежа')
        }

        console.log('Платёж подготовлен, Order ID:', data.order_id)

        // === Создаём и отправляем POST-форму ===
        const form = document.createElement('form')
        form.action = data.form.action
        form.method = 'POST'
        form.style.display = 'none'

        // Добавляем все скрытые поля
        Object.entries(data.form.fields).forEach(([key, value]) => {
            const input = document.createElement('input')
            input.type = 'hidden'
            input.name = key
            input.value = value
            form.appendChild(input)
        })

        document.body.appendChild(form)
        form.submit()   // отправляем форму

    } catch (e) {
        console.error('Ошибка при создании платежа:', e)

        alert(
            'Не удалось подготовить оплату: ' +
            (e.response?.data?.error || e.message || 'Неизвестная ошибка')
        )
    } finally {
        buying.value = false
    }
}
// async function buyPremium(productCode) {
//     // if (!result.value?.isExists || !agreed.value) return

//     buying.value = true

//     try {
//         const res = await axios.post('/api/payments/robokassa_create.php', {
//             nickname: nickname.value,
//             product: productCode
//         })

//         const data = res.data

//         if (!data.success) {
//             throw new Error(data.error || 'Ошибка подготовки платежа')
//         }

//         console.log('Ссылка на оплату получена:', data)

//         window.location.href = data.url

//     } catch (e) {
//         console.error('Ошибка при создании платежа:', e)

//         alert(
//             'Не удалось подготовить оплату: ' +
//             (e.response?.data?.error || e.message || 'Неизвестная ошибка')
//         )
//     } finally {
//         buying.value = false
//     }
// }
// async function buyPremium(productCode) {
//     nickname.value = "Покупка временно недоступна";
//     result.value = { isExists: false }
//     if (true)return
//     if (!result.value?.isExists || !agreed.value) return
//     console.log(productCode)
//     buying.value = true

//     try {
//         // Запрос на сервер → получаем параметры и action
//         const res = await axios.post('/api/payments/self_create_2.php', {
//             nickname: nickname.value,
//             product: productCode
//         })

//         const data = res.data

//         if (!data.success) {
//             throw new Error(data.error || 'Ошибка подготовки платежа')
//         }

//         console.log('Параметры платежа получены:', data)

//         // Создаём скрытую форму и отправляем её (браузер уйдёт на оплату)
//         const form = document.createElement('form')
//         form.method = 'POST'
//         form.action = data.action  // https://pro.selfwork.ru/merchant/v1/init
//         //form.target = '_blank'
//         form.style.display = 'none'

//         // Добавляем все параметры (включая signature)
//         Object.entries(data.params).forEach(([key, value]) => {
//             const input = document.createElement('input')
//             input.type = 'hidden'
//             input.name = key
//             input.value = value
//             form.appendChild(input)
//         })

//         document.body.appendChild(form)
//         form.submit()  // ← здесь происходит переход на страницу оплаты

//         // Если хочешь — можно добавить таймер или сообщение "Перенаправляем..."
//         // setTimeout(() => { alert('Перенаправляем на оплату...') }, 300)

//     } catch (e) {
//         console.error("Ошибка при создании/отправке платежа:", e)
//         alert("Не удалось подготовить оплату: " + (e.message || 'Неизвестная ошибка'))
//     } finally {
//         buying.value = false
//     }
// }
</script>

<template>
    <div class="modal-overlay" @click.self="close">
        <div class="modal-card">

            <div class="modal-glow"></div>

            <div class="modal-header">
                <div class="title">
                    <span class="prefix">[Премиум]</span>
                    <span class="nickname">{{ nickname || "Steve" }}</span>
                </div>
            </div>

            <div class="modal-body">
                <p class="hint">Укажи никнейм на сервере</p>

                <div class="input-box" :class="result === null ? '' : result.isExists ? 'ok' : 'error'">

                    <input v-model="nickname" class="input" placeholder="Никнейм" />

                    <button class="check-btn" @click="check">
                        Проверить
                    </button>
                </div>
            </div>

            <div class="modal-footer">

                <label class="policy">
                    <input type="checkbox" v-model="agreed" />
                    <span>
                        Я принимаю
                        <router-link to="/policy" target="_blank">политику</router-link>
                        и
                        <router-link to="/offer" target="_blank">оферту</router-link>
                    </span>
                </label>

                <button class="buy-btn" :disabled="!result?.isExists || !agreed"
                    @click="buyPremium(ui.selectedProduct)">
                    Продолжить покупку
                </button>

            </div>

        </div>
    </div>
</template>

<style scoped>
/* OVERLAY */
.modal-overlay {
    position: fixed;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;

    background: rgba(0, 0, 0, 0.65);
    backdrop-filter: blur(18px);

    z-index: 9999;
}

/* CARD */
.modal-card {
    position: relative;
    width: 560px;
    padding: 36px;

    border-radius: 36px;

    background: linear-gradient(to bottom,
            rgba(255, 255, 255, 0.07),
            rgba(255, 255, 255, 0.03));

    border: 1px solid rgba(255, 255, 255, 0.10);

    backdrop-filter: blur(20px);

    display: flex;
    flex-direction: column;
    gap: 22px;

    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.45);
    overflow: hidden;
}

/* glow */
.modal-glow {
    position: absolute;
    width: 280px;
    height: 280px;
    top: -120px;
    right: -120px;

    background: #9f6bff;
    opacity: .18;
    filter: blur(80px);
    border-radius: 50%;
}

/* HEADER */
.title {
    display: flex;
    align-items: baseline;
    gap: 10px;
}

.prefix {
    color: rgba(255, 255, 255, 0.5);
    font-weight: 800;
    letter-spacing: 1px;
    font-size: 12px;
}

.nickname {
    font-size: 28px;
    font-weight: 900;
    color: #f6efe3;
}

/* BODY */
.hint {
    color: rgba(255, 255, 255, 0.5);
    font-size: 14px;
    margin-bottom: 10px;
}

/* INPUT */
.input-box {
    display: flex;
    height: 52px;

    border-radius: 16px;
    overflow: hidden;

    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.08);

    transition: .2s;
}

.input-box.ok {
    border-color: rgba(124, 255, 138, 0.5);
    box-shadow: 0 0 20px rgba(124, 255, 138, 0.15);
}

.input-box.error {
    border-color: rgba(255, 77, 77, 0.5);
    box-shadow: 0 0 20px rgba(255, 77, 77, 0.15);
}

.input {
    flex: 1;
    border: none;
    outline: none;

    padding: 0 14px;

    background: transparent;
    color: white;
    font-size: 14px;
}

.check-btn {
    width: 140px;
    border: none;

    background: rgba(255, 255, 255, 0.12);
    color: white;

    font-weight: 700;
    cursor: pointer;

    transition: .2s;
}

.check-btn:hover {
    background: rgba(255, 255, 255, 0.18);
}

.check-btn:disabled {
    opacity: 0.4;
    cursor: not-allowed;
}

/* FOOTER */
.modal-footer {
    display: flex;
    flex-direction: column;
    gap: 14px;
}

.policy {
    display: flex;
    gap: 10px;
    font-size: 11px;
    color: rgba(255, 255, 255, 0.5);
}

.policy a {
    color: white;
    text-decoration: none;
}

.policy a:hover {
    text-decoration: underline;
}

/* BUY BUTTON — взят стиль как на сайте */
.buy-btn {
    height: 54px;
    border-radius: 16px;

    border: none;

    background: linear-gradient(to bottom, #fff, rgba(255, 255, 255, 0.85));

    font-weight: 900;
    cursor: pointer;

    transition: .2s;
}

.buy-btn:hover {
    transform: translateY(-2px);
}

.buy-btn:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    transform: none;
}

/* RESPONSIVE */
@media (max-width: 600px) {
    .modal-card {
        width: 92vw;
        padding: 22px;
    }
    .modal-glow{
        z-index: 2;
    }
    .check-btn {
        z-index: 3;
        width: 110px;
        font-size: 12px;
    }

    .nickname {
        font-size: 22px;
    }
}
</style>