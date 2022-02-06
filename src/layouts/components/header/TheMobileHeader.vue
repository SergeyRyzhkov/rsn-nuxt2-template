<template>
  <div class="bg-white">
    <div class="main-content_hidden" :class="{ active: menuOpened === true }"></div>

    <header class="flex h-[63px] items-center justify-between p-16">
      <div class="flex items-center">
        <div v-click-outside="closeMenu" class="menu-toogler" :class="{ active: menuOpened }" @click="menuToggle()">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </header>

    <div class="mobile-menu-list" :class="{ active: menuOpened === true }">
      <ul class="mt-10">
        <li><nuxt-link :to="{ name: 'training' }">Программы обучения</nuxt-link></li>
        <li><nuxt-link :to="{ name: 'about' }">О нас</nuxt-link></li>
        <li><nuxt-link :to="{ name: 'webinars' }">Вебинары</nuxt-link></li>
        <li><nuxt-link :to="{ name: 'news' }">Новости</nuxt-link></li>
        <li><nuxt-link :to="{ name: 'contacts' }">Контакты</nuxt-link></li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component
export default class TheMobileHeader extends Vue {
  menuOpened = false;

  closeMenu() {
    if (this.menuOpened === true) {
      this.menuOpened = false;
    }
  }

  menuToggle() {
    this.menuOpened = !this.menuOpened;
    this.changeOverflow(this.menuOpened);
  }

  changeOverflow(value: boolean) {
    document.documentElement.style.overflowY = value ? "hidden" : "auto";
  }
}
</script>

<style lang="scss">
.main-content_hidden {
  display: none;

  &.active {
    position: fixed;
    display: block;
    top: 0px;
    left: 0px;
    min-width: 100%;
    width: 100vw;
    min-height: 100%;
    height: 100vh;
    background-color: #bbbbbb;
    opacity: 0.7;
  }
}

.menu-toogler {
  cursor: pointer;
  &.active {
    > span:nth-child(1) {
      transform: rotate(45deg) translate(5px, 4px);
    }
    > span:nth-child(2) {
      transform: translateX(-50px);
    }
    > span:nth-child(3) {
      transform: rotate(-45deg) translate(6px, -5px);
    }
  }
  > span {
    background: $primary;
    height: 2px;
    width: 22px;
    display: block;
    transition: 0.5s;
    border-radius: 3px;
  }

  > span:nth-child(2) {
    margin-top: 5px;
  }

  > span:nth-child(3) {
    margin-top: 5px;
  }
}
.mobile-menu-list {
  visibility: hidden;
  transform: translateX(-100%);
  box-sizing: border-box;
  position: fixed;
  top: 0px;
  left: 0px;
  flex-direction: column;
  background-color: white;
  height: 100vh;
  width: 90vw;
  overflow-y: auto;
  z-index: 2147483678;
  transform-style: flat;
  transition: all 0.2s ease-in-out;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);

  &.active {
    visibility: visible;
    transform: none;
  }
  ul {
    li {
      font-size: 16px;
      line-height: 20px;
      cursor: pointer;
      a {
        padding: 10px !important;
        border-bottom: none;
      }
      &:hover {
        color: $secondary;
      }
    }
  }
}
</style>
