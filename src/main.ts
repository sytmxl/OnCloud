import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import AOS from 'aos';
import 'aos/dist/aos.css';

import axios from 'axios'
// import "tailwindcss/tailwind.css";
import './assets/main.scss'
import 'material-icons/iconfont/material-icons.css';

//md3 design system baseline linked in html, here override palette tokens
// import './assets/css/palette-blue.css'
import './assets/css/baseline.css'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// theming element plus by forward
// import './assets/element-variables.scss'
// theming element plus by override
import './assets/ep.scss'

// import {instance} from "@/http";
const app = createApp(App)
axios.defaults.baseURL = 'http://43.143.244.118:5000/';
// axios.defaults.baseURL = 'http://127.0.0.1:4523/m1/3298576-0-default/';
const token = localStorage.getItem('token');
axios.defaults.headers.common['Authorization'] = `Token ${token}`;

// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
// app.use(axios, axios)

// 图片拖动
// import Fancybox from "@fancyapps/ui";
// import "@fancyapps/ui/dist/fancybox/fancybox.css";

import LazyLoad from 'vanilla-lazyload'

app.config.globalProperties.$lazyload = new LazyLoad({
  threshold: 300
})

app.use(router)
app.use(ElementPlus)
// app.use(Fancybox)
app.mount('#app')

// AOS.init();

AOS.init({
    // Global settings:
    disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
    startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
    initClassName: 'aos-init', // class applied after initialization
    animatedClassName: 'aos-animate', // class applied on animation
    useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
    disableMutationObserver: false, // disables automatic mutations' detections (advanced)
    debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
    throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)
    
    
    // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
    offset: 50, // offset (in px) from the original trigger point
    delay: 0, // values from 0 to 3000, with step 50ms
    duration: 400, // values from 0 to 3000, with step 50ms
    easing: 'bezier', // default easing for AOS animations
    once: false, // whether animation should happen only once - while scrolling down
    mirror: false, // whether elements should animate out while scrolling past them
    anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
  
  });