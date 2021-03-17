import { ADD_COUNT, ADD_ITEM } from './mutation-types';

export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      // 1.查找之前的cartList是否含有payload
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid);

      if (oldProduct) {
        context.commit(ADD_COUNT, oldProduct);
        resolve('添加商品数量+1!')
      } else {
        context.commit(ADD_ITEM, payload);
        resolve('添加新商品成功！')
      }
    });
  }
}