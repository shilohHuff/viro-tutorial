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

const COUNT = 1000;

export default class HelloWorldSceneAR extends Component {

	constructor() {
		super();
		this.state = {
			initialText: "Initializing AR...",
			welcomeText1: "",
			welcomeText2: "",
			money: [],
			moneyRefs: []
		};

		this._onInitialized = this._onInitialized.bind(this);
		this.makeItRain = this.makeItRain.bind(this);

		this.makeItRain(COUNT);
	}



	makeItRain(count) {
		let newMoney = [];
		console.log("start");
		count = Math.cbrt(count)
		for (let i = 0; i < (count/5); i++) {
			for (let j = 0; j < (count/2); j++) {
				for (let k = 0; k < (count*5*2); k++) {
					let item = <ViroBox
							key={i}
							ref={(component) => {
								let oldMoney = this.state.moneyRefs;
								oldMoney[i] = component;
								this.setState({
									moneyRefs: oldMoney
								});
							}}
							position={[(i*.16), (k*.002), (j*.07)]}
							height={.001} width={.16} length={.07}
							dragType={"FixedToWorld"}
							onDrag={() => { }}
							onCollision={(tag, oldPosition) => {
								

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
				<ViroText text={this.state.initialText} scale={[.7, .7, .7]} position={[0, 0, -1]} style={styles.helloWorldTextStyle} />
				<ViroAmbientLight color={"#aaaaaa"} />
				<ViroNode position={[-0.5, 0, -2]} scale={[1.0, 1.0, 1.0]}>
					<ViroText text={this.state.welcomeText1} position={[0, 1, 0]} style={styles.helloWorldTextStyle} />
					<ViroText text={this.state.welcomeText2} style={styles.helloWorldTextStyle} />
				</ViroNode>
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
						require('./res/dollar-stack/dollar-stack.mtl')]}
						position={[0, 0, 0]}
						scale={[.1, .1, .1]}
						type="OBJ" />
				</ViroNode>
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

ViroMaterials.createMaterials({
	grid: {
		diffuseTexture: require('./res/dollar-stack/dollar-stack_dollar-only.png'),
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
