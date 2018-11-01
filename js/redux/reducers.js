import { combineReducers } from 'redux';
import { accounts } from './accounts-reducer';

const reducers = combineReducers({
    accounts
});

export default reducers;