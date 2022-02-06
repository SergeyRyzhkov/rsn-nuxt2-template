<template>
  <div class="flex w-full items-center justify-center">
    <div class="mt-76 mb-166 md:mt-177 md:mb-230 flex max-w-[375px] items-center justify-center">
      <div class="flex flex-col text-center">
        <h1>{{ error.status }}</h1>
        <h2 class="mt-24">{{ error.title }}</h2>
        <div class="text-14 mt-16">{{ error.description }}</div>
        <div class="mt-27">
          <div
            :to="{ name: 'main' }"
            class="text-14 inline-block cursor-pointer underline transition hover:no-underline"
            @click="goBack"
          >
            Вернуться назад
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
@Component
export default class BaseNotFound extends Vue {
  error = {
    status: 404,
    title: "Страница не найдена",
    description: "Запрашиваемая вами страница не найдена, либо произошла ошибка.",
  };

  layout: "error";

  goBack() {
    this.$router.back();
  }
}
</script>
