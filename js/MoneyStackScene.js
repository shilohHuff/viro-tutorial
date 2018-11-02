'use strict';

import React, { Component } from 'react';

import { StyleSheet } from 'react-native';

import { connect } from 'react-redux';

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
			accounts: []
		};
		this.generateAccountComponents = this.generateAccountComponents.bind(this);
		this._onInitialized = this._onInitialized.bind(this);
	}

	generateAccountComponents(accounts) {
		let accountComponent = [];

		console.log('in generate account components', accounts);
		for(var i = 0; i < accounts.length; i++) {
			console.log('index', i, 'account', accounts[i]);
			accountComponent.push(
				<AccountComponent position={[-i,0,0]} account={accounts[i]} />
			);
		}

		console.log('after loop', accountComponent);

		return accountComponent;
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
					{this.generateAccountComponents(this.props.accounts)}

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


// map pieces of the redux state to component props
const mapStateToProps = (state, props) => {
    return {
			accounts: state.accounts.accounts
    };
};

// map redux dispatches to component props
const mapDispatchToProps = (dispatch, props) => {
    return {

    };
};

const ConnectedMoneyStackScene = connect(
    mapStateToProps,
    mapDispatchToProps
) (MoneyStackScene);

module.exports = ConnectedMoneyStackScene;
