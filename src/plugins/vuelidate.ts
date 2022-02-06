import { Component } from "nuxt-property-decorator";

import Vue from "vue";
import Vuelidate from "vuelidate";

Component.registerHooks(["validations"]);
Vue.use(Vuelidate);
