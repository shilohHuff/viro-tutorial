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

import Dollar from './money-types/Dollar';
import HundredDollarBundle from './money-types/HundredDollarBundle';



const COUNT = 100;

export default class MakeItRainScene extends Component {

	constructor() {
		super();
		this.state = {
			initialText: "Initializing Money Rain",
			welcomeText1: "",
			welcomeText2: "",
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
						<HundredDollarBundle
							key={i+''+j+''+k}
							position={[Math.random(), k, Math.random()]}
							physicsBody={{
								type: 'Dynamic',
								mass: 1
							}}
						/>
					);
					moneyStack.push(item);
				}
			}
		}
		this.state.money = moneyStack;
	}

	render() {
		return (
			<ViroARScene displayPointCloud={true} anchorDetectionTypes={"PlanesHorizontal"} onTrackingUpdated={this._onInitialized} >
				<ViroText text={this.state.initialText} scale={[.7, .7, .7]} position={[0, 0, -1]} style={styles.helloWorldTextStyle} />
				<ViroAmbientLight color={"#aaaaaa"} />
				<ViroSpotLight innerAngle={5} outerAngle={90} direction={[0, -1, -.2]}
					position={[0, 3, 1]} color="#ffffff" castsShadow={true} />
				<ViroARPlane
					minHeight={.1}
					minwidth={.1}
					visible={true}
					opacity={1}
				>
					{this.state.money}
					{<ViroBox
						position={[0, -5, 0]}
						height={10} width={100} length={100}
						physicsBody={{
							type: 'Kinematic', mass: 0
						}}
						opacity={0}
					/>}
				</ViroARPlane>
			</ViroARScene>
		);
	}

	_onInitialized(state, reason) {
		if (state == ViroConstants.TRACKING_NORMAL) {
			this.setState({
				initialText: "",
				welcomeText1: "Welcome to your",
				welcomeText2: "money pile."
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

module.exports = MakeItRainScene;
