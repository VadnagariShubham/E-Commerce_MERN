import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth-slice';
import adminProductsSlice from "./admin/product-slice";
import shopProductsSlice from "./shop/products-slice";
import shoppingCartReducer from "./shop/cart-slice"; // <-- ✅ import your cart slice
import shopAddressSlice from "./shop/address-slice";
import shopOrderSlice from "./shop/order-slice";
import shopSearchSlice from "./shop/search-slice";
import adminOrderSlice from "./admin/product-slice/order-slice";
import shopReviewSlice from "./shop/review-slice"
import commonFeatureSlice from "./common-slice"

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: adminProductsSlice,
    adminOrder: adminOrderSlice,
    shopProducts: shopProductsSlice,
    shoppingCart: shoppingCartReducer, // <-- ✅ add it here
    shopAddress : shopAddressSlice,
    shopOrder : shopOrderSlice,
    shopSearch: shopSearchSlice,
    shopReview : shopReviewSlice,
    commonFeature : commonFeatureSlice,
  },
});

export default store;
