<template>
  <div v-if="shouldShow" class="breadcrumbs mt-18 mb-18 md:mt-28 md:mb-28">
    <ol class="breadcrumbs__list" itemscope="itemscope" itemtype="https://schema.org/BreadcrumbList">
      <li
        v-for="(bread, idx) in breadCrumbs"
        :key="idx"
        itemprop="itemListElement"
        itemscope="itemscope"
        itemtype="https://schema.org/ListItem"
        class="breadcrumbs__item"
      >
        <nuxt-link
          v-if="!!bread.name && idx !== breadCrumbs.length - 1"
          :to="{ name: bread.name, params: bread.params, query: bread.query }"
          itemid="/"
          itemtype="https://schema.org/Thing"
          itemscope="itemscope"
          itemprop="item"
          class="breadcrumbs__link"
        >
          <span itemprop="name">{{ bread.linkName }}</span>
        </nuxt-link>
        <span v-else itemprop="name" class="breadcrumbs__active">{{ bread.linkName }}</span>
      </li>
    </ol>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";

// import AppStore from "@/modules/Root/store/AppStore";
import { RouteLink } from "@/_core/models/RouteLink";

@Component
export default class BreadCrumbs extends Vue {
  @Prop()
  links: RouteLink[];

  get breadCrumbs() {
    // return this.links || getModule(AppStore, this.$store).breadCrumbs;
    return this.links;
  }

  get shouldShow() {
    return !!this.breadCrumbs && this.breadCrumbs.length > 1;
  }
}
</script>

<style lang="scss">
.breadcrumbs {
  // padding: 12px 0;

  &__list {
    list-style-type: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
  }

  &__item {
    display: inline-flex;
    align-items: center;
    &::after {
      content: ">";
      font-size: 12px;
      color: #9495a6;
      padding: 0 3px;
    }

    &:last-child {
      &::after {
        display: none;
      }
    }
  }

  &__link,
  &__active {
    font-weight: 500;
    font-size: 12px;
    line-height: 24px;
    color: #9495a6;
  }

  &__link {
    transition: all 0.5s ease;
    &:hover {
      color: #16192c;
    }
  }

  &__active {
    color: #16192c;
  }
}
</style>
