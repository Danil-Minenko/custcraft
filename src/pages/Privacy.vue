<script setup>
import { ref, onMounted, nextTick } from 'vue'

const visible = ref(false)

onMounted(async () => {
  await nextTick()

  requestAnimationFrame(() => {
    const lenis = window.lenis

    if (lenis) {
      lenis.scrollTo(0, { duration: 0 })
      lenis.resize?.()
    } else {
      window.scrollTo({ top: 0 })
    }

    visible.value = true
  })
})
</script>

<template>
  <div class="privacy-page">
    <div class="container" :class="{ visible }">

      <div class="header">
        <h1>Политика обработки персональных данных</h1>
        <p>для услуги «Статус Премиум»</p>
      </div>

      <div class="card">
        <h2>1. Общие положения</h2>
        <p>
          Настоящая Политика обработки персональных данных определяет порядок обработки данных пользователей услуги
          «Статус Премиум» на игровом сервере Minecraft.
        </p>

        <div class="info-grid">
          <div>Миненко Данил Игоревич</div>
          <div>ИНН: 222210222957</div>
          <div>Email: custcraftserver@gmail.com</div>
        </div>

        <p>
          Политика разработана в соответствии с Федеральным законом №152-ФЗ «О персональных данных».
        </p>
      </div>

      <div class="card">
        <h2>2. Основные понятия</h2>
        <p>
          Персональные данные — любая информация, относящаяся к прямо или косвенно определённому физическому лицу.
        </p>
        <p>
          Обработка персональных данных — любое действие с такими данными: сбор, хранение, использование, удаление и
          т.д.
        </p>
      </div>

      <div class="card">
        <h2>3. Категории данных</h2>
        <p>Оператор обрабатывает только минимально необходимую информацию:</p>

        <ul>
          <li>Игровой никнейм пользователя</li>
          <li>Дата покупки услуги «Статус Премиум»</li>
          <li>Информация о платеже (сумма, дата, ID транзакции)</li>
        </ul>

        <p class="muted">
          Никнейм используется только как игровой идентификатор и не позволяет установить личность пользователя.
        </p>

        <p>
          Оператор не обрабатывает: ФИО, телефон, паспортные данные, банковские реквизиты, геолокацию и иные
          чувствительные данные.
        </p>
      </div>

      <div class="card">
        <h2>4. Цели обработки</h2>
        <ul>
          <li>Активация услуги «Статус Премиум»</li>
          <li>Подтверждение оплаты</li>
          <li>Исполнение условий оферты</li>
          <li>Ведение внутреннего учёта услуг</li>
          <li>Соблюдение налогового законодательства</li>
        </ul>

        <p class="muted">
          Данные не используются для рекламы и маркетинга.
        </p>
      </div>

      <div class="card">
        <h2>5. Правовые основания</h2>
        <p>
          Обработка осуществляется на основании исполнения договора (публичной оферты)
          и требований законодательства РФ (152-ФЗ, налоговое законодательство).
        </p>
      </div>

      <div class="card">
        <h2>6. Хранение и обработка данных</h2>
        <p>
          Данные о никнейме и покупке хранятся для учёта оказанных услуг и технической работы сервера.
        </p>
        <p>
          Платёжные данные обрабатываются платёжным провайдером и не хранятся оператором напрямую.
        </p>
        <p>
          Данные о платежах могут фиксироваться в системе налогового учёта («Мой налог»).
        </p>
      </div>

      <div class="card">
        <h2>7. Сроки хранения</h2>
        <p>
          Данные хранятся не дольше, чем это необходимо для оказания услуги и ведения учёта,
          либо до удаления по запросу пользователя, если иное не требует закон.
        </p>
      </div>

      <div class="card">
        <h2>8. Безопасность</h2>
        <p>
          Оператор принимает разумные технические и организационные меры для защиты данных от несанкционированного
          доступа.
        </p>
        <p>
          Доступ к базе данных имеет только оператор.
        </p>
      </div>

      <div class="card">
        <h2>9. Права пользователя</h2>
        <ul>
          <li>Запрос информации об обработке данных</li>
          <li>Запрос удаления данных (если это не противоречит закону)</li>
          <li>Обращение по email</li>
        </ul>
      </div>

      <div class="card">
        <h2>10. Изменения политики</h2>
        <p>
          Оператор вправе обновлять Политику. Новая версия вступает в силу с момента публикации на сайте.
        </p>
      </div>

      <div class="card">
        <h2>11. Контакты</h2>
        <div class="footer-info">
          <div>Email: custcraftserver@gmail.com</div>
          <div>Срок ответа: до 10 рабочих дней</div>
        </div>

        <p class="muted">
          Дата публикации: 03 июня 2026 г. · Версия 1.0
        </p>
      </div>

    </div>
  </div>
</template>

<style scoped>
.privacy-page {
  min-height: 100vh;

  padding: 140px 24px 80px;

  background:
    linear-gradient(to bottom,
      #050507 0%,
      #0b0c11 100%);
}

/* =========================
   CONTAINER
========================= */

.container {
  max-width: 1100px;
  margin: 0 auto;
  opacity: 0;
  transform: translateY(-50px);
  transition: opacity .5s, transform .5s;

}

.container.visible {
  opacity: 1;
  transform: translateY(0px);
}

/* =========================
   HEADER
========================= */

.header {
  text-align: center;

  margin-bottom: 70px;
}

.header h1 {
  font-size: clamp(46px, 7vw, 92px);

  color: #f6efe3;

  font-weight: 900;

  letter-spacing: -5px;

  line-height: .95;

  margin-bottom: 18px;

  text-shadow:
    0 0 20px rgba(255, 255, 255, .08),
    0 10px 40px rgba(0, 0, 0, .5);
}

.header p {
  color: rgba(255, 255, 255, .45);

  font-size: 18px;
}

/* =========================
   CARDS
========================= */

.card {
  position: relative;

  overflow: hidden;

  padding: 34px;

  margin-bottom: 22px;

  border-radius: 30px;

  background:
    linear-gradient(to bottom,
      rgba(255, 255, 255, .06),
      rgba(255, 255, 255, .03));

  border: 1px solid rgba(255, 255, 255, .08);

  backdrop-filter: blur(18px);

  transition:
    transform .25s ease,
    border-color .25s ease,
    background .25s ease;
}

.card::before {
  content: '';

  position: absolute;
  inset: 0;

  background:
    linear-gradient(to bottom right,
      rgba(255, 255, 255, .08),
      transparent 40%);

  pointer-events: none;
}

.card:hover {
  transform: translateY(-3px);

  border-color:
    rgba(255, 255, 255, .12);

  background:
    linear-gradient(to bottom,
      rgba(255, 255, 255, .07),
      rgba(255, 255, 255, .04));
}

/* =========================
   TYPOGRAPHY
========================= */

.card h2 {
  position: relative;
  z-index: 2;

  font-size: 28px;

  color: #f6efe3;

  font-weight: 800;

  margin-bottom: 18px;
}

.card p,
.card li,
.info-grid,
.footer-info {
  position: relative;
  z-index: 2;

  color: rgba(255, 255, 255, .68);

  line-height: 1.7;

  font-size: 16px;
}

.card b {
  color: white;
}

/* =========================
   LIST
========================= */

ul {
  list-style: none;

  padding: 0;

  margin: 20px 0;
}

li {
  position: relative;

  padding-left: 28px;

  margin-bottom: 14px;
}

li::before {
  content: '';

  position: absolute;

  left: 0;
  top: 10px;

  width: 10px;
  height: 10px;

  border-radius: 50%;

  background: rgba(255, 255, 255, .9);

  box-shadow:
    0 0 10px rgba(255, 255, 255, .8);
}

/* =========================
   INFO BLOCKS
========================= */

.info-grid,
.footer-info {
  display: grid;

  gap: 10px;

  margin: 22px 0;
}

.info-grid div,
.footer-info div {
  padding: 16px 18px;

  border-radius: 18px;

  background:
    rgba(255, 255, 255, .03);

  border: 1px solid rgba(255, 255, 255, .06);
}

/* =========================
   MUTED
========================= */

.muted {
  margin-top: 18px;

  color: rgba(255, 255, 255, .45) !important;

  font-size: 14px !important;
}

/* =========================
   MOBILE
========================= */

@media (max-width: 768px) {
  .privacy-page {
    padding-top: 120px;
  }

  .card {
    padding: 26px;
    border-radius: 24px;
  }

  .card h2 {
    font-size: 24px;
  }

  .card p,
  .card li {
    font-size: 15px;
  }

  .header h1 {
    letter-spacing: -3px;
  }
}
</style>