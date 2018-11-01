import React, { Component } from 'react';

import {
    Viro3DObject,
    ViroMaterials
} from 'react-viro';


const dollarsObj = require( './res/dollar-stack/dollar-stack.obj' );
const dollarsTxr = require( './res/dollar-stack/dollar_01.svg.png' );



ViroMaterials.createMaterials( {dollarsStackHundred: {diffuseTexture: dollarsTxr}} );



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
            <Viro3DObject
                type="OBJ"
                source={dollarsObj}
                materials={["dollarsStackHundred"]}
                ref={this.onReference}
                position={[...position]}
                scale={[1,1,1]}
                dragType="FixedToWorld"
                onDrag={this.onDrag}
                onCollision={this.onCollision}
                physicsBody={physicsBody}
            />
        );
    }
}
