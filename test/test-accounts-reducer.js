import { expect } from 'chai';
import { describe, it } from 'mocha';

import { createStore } from 'redux';
import reducers from '../js/redux/reducers';
import { addAccount } from '../js/redux/actions';


describe('Test account reducer', () => {
    it('should add a basic account', () => {
        /*
        const store = createStore(reducers);

        store.dispatch(addAccount("name1", 1200));

        expect(store.getState().accounts).deep.equals({
            accounts: [
                {
                    name: "name1",
                    balance: 1200
                }
            ]
        })
        */
    });
});
