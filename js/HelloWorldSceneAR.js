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

const COUNT = 10;

export default class HelloWorldSceneAR extends Component {

	constructor() {
		super();

		// Set initial state here
		this.state = {
			text: "Initializing AR...",
			money: [],
			moneyRefs: []
		};


		// bind 'this' to functions
		this._onInitialized = this._onInitialized.bind(this);
		this.makeItRain = this.makeItRain.bind(this);


		this.makeItRain(COUNT);
	}



	makeItRain(count) {
		let newMoney = [];
		console.log("start");
		for (let i = 0; i < (count/3); i++) {
			for (let j = 0; j < (count); j++) {
				for (let k = 0; k < (count*3); k++) {
					let item = <ViroBox
							key={i}
							ref={(component) => {
								let oldMoney = this.state.moneyRefs;
								oldMoney[i] = component;
								this.setState({
									moneyRefs: oldMoney
								});
							}}
							position={[(i*.16), (k*.01), (j*.07)]}
							height={.01} width={.16} length={.07}
							dragType={"FixedToWorld"}
							onDrag={() => { }}
							onCollision={(tag, oldPosition) => {
								this.state.moneyRefs[i].setNativeProps({
									physicsBody: {
										type: 'Static', mass: 0
									}
								});

							}}
							physicsBody={{
								type: 'Static', mass: 0
							}}
							materials={["grid"]}
					/>;


					newMoney.push(item);
				}
			}
		}
		this.state.money = newMoney;
	}

	render() {
		return (
			<ViroARScene displayPointCloud={true} anchorDetectionTypes={"PlanesHorizontal"} onTrackingUpdated={this._onInitialized} >
				<ViroText text={this.state.text} scale={[.5, .5, .5]} position={[0, 0, -1]} style={styles.helloWorldTextStyle} />
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
					<ViroBox
						position={[0, -5, 0]}
						height={10} width={100} length={100}
						physicsBody={{
							type: 'Kinematic', mass: 0
						}}
						opacity={0}
						materials={["grid"]}
					/>
				</ViroARPlane>
				<ViroNode position={[0, -1, 0]} dragType="FixedToWorld" onDrag={() => { }} >
					<Viro3DObject
						source={require('./res/dollar-stack/dollar-stack.obj')}
						resources={[require('./res/dollar-stack/dollar_01.svg.png'),
						require('./res/dollar-stack/dollar.mtl')]}
						position={[0, 0, 0]}
						scale={[.02, .02, .02]}
						type="OBJ" />
				</ViroNode>
			</ViroARScene>
		);
	}

	_onInitialized(state, reason) {
		if (state == ViroConstants.TRACKING_NORMAL) {
			this.setState({
				text: "Hello Joshie poo!"
			});
		} else if (state == ViroConstants.TRACKING_NONE) {
			// Handle loss of tracking
		}
	}
}

ViroMaterials.createMaterials({
	grid: {
		diffuseTexture: require('./res/dollar-stack/dollar_01.svg.png'),
	},
});

ViroAnimations.registerAnimations({
	rotate: {
		properties: {
			rotateY: "+=90"
		},
		duration: 250, //.25 seconds
	},
});

var styles = StyleSheet.create({
	helloWorldTextStyle: {
		fontFamily: 'Arial',
		fontSize: 30,
		color: '#ffffff',
		textAlignVertical: 'center',
		textAlign: 'center',
	},
});

module.exports = HelloWorldSceneAR;
