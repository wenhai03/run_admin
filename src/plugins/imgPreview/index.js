import Vue from 'vue'
import content from './imgPreview.vue'

const ViewerConstructor = Vue.extend(content)
const Index = data => {
  const instance = new ViewerConstructor({
    propsData: {
      url: data
    }
  });
  // instance.vm = instance.$mount();
  // console.log("ViewerConstructor", ViewerConstructor);
  document.body.appendChild(instance.$mount().$el);

  // instance.dom = instance.vm.$el;
  instance.initImgPreview();
}
export default Index
