import React, { Component } from 'react';

import {
    Viro3DObject
} from 'react-viro';

export default HundredDollarStack = (props)=>{
    let position = props.position;

    return ( 
        <Viro3DObject
            source={require('./res/dollar-stack/dollar-stack.obj')}
            resources={[
                require('./res/dollar-stack/dollar_01.svg.png'),
                require('./res/dollar-stack/dollar-stack.mtl')
            ]}
            position={[...position]}
            physicsBody={{
                type: 'Static', mass: 0
            }}
            type="OBJ" 
        />
    );
}