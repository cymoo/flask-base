import Vue from 'vue/dist/vue.esm'
import Hello from './components/Hello.vue'

const vm = new Vue({
    el: '#demo',
    components: {
        'hello': Hello
    }
})