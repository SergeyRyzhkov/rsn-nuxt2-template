<template>
  <section>
    <header class="relative z-50">
      <div class="bg-white">
        <div class="py-34 container flex items-center">
          <TheHeaderUser class="ml-auto flex-shrink-0"></TheHeaderUser>
        </div>
      </div>
      <div class="container-fluid bg-primary relative">
        <nav class="flex flex-col">
          <ul class="header-menu-list text-14 font-semibold text-white">
            <li><nuxt-link :to="{ name: 'training' }">Программы обучения</nuxt-link></li>
            <li><nuxt-link :to="{ name: 'about' }">О нас</nuxt-link></li>
            <li><nuxt-link :to="{ name: 'webinars' }">Вебинары</nuxt-link></li>
            <li><nuxt-link :to="{ name: 'news' }">Новости</nuxt-link></li>
            <li><nuxt-link :to="{ name: 'contacts' }">Контакты</nuxt-link></li>
          </ul>
        </nav>
      </div>
    </header>
  </section>
</template>

<style lang="scss">
.header-menu-list {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  line-height: 17px;
  text-transform: uppercase;
  margin: auto;
  > li {
    > a {
      padding: 16px;
    }

    display: inline-block;
    white-space: nowrap;
    cursor: pointer;
  }
  > li + li {
    margin-left: 42px;
  }
}
</style>
