import React, { Component } from 'react';

import {
    ViroBox,
    ViroMaterials
} from 'react-viro';


export default class Dollar extends Component {
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
            <ViroBox
                position={[...position]}
                ref={this.onReference}
                height={.002} width={.16} length={.07}
                dragType="FixedToWorld"
                onDrag={this.onDrag}
                onCollision={this.onCollision}
                physicsBody={physicsBody}
                materials={["dollar"]}
            />
        );
    }
}

ViroMaterials.createMaterials({
	dollar: {
		diffuseTexture: require('./res/dollar-stack/dollar-stack_dollar-only.png'),
	},
});