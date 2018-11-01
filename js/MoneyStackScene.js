'use strict';

import React, { Component } from 'react';

import { StyleSheet } from 'react-native';

import {
	ViroARScene,
	ViroText,
	ViroConstants,
	ViroBox,
	ViroMaterials,
	Viro3DObject,
	ViroAmbientLight,
	ViroSpotLight,
	ViroARPlaneSelector,
	ViroARPlane,
	ViroNode,
	ViroAnimations,
} from 'react-viro';

import HundredDollarStack from './HundredDollarStack';
import Dollar from './Dollar';
const COUNT = 125;

export default class MoneyStackScene extends Component {

	constructor() {
		super();
		this.state = {
			initialText: "Initializing AR...",
			moneyText: "",
			heightOffset: 0.0,
			money: []
		};
		this._onInitialized = this._onInitialized.bind(this);
		this.generateMoneyStack = this.generateMoneyStack.bind(this);
		this.generateMoneyStack(COUNT);
	}

	generateMoneyStack(count) {
		let moneyStack = [];
		console.log("start");
		count = Math.cbrt(count)
		for (let i = 0; i < (count/5); i++) {
			for (let j = 0; j < (count/2); j++) {
				for (let k = 0; k < (count*5*2); k++) {
					let index = i + j + k;
					let item = (
						<HundredDollarStack key={i+''+j+''+k} position={[(i*.17), (k*.01), (j*.07)]} physicsBody={{type: 'Static',mass: 0}} />
					);
					moneyStack.push(item);
				}
			}
		}
		this.state.heightOffset = count * 5 * 2 * .003;
		this.state.money = moneyStack;
	}

	render() {
		return (
			<ViroARScene displayPointCloud={true} anchorDetectionTypes={"PlanesHorizontal"} onTrackingUpdated={this._onInitialized} >
				<ViroText text={this.state.initialText} scale={[.7, .7, .7]} position={[0, 0, -1]} style={styles.helloWorldTextStyle} />
				<ViroAmbientLight color={"#aaaaaa"} />
				<ViroSpotLight innerAngle={5} outerAngle={90} direction={[0, -1, -.2]}
					position={[0, 3, 1]} color="#ffffff" castsShadow={true}
				/>
				<ViroNode position={[-0.5, 0, -2]} scale={[1.0, 1.0, 1.0]}>
					<ViroText text={this.state.welcomeText1} position={[0, 1.5, 0]} style={styles.helloWorldTextStyle} />
					<ViroText text={this.state.welcomeText2} position={[0, 1, 0]} style={styles.helloWorldTextStyle} />
					{this.state.money}
				</ViroNode>
				<ViroBox
					position={[0, -5, 0]}
					height={10} width={100} length={100}
					physicsBody={{
						type: 'Kinematic', mass: 0
					}}
					opacity={0}
				/>
			</ViroARScene>
		);
	}

	_onInitialized(state, reason) {
		if (state == ViroConstants.TRACKING_NORMAL) {
			this.setState({
				initialText: "",
				moneyText: "$" + COUNT
			});
		} else if (state == ViroConstants.TRACKING_NONE) {
			// Handle loss of tracking
		}
	}
}

var styles = StyleSheet.create({
	helloWorldTextStyle: {
		fontFamily: 'Arial',
		fontSize: 30,
		color: '#ffffff',
		textAlignVertical: 'center',
		textAlign: 'center',
	},
});

module.exports = MoneyStackScene;
