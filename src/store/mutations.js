import {ADD_COUNT, ADD_ITEM} from './mutation-types';

export default {
  // addCart(state, payload) {
  //   let oldProduct = null;
  //   for (let item of state.cartList) {
  //     if (item.iid === payload.iid) {
  //       oldProduct = item;
  //       oldProduct.count += 1;
  //     }
  //   }
  //   if (!oldProduct) {
  //     payload.count = 1;
  //     state.cartList.push(payload);
  //   }
  // },
  [ADD_COUNT](state, payload) {
    payload.count += 1;
  },
  [ADD_ITEM](state, payload) {
    payload.checked = true;
    payload.count = 1;
    state.cartList.push(payload);
  }
}