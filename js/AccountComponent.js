'use strict';

import React, { Component } from 'react';

import { StyleSheet } from 'react-native';

import {
	ViroText,
	ViroNode,
  ViroMaterials,
} from 'react-viro';

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

	generateMoneyStacks(name, accountBalance) {
		let moneyTypeQuantity = countOfEachMoneyType(accountBalance);
    let moneyStackComponents = [];
		moneyStackComponents.push(<DollarStack key={'DollarStack' + name} count={moneyTypeQuantity.dollarQuantity.count} />);
		moneyStackComponents.push(<HundredDollarBundleStack key={'HundredDollarBundleStack' + name} position={[.25,0,0]} count={moneyTypeQuantity.bundleQuantity.count} />);
		moneyStackComponents.push(<BigBundleStack key={'BigBundleStack' + name} position={[.5,0,0]} count={moneyTypeQuantity.bigBundleQuantity.count} />);
		moneyStackComponents.push(<PalletStack key={'PalletStack' + name} position={[-.5,0,-1]} count={moneyTypeQuantity.palletQuantity.count} />);
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
					{this.generateMoneyStacks(account.name, account.balance)}
				</ViroNode>
		);
	}
}

var styles = StyleSheet.create({
  accountNameStyle: {
		fontFamily: 'Arial',
		fontSize: 15,
		color: '#ffffff',
		textAlignVertical: 'center',
		textAlign: 'center',
	},
	accountBalanceStyle: {
		fontFamily: 'Arial',
		fontSize: 15,
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
