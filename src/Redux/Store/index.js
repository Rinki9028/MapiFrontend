import { applyMiddleware, compose, legacy_createStore as createStore } from "redux";
import { persistReducer } from "redux-persist";
import logger from "redux-logger";
import rootReducer from "../Reducers";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { encryptTransform } from 'redux-persist-transform-encrypt';

const encryptionConfig = encryptTransform({
    secretKey: 'root',
    onError: function (error) {
      // Handle the error.
    },
})

const persistConfig = {
  key: "root",
  storage,
  transforms: [encryptionConfig]
};


const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middlewares = [logger];
const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(...middlewares))
);
export { store };
