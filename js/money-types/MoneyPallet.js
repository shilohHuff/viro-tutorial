import React, { Component } from 'react';

import {
    ViroNode,
    ViroBox,
    ViroMaterials
} from 'react-viro';


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
                <ViroBox
                    position={[position[0], position[1], position[2]]}
                    ref={this.onReference}
                    height={.645} width={.8} length={1.2}
                    dragType="FixedToWorld"
                    onDrag={this.onDrag}
                    onCollision={this.onCollision}
                    physicsBody={physicsBody}
                    materials={["dollar"]}
                />
            </ViroNode>
        );
    }
}

ViroMaterials.createMaterials({
	dollar: {
		diffuseTexture: require('../res/dollar-stack/dollar-stack_dollar-only.png'),
    },
    grid: {
		diffuseTexture: require('../res/grid_bg.jpg'),
	}
});
