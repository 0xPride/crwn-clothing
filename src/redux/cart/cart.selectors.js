import { createSelector } from 'reselect';

// input selector
const selectCart = (state) => state.cart;

// output selector

export const selectCartHidden = createSelector(
  [selectCart],
  (cart) => cart.hidden
);

export const selectCartItems = createSelector(
  [selectCart],
  (cart) => cart.cartItems
);

export const selectCartItemsCount = createSelector(
  [selectCartItems],
  (cartItems) =>
    cartItems.reduce((count, cartItem) => count + cartItem.quantity, 0)
);

export const selectCartTotal = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce(
    (price, cartItem) => price + cartItem.quantity * cartItem.price,
    0
  )
);
