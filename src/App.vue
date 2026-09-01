<script setup>
import { RouterLink } from 'vue-router'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import { useUiStore } from './stores/ui'
import NicknameModal from './components/NicknameModal.vue'

const ui = useUiStore()
components: {
  NicknameModal
}
</script>

<template>
  <Header />

  <router-view>
  </router-view>
  <transition name="fade">
    <NicknameModal v-if="ui.showNicknameModal" />
  </transition>

  <Footer />

</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.5s ease;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .2s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
