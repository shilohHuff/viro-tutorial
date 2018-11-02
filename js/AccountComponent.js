'use strict';

import React, { Component } from 'react';

import { StyleSheet } from 'react-native';

import {
	ViroText,
	ViroNode,
  ViroMaterials,
} from 'react-viro';

import HundredDollarBundle from './money-types/HundredDollarBundle';
import Dollar from './money-types/Dollar';
import DollarStack from './stacks/DollarStack';
import HundredDollarBundleStack from './stacks/HundredDollarBundleStack';
import BigBundleStack from './stacks/BigBundleStack';
import PalletStack from './stacks/PalletStack';
import { countOfEachMoneyType } from './CalculateAmounts';

export default class MoneyStackScene extends Component {

	constructor() {
		super();
		this.generateMoneyStacks = this.generateMoneyStacks.bind(this);
	}

	generateMoneyStacks(accountBalance) {
		let moneyTypeQuantity = countOfEachMoneyType(accountBalance);
    let moneyStackComponents = [];
		moneyStackComponents.push(<DollarStack count={moneyTypeQuantity.dollarQuantity.count} />);
		moneyStackComponents.push(<HundredDollarBundleStack position={[.25,0,0]} count={moneyTypeQuantity.bundleQuantity.count} />);
		moneyStackComponents.push(<BigBundleStack position={[.5,0,0]} count={moneyTypeQuantity.bigBundleQuantity.count} />);
		moneyStackComponents.push(<PalletStack position={[-.5,0,-1]} count={moneyTypeQuantity.palletQuantity.count} />);
		return moneyStackComponents;
	}

	render() {
    let account = this.props.account;

    let position = this.props.position;
    if (!position) {
        position = [0, 0, 0];
    }

		return (
				<ViroNode position={[...position]}>
          <ViroText
            text={account.name}
            position={[0, 1, 0]}
            style={styles.accountNameStyle}
            transformBehaviors={['billboardY']}
            extrusionDepth={2}
            materials={["frontMaterial", "backMaterial", "sideMaterial"]}
          />
					<ViroText
            text={'$' + account.balance}
            position={[0, 0.5, 0]}
            style={styles.accountBalanceStyle}
            transformBehaviors={['billboardY']}
            extrusionDepth={2}
            materials={["frontMaterial", "backMaterial", "sideMaterial"]}
          />
					{this.generateMoneyStacks(account.balance)}
				</ViroNode>
		);
	}
}

var styles = StyleSheet.create({
  accountNameStyle: {
		fontFamily: 'Arial',
		fontSize: 20,
		color: '#ffffff',
		textAlignVertical: 'center',
		textAlign: 'center',
	},
	accountBalanceStyle: {
		fontFamily: 'Arial',
		fontSize: 20,
		color: '#ffffff',
		textAlignVertical: 'center',
		textAlign: 'center',
	},
});

ViroMaterials.createMaterials({
    frontMaterial: {
      diffuseColor: '#FFFFFF',
    },
    backMaterial: {
      diffuseColor: '#FF0000',
    },
    sideMaterial: {
      diffuseColor: '#000011',
    },
});
module.exports = MoneyStackScene;
