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
  <div class="offer-page">
    <div class="container" :class="{ visible }">

      <div class="header">
        <h1>Публичная оферта</h1>
        <p>на оказание цифровых услуг на сервере Minecraft CUSTCRAFT</p>
      </div>

      <div class="card">
        <h2>1. Общие положения</h2>

        <p>
          1.1. Настоящий документ является публичной офертой (ст. 437 ГК РФ) самозанятого (плательщика
          налога на профессиональный доход):
        </p>

        <div class="info-grid">
          <div>Миненко Данил Игроевич</div>
          <div>ИНН: 222210222957</div>
          <div>Email: custcraftserver@gmail.com</div>
        </div>

        <p>
          1.2. Оферта размещена в сети Интернет по адресу: <a
            href="https://custcraft.ru/offer">https://custcraft.ru/offer</a>. Оферта вступает в силу с
          момента размещения и действует до момента отзыва
          Исполнителем.
        </p>
        <p>1.3. Акцепт оферты происходит в момент успешной оплаты услуги через платёжного провайдера. Оплата
          означает полное согласие Пользователя со всеми условиями оферты.
        </p>
      </div>

      <div class="card">
        <h2>2. Предмет оферты</h2>

        <p>
          2.1. Исполнитель предоставляет Пользователю цифровые внутриигровые привилегии на сервере Minecraft CUSTCRAFT.
        </p>

        <p><b>2.2. Доступные тарифы:</b></p>

        <ul>
          <li><b>Премиум СТАРТ</b> — 29₽ / 7 дней</li>
          <li><b>Премиум БАЗА</b> — 49₽ / 7 дней</li>
          <li><b>Премиум ПРО</b> — 79₽ / 7 дней</li>
        </ul>

        <p class="muted">
          2.3. Услуга является цифровой, действует только на сервере CUSTCRAFT и не переносится на другие проекты.
        </p>
      </div>

      <div class="card">
        <h2>3. Состав привилегий</h2>

        <p><b>3.1. Премиум СТАРТ</b></p>
        <ul>
          <li>Все возможности обычного игрока</li>
          <li>До 2 /sethome</li>
          <li>До 2 регионов WorldGuard</li>
          <li>До 6 участников клана</li>
          <li>До 10 аукционов</li>
          <li>/rtp (перезарядка 30 секунд)</li>
          <li>/hat</li>
          <li>/workbench</li>
          <li>Префикс: [Премиум]</li>
        </ul>

        <p><b>3.2. Премиум БАЗА</b></p>
        <ul>
          <li>Все возможности Премиум СТАРТ</li>
          <li>До 3 /sethome</li>
          <li>До 3 регионов WorldGuard</li>
          <li>До 10 участников клана</li>
          <li>До 15 аукционов</li>
          <li>/rtp (перезарядка 15 секунд)</li>
          <li>/enderchest</li>
          <li>/feed (перезарядка 10 минут)</li>
          <li>/back (недоступна 30 секунд после смерти)</li>
          <li>Префикс: [Премиум+]</li>
        </ul>

        <p><b>3.3. Премиум ПРО</b></p>
        <ul>
          <li>Все возможности Премиум БАЗА</li>
          <li>До 5 /sethome</li>
          <li>До 5 регионов WorldGuard</li>
          <li>До 20 участников клана</li>
          <li>До 21 аукциона</li>
          <li>/rtp (перезарядка 5 секунд)</li>
          <li>/anvil</li>
          <li>/cartographytable</li>
          <li>/loom</li>
          <li>/ptime</li>
          <li>/pweather</li>
          <li>/pp (частицы)</li>
          <li>Префикс: [Премиум+]</li>
        </ul>
      </div>

      <div class="card">
        <h2>4. Порядок оказания услуги</h2>

        <p>
          4.1. Пользователь указывает игровой ник перед оплатой.
        </p>

        <p>
          4.2. Исполнитель проверяет корректность ника и возможность выдачи привилегии.
        </p>

        <p>
          4.3. После подтверждения пользователь производит оплату через платёжного провайдера.
        </p>

        <p>
          4.4. Активация услуги происходит в течение 24 часов после оплаты.
        </p>

        <p>
          4.5. Услуга считается оказанной с момента выдачи привилегии на сервере.
        </p>
      </div>

      <div class="card">
        <h2>5. Оплата и возврат</h2>

        <p>
          5.1. Оплата осуществляется через платёжного провайдера, доступного на сайте.
        </p>

        <p>
          5.2. До момента активации услуги возможен возврат средств. После активации услуга считается оказанной в полном
          объёме
          и возврат не производится.
        </p>
      </div>

      <div class="card">
        <h2>6. Ответственность сторон</h2>

        <p>
          6.1. Пользователь несёт ответственность за корректность введённых данных.
        </p>

        <p>
          6.2. Исполнитель не несёт ответственности за сбои сервера, действия третьих лиц, изменения игрового клиента
          или
          нарушение правил сервера пользователем.
        </p>
      </div>

      <div class="card">
        <h2>7. Персональные данные</h2>

        <p>
          7.1. Пользователь даёт согласие на обработку персональных данных, необходимых для исполнения услуги (ФЗ-152).
        </p>
      </div>

      <div class="card">
        <h2>8. Заключительные положения</h2>

        <p>
          8.1. Исполнитель вправе изменять условия оферты с публикацией новой редакции на сайте.
        </p>

        <p>
          8.2. Споры решаются в досудебном порядке через email. Срок ответа - до 10 рабочих дней. При невозможности
          урегулирования — в судебном порядке по
          месту регистрации Исполнителя.
        </p>

        <div class="footer-info">
          <div>Миненко Данил Игроевич</div>
          <div>ИНН: 222210222957</div>
          <div>Email: custcraftserver@gmail.com</div>
        </div>
        <p class="muted">
          Дата публикации: 31 мая 2026 г. · Версия 1.0
        </p>
      </div>

    </div>
  </div>
</template>

<style scoped>
.offer-page {
  min-height: 100vh;
  user-select: text;

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
  font-size: 80px;

  color: #f6efe3;

  font-weight: 900;

  letter-spacing: -6px;

  line-height: .9;

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
   INFO GRID
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
  .header h1 {
    letter-spacing: -3px;
    font-size: 50px;
  }

  .offer-page {
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
}
</style>