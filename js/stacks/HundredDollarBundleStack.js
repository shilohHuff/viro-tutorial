import React, { Component } from 'react';

import {
    ViroNode,
    ViroBox,
    ViroMaterials
} from 'react-viro';
import HundredDollarBundle from '../money-types/HundredDollarBundle';

export default class HundredDollarBundleStack extends Component {
    constructor() {
      super();
      this.generateMoneyStack = this.generateMoneyStack.bind(this);
    }

    generateMoneyStack(count){
        let moneyStack = [];

        let xDiminsionCount = Math.cbrt(count)/3
        let yDiminsionCount = Math.cbrt(count)*3*2
        let zDiminsionCount = Math.cbrt(count)/2

    		let stacksGenerated = 0;
    		let x = 0,y = 0,z = 0;
    		while(y < yDiminsionCount &&  !(stacksGenerated === count)){
    			while(x < xDiminsionCount &&  !(stacksGenerated === count)){
    				while(z < zDiminsionCount &&  !(stacksGenerated === count)){
    					let item = (
    						<HundredDollarBundle key={'HundredDollarBundle' + stacksGenerated} position={[(x*.17), (y*.011), (z*.07)]} physicsBody={{type: 'Static',mass: 0}} />
    					);
    					stacksGenerated++;
    					moneyStack.push(item);
    					z++;
    				}
    				x++;
    				z = 0;
    			}
    			y++;
    			x = 0;
    		}
        return moneyStack;
    }

    render() {
      let count = this.props.count;
      let position = this.props.position;
      if (!position) {
          position = [0, 0, 0];
      }
      return (
        <ViroNode position={[...position]}>
          {this.generateMoneyStack(count)}
        </ViroNode>
      );
    }
}
