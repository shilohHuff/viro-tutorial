import React, { Component } from 'react';

import {
    ViroNode,
    Viro3DObject,
    ViroMaterials
} from 'react-viro';



const palletObj = require('../res/pallet/pallet.obj');
const palletTexture = require('../res/pallet/pallet.png');
const stackTexture = require('../res/pallet/dollar-stack_dollar-only.png');

ViroMaterials.createMaterials(
	{
		palletMaterial: { diffuseTexture: palletTexture }
		stackMaterial: { stackTexture: palletTexture }
	}
);


export default class MoneyPallet extends Component {
    constructor(){
        super();
        this.onDrag = this.onDrag.bind(this);
        this.onCollision = this.onCollision.bind(this);
        this.onReference = this.onReference.bind(this);
    }

    onDrag(){

        this.physicsReference.setNativeProps({
            physicsBody: {
                type: 'Dynamic', mass: 1
            }
        })
        if (this.props.onDrag) {
            this.props.onDrag();
        }
    }

    onCollision(){
        if (this.props.onCollision) {
            this.props.onCollision();
        }
    }

    onReference(component){
        this.physicsReference = component;
        if (this.props.onReference) {
            this.props.onReference();
        }
    }

    render(){
        let position = this.props.position;
        if(!position){
           position = [0,0,0];
        }

        let physicsBody = this.props.physicsBody;
        if(!physicsBody){
            physicsBody={
                type: 'Static', mass: 0
            }
        }
        return (
            <ViroNode>
              <Viro3DObject
                type = "OBJ"
                source = { palletObj }
                materials = { ["palletMaterial","stackMaterial"] }
                ref = { this.onReference }
                position = { [...position] }
                scale = { [1, 1, 1] }
                dragType = "FixedToWorld"
                onDrag = { this.onDrag }
                onCollision = { this.onCollision }
                physicsBody = { physicsBody }
              />
            </ViroNode>
        );
    }
}
