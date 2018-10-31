'use strict';

import React, { Component } from 'react';

import {StyleSheet} from 'react-native';

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

const COUNT=1000;

export default class HelloWorldSceneAR extends Component {

  constructor() {
    super();

    // Set initial state here
    this.state = {
      text : "Initializing AR...",
      money : [COUNT],
      moneyRefs : [COUNT]
    };
    
    
    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
    this.makeItRain = this.makeItRain.bind(this);


    this.makeItRain(COUNT);
  }



  makeItRain(count) {
    let newMoney = [];
    console.log("start");
    for(let i = 0; i < count; i++){
      let item = <ViroBox
          key={i}
          ref={(component)=>{
            let oldMoney = this.state.moneyRefs;
            oldMoney[i] = component;
            this.setState({
              moneyRefs:oldMoney
            });
          }}
          position={[Math.random(),(i*.1)+1,Math.random()]}
          height={.01} width={.16} length={.07}
          dragType={"FixedToWorld"}
          onDrag={()=>{}}
          onCollision={(tag, oldPosition)=>{
              this.state.moneyRefs[i].setNativeProps({physicsBody:{
                type:'Static', mass:0
              }});
              
          }}
          physicsBody={{
            type:'Dynamic', mass:10, friction:1.0, restitution:0.0
          }}
          materials={["grid"]}
        />;
        

        newMoney.push(item);
    }
    this.state.money = newMoney;
  }

  render() {
    return (
      <ViroARScene displayPointCloud={true} anchorDetectionTypes={"PlanesHorizontal"} onTrackingUpdated={this._onInitialized} >
        <ViroText text={this.state.text} scale={[.5, .5, .5]} position={[0, 0, -1]} style={styles.helloWorldTextStyle} />
        <ViroAmbientLight color={"#aaaaaa"} />
        <ViroSpotLight innerAngle={5} outerAngle={90} direction={[0,-1,-.2]}
          position={[0, 3, 1]} color="#ffffff" castsShadow={true} />
        <ViroARPlane
          minHeight={.1}
          minwidth={.1}
          visible={true}
          opacity={1}
        >
          {this.state.money}
          <ViroBox
            position={[0,-5,0]}
            height={10} width={100} length={100}
            physicsBody={{
              type:'Kinematic', mass:0
            }}
            opacity={0}
            materials={["grid"]}
          />
        </ViroARPlane>
        <ViroNode position={[0,-1,0]} dragType="FixedToWorld" onDrag={()=>{}} >
          <Viro3DObject
                    source={require('./res/emoji_smile/emoji_smile.vrx')}
                    resources={[require('./res/emoji_smile/emoji_smile_diffuse.png'),
                        require('./res/emoji_smile/emoji_smile_normal.png'),
                        require('./res/emoji_smile/emoji_smile_specular.png')]}
                    position={[-.5, .5, -1]}
                    scale={[.2, .2, .2]}
                    type="VRX" />
        </ViroNode>
      </ViroARScene>
    );
  }

  _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      this.setState({
        text : "Hello Joshie poo!"
      });
    } else if (state == ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }
}

ViroMaterials.createMaterials({
  grid: {
    diffuseTexture: require('./res/grid_bg.jpg'),
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
