// action types
export const ADD_ACCOUNT = 'ADD_ACCOUNT';
export const SELECT_ACCOUNT = 'SELECT_ACCOUNT';

// action creators
export function addAccount(name, balance) {
    return { type: ADD_ACCOUNT, account: {name, balance} };
}

export function selectAccounts(accountIndexs) {
    return { type: SELECT_ACCOUNT, selected: [...accountIndexs] };
}