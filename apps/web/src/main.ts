import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import BaseTextarea from './shared/ui/BaseTextarea.vue'
import BaseInput from './shared/ui/BaseInput.vue'
import BaseSelect from './shared/ui/BaseSelect.vue'
import BaseTabs from './shared/ui/BaseTabs.vue'

const app = createApp(App);
app.component('BaseTextarea', BaseTextarea);
app.component('BaseInput', BaseInput);
app.component('BaseSelect', BaseSelect);
app.component('BaseTabs', BaseTabs);

app.mount('#app')
