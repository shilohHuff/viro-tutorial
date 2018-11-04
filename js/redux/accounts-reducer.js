import {
    ADD_ACCOUNT,
    SELECT_ACCOUNT
} from './actions';

const initialState = {
    selected: [],
    accounts: [
        {name: "Checking Account", balance: 42177},
        {name: "Savings Account", balance: 11928},
        {name: "Secured Card", balance: 250}
    ]
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
        case SELECT_ACCOUNT:
            return Object.assign({}, state, {
                selected: [
                    ...action.selected
                ]
        });
        default:
            return state;
    }
}
