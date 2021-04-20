//Genes browser - Libert 4.2021 - ICR application

import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import './index.css'

//vueapexcharts
import VueApexCharts from "vue3-apexcharts";

// The app.use(VueApexCharts) will make <apexchart> component available everywhere.
createApp(App).use(router).use(VueApexCharts).mount('#app')
