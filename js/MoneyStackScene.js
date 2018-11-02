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

import AccountComponent from './AccountComponent';

export default class MoneyStackScene extends Component {

	constructor() {
		super();
		this.state = {
			initialText: "Initializing AR...",
		};
		this._onInitialized = this._onInitialized.bind(this);
	}

	render() {
		return (
			<ViroARScene displayPointCloud={true} anchorDetectionTypes={"PlanesHorizontal"} onTrackingUpdated={this._onInitialized} >
				<ViroText text={this.state.initialText} scale={[.7, .7, .7]} position={[0, 0, -1]} style={styles.helloWorldTextStyle} />
				<ViroAmbientLight color={"#aaaaaa"} />
				<ViroSpotLight innerAngle={5} outerAngle={90} direction={[0, -1, -.2]}
					position={[0, 3, 1]} color="#ffffff" castsShadow={true} />
				<ViroARPlane
					minHeight={.01}
					minwidth={.01}
					visible={true}
					opacity={1}
				>
					<AccountComponent position={[-1,0,0]} account={{name: 'Checkings Account', balance: 42177}}/>
					<AccountComponent position={[0,0,0]} account={{name: 'Savings Account', balance: 11928}}/>
					<AccountComponent position={[1,0,0]} account={{name: 'Secured Card', balance: 1}}/>
					<ViroBox
						position={[0, -5, 0]}
						height={10} width={100} length={100}
						physicsBody={{
							type: 'Kinematic', mass: 0
						}}
						opacity={0}
					/>
				</ViroARPlane>
			</ViroARScene>
		);
	}

	_onInitialized(state, reason) {
		if (state == ViroConstants.TRACKING_NORMAL) {
			this.setState({
				initialText: ""
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
