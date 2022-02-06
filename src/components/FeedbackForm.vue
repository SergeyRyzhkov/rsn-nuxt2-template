<template>
  <form @submit.prevent="send">
    <BaseInput
      v-model="formModel.name"
      placeholder="ФИО*"
      :has-error="$v.formModel.name.$error"
      class="mb-27"
      @blur="$v.formModel.name.$touch()"
    />
    <div class="flex flex-col md:flex-row">
      <BaseInput
        v-model="formModel.phone"
        type="tel"
        placeholder="Телефон*"
        :mask="phoneMask"
        :has-error="$v.formModel.phone.$error"
        class="mb-27"
        @blur="$v.formModel.phone.$touch()"
      />
      <BaseInput
        v-model="formModel.email"
        placeholder="Email*"
        :has-error="$v.formModel.email.$error"
        class="mb-27 md:ml-32"
        @blur="$v.formModel.email.$touch()"
      />
    </div>

    <div class="flex flex-col md:flex-row">
      <BaseInput v-model="formModel.city" placeholder="Из какого вы города*" class="mb-27" />
      <BaseMultiSelect v-model="formModel.area" placeholder="Специализация*" :options="areaOptions" class="mb-27 md:ml-32">
      </BaseMultiSelect>
    </div>

    <BaseInput
      v-model="formModel.comment"
      placeholder="Комментарий*"
      :has-error="$v.formModel.comment.$error"
      class="mb-27"
      @blur="$v.formModel.comment.$touch()"
    />
    <BaseButton type="submit" class="mt-20 md:mt-40">Отправить</BaseButton>

    <p class="text-12 text-gray-color mt-16 -mb-32 md:mt-32">
      Защита от спама reCAPTCHA
      <a class="inline underline focus:no-underline" href="https://policies.google.com/privacy" target="_blank"
        >Конфиденциальность
      </a>
      и
      <a class="inline underline focus:no-underline" href="https://policies.google.com/terms" target="_blank"
        >Условия использования</a
      >
    </p>
  </form>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";
import { email, required } from "vuelidate/lib/validators";
import { phoneMask } from "@/utils/InputMaskDefinitions";
import { BaseViewModel } from "@/_core/models/BaseViewModel";

const validations = () => {
  return {
    formModel: {
      name: { required },
      phone: { required },
      email: { required, email },
      comment: { required },
    },
  };
};

class FeedbackModel extends BaseViewModel {
  name = "";
  phone = "";
  email = "";
  comment = "";
  agreement = 1;
  area: any = null;
  city = "";
  type: "support" | "appeal" | "request" | "cooperation" = "appeal";
  recaptchaToken = "";
}

@Component({ validations })
export default class FeedbackForm extends Vue {
  formModel: FeedbackModel = new FeedbackModel();
  phoneMask = phoneMask;

  send() {
    this.$v.$touch();
    if (this.$v.$invalid) {
      return;
    }
    this.$modalManager.showNotify("Сообщение отправлено !");
  }

  areaOptions = [
    { id: 1, name: "Врач-1" },
    { id: 2, name: "Врач-122" },
    { id: 3, name: "Врач-44" },
    { id: 4, name: "Врач-55" },
    { id: 5, name: "Врач-6" },
    { id: 6, name: "Врач-5" },
  ];
}
</script>
