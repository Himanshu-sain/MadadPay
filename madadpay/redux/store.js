import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import locationReducer from "./slices/locationSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    location: locationReducer,
  },
});

export default store;

// import { configureStore } from "@reduxjs/toolkit";
// import { combineReducers } from "redux";
// import userReducer from "./slices/userSlice";
// import {
//   persistStore,
//   persistReducer,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from "redux-persist";

// // Dynamically import storage only on the client side
// let storage;
// if (typeof window !== "undefined") {
//   storage = require("redux-persist/lib/storage").default;
// }

// // Root reducer without persistence (for SSR)
// const rootReducer = combineReducers({
//   user: userReducer,
// });

// // Default config with storage for client-side only
// const persistConfig = {
//   key: "root",
//   storage,
//   whitelist: ["user"],
// };

// // Conditionally create persisted reducer only on client-side
// const persistedReducer =
//   typeof window !== "undefined"
//     ? persistReducer(persistConfig, rootReducer)
//     : rootReducer;

// // Create store with the persisted or non-persisted reducer based on environment
// export function makeStore() {
//   return configureStore({
//     reducer: persistedReducer,
//     middleware: (getDefaultMiddleware) =>
//       getDefaultMiddleware({
//         serializableCheck: {
//           ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//         },
//       }),
//   });
// }

// export const store = makeStore();
// export const persistor =
//   typeof window !== "undefined" ? persistStore(store) : null;
