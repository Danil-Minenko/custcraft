import { createApp, nextTick } from 'vue'
import App from './App.vue'
import router from './router'
import Lenis from '@studio-freight/lenis'
import './assets/styles/main.css'
import { createPinia } from 'pinia'

const app = createApp(App)

const pinia = createPinia()
app.use(pinia)  // подключаем Pinia

app.use(router)
app.mount('#app')

const resetRoutes = ['/offer', '/privacy']

// -------------------- ПРОВЕРКА НА МОБИЛКУ --------------------
// Проверяем, является ли устройство мобильным (тач-экраны до 1024px)
const isMobile = () => window.matchMedia('(max-width: 1024px)').matches || ('ontouchstart' in window)

// -------------------- LENIS И НАИВНЫЙ СКРОЛЛ --------------------
let lenis = null

// Инициализируем Lenis только для десктопов
if (!isMobile()) {
  lenis = new Lenis({
    duration: 1.2,
    smoothWheel: true,
    smoothTouch: false, // Отключаем на тач-событиях, чтобы не ломать нативный жест
    autoRaf: true,
  })

  function raf(time) {
    lenis?.raf(time)
    requestAnimationFrame(raf)
  }
  requestAnimationFrame(raf)
}

// -------------------- CONFIG & STATE --------------------
const routeMap = {
  '/': '#info',
  '/wiki': '#wiki',
  '/donate': '#donate',
}
let isProgrammaticScroll = false
let scrollByMenu = router.currentRoute.value.path != '/' ? true : false;

export function isScrollByMenu() {
  scrollByMenu = true
}

console.log(scrollByMenu);

// -------------------- СКРОЛЛ К СЕКЦИИ ПРИ СМЕНЕ РОУТА --------------------
async function scrollByRoute(to) {
  const selector = routeMap[to.path]
  if (!selector || !scrollByMenu) return

  scrollByMenu = false

  const el = document.querySelector(selector)
  if (!el) return

  isProgrammaticScroll = true

  if (!isMobile() && lenis) {
    // Десктоп: скроллим через Lenis
    lenis.resize()
    lenis.scrollTo(el, {
      duration: 1.2,
      offset: -100,
      immediate: false,
    })
  } else {
    // Мобилки: используем нативный плавный скролл
    const elementPosition = el.getBoundingClientRect().top + window.scrollY
    const offsetPosition = elementPosition - 80 // На мобильных отступ обычно меньше (под шапку)

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
  }


  setTimeout(() => {
    isProgrammaticScroll = false
  }, 1300)
}

// Отслеживаем клики по ссылкам / переходы в роутере
router.afterEach((to) => {
  nextTick(() => {
    // TITLE
    document.title = to.meta.title || 'CUSTCRAFT 2'

    // DESCRIPTION
    const desc = to.meta.description
    if (desc) {
      let tag = document.querySelector('meta[name="description"]')
      if (!tag) {
        tag = document.createElement('meta')
        tag.name = 'description'
        document.head.appendChild(tag)
      }
      tag.setAttribute('content', desc)
    }

    // CANONICAL
    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }

    if (to.meta.canonical) {
      canonical.setAttribute('href', to.meta.canonical)
    }

    if (resetRoutes.includes(to.path)) {
      isProgrammaticScroll = true
      requestAnimationFrame(() => {
        isProgrammaticScroll = false
      })
      return
    }

    if (!isMobile()) {
      lenis?.resize()
    }
    scrollByRoute(to)
  })
})

// -------------------- SCROLLSPY (ОТСЛЕЖИВАНИЕ СЕКЦИЙ) --------------------
const sectionToRouteMap = Object.entries(routeMap).reduce((acc, [route, selector]) => {
  acc[selector] = route
  return acc
}, {})

// Опции для observer (на мобилках rootMargin изменен, так как экран меньше)
const observerOptions = {
  root: null,
  // Для мобильных увеличиваем зону триггера, чтобы роут менялся точнее
  rootMargin: isMobile() ? '-30% 0px -40% 0px' : '-35% 0px -60% 0px',
  threshold: 0
}

const observer = new IntersectionObserver((entries) => {
  if (isProgrammaticScroll) return

  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const id = `#${entry.target.id}`
      const targetRoute = sectionToRouteMap[id]

      if (targetRoute && router.currentRoute.value.path !== targetRoute) {
        router.replace(targetRoute).catch(() => { })
      }
    }
  })
}, observerOptions)

// Инициализируем наблюдение
router.afterEach(() => {
  nextTick(() => {
    Object.values(routeMap).forEach((selector) => {
      const el = document.querySelector(selector)
      if (el) observer.observe(el)
    })
  })
})

// -------------------- EVENTS --------------------
window.addEventListener('resize', () => {
  if (!isMobile()) {
    lenis?.resize()
  }
})

// Global Debug
if (!isMobile()) {
  window.lenis = lenis
}