import React from "react";
import { Routing } from "./Routing/Routing";

import { Provider } from 'react-redux'
import { store } from './Redux/Store'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

function App() {
  const persistor = persistStore(store)

  return (
    <Provider store={store}>
      <PersistGate loading={<>Loading...</>} persistor={persistor}>
        <Routing/>
      </PersistGate>
    </Provider>
  );
}

export default App;
