import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import StackNav from "./src/navigation/StackNavigation/StackNav";
import rootReducer from "./src/store/reducers/Index";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { LogBox } from "react-native";

LogBox.ignoreAllLogs();
const store = createStore(rootReducer);

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StackNav />
      </NavigationContainer>
    </Provider>
  )

}

export default App;
