<template>
  <div v-if="countPage > 1" class="brc-pagination">
    <ul>
      <li
        class="page-action"
        :class="{ disabled: pagination.currentPage === 1 }"
        @click="fireUpdateEvent(pagination.currentPage - 1)"
      >
        Назад
      </li>
      <li v-if="pages[0] > 1" @click="fireUpdateEvent(pages[0] - 1)">&lt;</li>
      <li v-for="page in pages" :key="page" :class="{ active: isActivePage(page) }" @click="() => fireUpdateEvent(page)">
        {{ page }}
      </li>
      <li v-if="pages[pages.length - 1] < countPage" @click="() => fireUpdateEvent(pages[pages.length - 1] + 1)">&gt;</li>
      <li
        class="page-action"
        :class="{ disabled: pagination.currentPage === pagination.lastPage }"
        @click="fireUpdateEvent(pagination.currentPage + 1)"
      >
        Вперед
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import { Pagination } from "@/_core/models/Pagination";

@Component
export default class BasePagination extends Vue {
  @Prop()
  pagination: Pagination;

  @Prop({ default: true })
  onUpdateScroolToTop;

  isActivePage(pageNmb: number) {
    return pageNmb === this.pagination.currentPage || this.pagination.selectedPages?.includes(pageNmb);
  }

  get countPage() {
    return Pagination.countPage(this.pagination);
  }

  get pages() {
    const pages: number[] = [];
    let startPage = 1;
    let endPage = this.countPage;

    if (this.pagination.currentPage - Math.floor(this.pagination.perPage / 2) <= 1) {
      endPage = this.pagination.perPage < this.countPage ? this.pagination.perPage : this.countPage;
    } else if (this.pagination.currentPage + Math.floor(this.pagination.perPage / 2) > this.countPage) {
      startPage = this.countPage - this.pagination.perPage > 1 ? this.countPage - this.pagination.perPage : 1;
    } else {
      startPage = this.pagination.currentPage - Math.floor(this.pagination.perPage / 2);
      endPage = startPage + this.pagination.perPage - 1;
    }
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  }

  fireUpdateEvent(pageNmb: number) {
    this.$emit("update:page", pageNmb);
    if (this.onUpdateScroolToTop) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }
}
</script>

<style lang="scss">
.brc-pagination {
  display: block;
  width: 100%;

  ul {
    width: 100%;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    > li {
      &:not(.page-action) {
        margin: 11px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        font-size: 14px;
        line-height: 17px;
        font-weight: 600;
        cursor: pointer;
      }
      &.page-action {
        line-height: 17px;
        font-size: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        &.disabled {
          color: #c9c9c9;
          pointer-events: none;
          margin: 8px;
        }
      }
      &.active:not(.page-action) {
        padding: 10px;
        margin: 4px;
        width: 34px;
        height: 34px;
        background-color: $secondary;
        color: #ffffff;
      }
    }
  }
}
</style>
