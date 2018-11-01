import { AppRegistry } from 'react-native';
import App from './App.js';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux'; 
import reducers from './js/redux/reducers';
import { addAccount } from './js/redux/actions.js';


const store = createStore(reducers);
const AppWithProvider = <Provider store={store}><App /></Provider>;

// initial dispatch
console.log(store.getState());
store.dispatch(addAccount("name1", 1200));
store.dispatch(addAccount("name2", 500));

AppRegistry.registerComponent('APP_NAME_HERE', () => AppWithProvider);
AppRegistry.registerComponent('ViroSample', () => AppWithProvider);
