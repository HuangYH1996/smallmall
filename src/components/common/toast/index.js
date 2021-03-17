import Toast from './Toast';

const obj = {};

// 会传过来一个Vue
obj.install = function(Vue) {
  console.log('执行了obj的install函数',Vue);
  // 1.创建一个组件构造器 传入一个组件对象
  const toastConstructor = Vue.extend(Toast);

  // 2.new的方式，根据组件构造器，可以创建出一个组件对象
  const toast = new toastConstructor();

  // 3.将组件对象，手动挂载到某个元素上
  toast.$mount(document.createElement('div'));

  // 4.toast.$el对应上面创建的div
  document.body.appendChild(toast.$el);

  // 注意这个toast！！不是Toast！！
  Vue.prototype.$toast = toast;
}

export default obj;