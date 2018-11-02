const PALLET_VALUE = 42000;
const BIG_BUNDLE_VALUE = 1000;
const BUNDLE_VALUE = 100;
const DOLLAR_VALUE = 1;

export const countOfEachMoneyType = (accountBalance) => {
    let palletQuantity = typeQuantityAndRemainder(accountBalance, PALLET_VALUE);
    let bigBundleQuantity = typeQuantityAndRemainder(palletQuantity.leftOverBalance, BIG_BUNDLE_VALUE);
    let bundleQuantity = typeQuantityAndRemainder(bigBundleQuantity.leftOverBalance, BUNDLE_VALUE);
    let dollarQuantity = typeQuantityAndRemainder(bundleQuantity.leftOverBalance, DOLLAR_VALUE);

    return {
        palletQuantity : palletQuantity,
        bigBundleQuantity : bigBundleQuantity,
        bundleQuantity : bundleQuantity,
        dollarQuantity : dollarQuantity
    }
};



export const typeQuantityAndRemainder = (balance, typeValue) => {
    let quantity = {
        count: 0,
        leftOverBalance: 0
    }

    quantity.count = Math.floor(balance / typeValue);
    quantity.leftOverBalance = balance % typeValue;

    return quantity;
}
