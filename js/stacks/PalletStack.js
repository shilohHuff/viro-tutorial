import React, { Component } from 'react';

import {
    ViroNode,
    ViroBox,
    ViroMaterials
} from 'react-viro';
import Pallet from '../money-types/MoneyPallet';

export default class PalletStack extends Component {
    constructor() {
      super();
      this.generateMoneyStack = this.generateMoneyStack.bind(this);
    }

    generateMoneyStack(count){
        let moneyStack = [];

        let xDiminsionCount = Math.cbrt(count)
        let yDiminsionCount = Math.cbrt(count)
        let zDiminsionCount = Math.cbrt(count)

    		let stacksGenerated = 0;
    		let x = 0,y = 0,z = 0;
    		while(y < yDiminsionCount &&  !(stacksGenerated === count)){
    			while(z < xDiminsionCount &&  !(stacksGenerated === count)){
    				while(x < zDiminsionCount &&  !(stacksGenerated === count)){
    					let item = (
    						<Pallet key={'Pallet' + stacksGenerated} position={[(x*1.2), (y*.645), -(z*1.2)]} physicsBody={{type: 'Static',mass: 0}} />
    					);
    					stacksGenerated++;
    					moneyStack.push(item);
    					x++;
    				}
    				z++;
    				x = 0;
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
