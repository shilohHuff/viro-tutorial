// action types
export const ADD_ACCOUNT = 'ADD_ACCOUNT';

// action creators
export function addAccount(name, balance) {
    return { type: ADD_ACCOUNT, account: {name, balance} };
}