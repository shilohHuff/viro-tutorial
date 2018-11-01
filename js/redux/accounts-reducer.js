import {
    ADD_ACCOUNT
} from './actions';

const initialState = {
    accounts: []
};

export function accounts(state = initialState, action) {
    switch (action.type) {
        case ADD_ACCOUNT:
            return Object.assign({}, state, {
                accounts: [
                    ...state.accounts,
                    action.account
                ]
            });
        default:
            return state;
    }
}