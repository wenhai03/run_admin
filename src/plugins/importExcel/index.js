import Vue from 'vue'
import content from './importExcel.vue'

const ImportExcel = Vue.extend(content)
const Index = data => {
  const instance = new ImportExcel();
  document.body.appendChild(instance.$mount().$el);
}
export default Index
