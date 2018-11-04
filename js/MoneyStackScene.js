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
		for(var i = 0; i < accounts.length; i++) {
			accountComponent.push(
				<AccountComponent key={i} position={[-i,0,0]} account={accounts[i]} />
			);
		}

		return accountComponent;
	}

	render() {
		return (
			<ViroARScene displayPointCloud={true} anchorDetectionTypes={"PlanesHorizontal"} onTrackingUpdated={this._onInitialized} >
				<ViroText 
					text={this.state.initialText} 
					scale={[.7, .7, .7]} 
					position={[0, 0, -1]} 
					style={styles.helloWorldTextStyle}
					extrusionDepth={2}
     				materials={["frontMaterial", "backMaterial", "sideMaterial"]}
				/>
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

// map pieces of the redux state to component props
const mapStateToProps = (state, props) => {
	let accounts = this.state.accounts;
	let selected = this.state.selected;

	let selectedAccounts = []
	selected.forEach(index => {
		selectedAccounts.push(accounts[index]);
	});

    return {
			accounts: selectedAccounts
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
