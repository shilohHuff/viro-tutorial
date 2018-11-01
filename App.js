/**
 * Copyright (c) 2017-present, Viro, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  StyleSheet,
  PixelRatio,
  TouchableHighlight,
} from 'react-native';

import {
  ViroARSceneNavigator
} from 'react-viro';

/*
 TODO: Insert your API key below
 */
var sharedProps = {
  apiKey:"688B6179-61A8-44A4-871B-E330CA12690E",
}

var MoneyStackScene = require('./js/MoneyStackScene');
var MakeItRainScene = require('./js/MakeItRainScene');

var UNSET = "UNSET";
var MAKE_IT_RAIN = "MAKE_IT_RAIN";
var MONEY_STACK = "MONEY_STACK";

// This determines which type of experience to launch in, or UNSET, if the user should
// be presented with a choice of AR or VR. By default, we offer the user a choice.
var defaultNavigatorType = UNSET;

export default class ViroSample extends Component {
  constructor() {
    super();

    this.state = {
      navigatorType : defaultNavigatorType,
      sharedProps : sharedProps
    }

    this._exitViro = this._exitViro.bind(this);
  }


// Replace this function with the contents of _getVRNavigator() or _getARNavigator()
  // if you are building a specific type of experience.
  render() {
    if (this.state.navigatorType == UNSET) {
      return this.getExperienceSelector();
    } else if (this.state.navigatorType == MAKE_IT_RAIN) {
      return this.getMakeItRainScene();
    } else if (this.state.navigatorType == MONEY_STACK) {
      return this.getMoneyStackScene();
    }
  }
  // Presents the user with a choice of an AR or VR experience
  getExperienceSelector() {
    return (
      <View style={localStyles.outer} >
        <View style={localStyles.inner} >
          <Text style={localStyles.titleText}>
            What would you like to do?
          </Text>
          <TouchableHighlight style={localStyles.buttons}
            onPress={this._getExperienceButtonOnPress(MONEY_STACK)}
            underlayColor={'#68a0ff'} >
            <Text style={localStyles.buttonText}>View My Money</Text>
          </TouchableHighlight>
          <TouchableHighlight style={localStyles.buttons}
            onPress={this._getExperienceButtonOnPress(MAKE_IT_RAIN)}
            underlayColor={'#68a0ff'} >
            <Text style={localStyles.buttonText}>Make It Rain!</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

  getMoneyStackScene() {
    return (
      <ViroARSceneNavigator {...this.state.sharedProps}
        initialScene={{scene: MoneyStackScene}} />
    );
  }

  getMakeItRainScene() {
    return (
      <ViroARSceneNavigator {...this.state.sharedProps}
        initialScene={{scene: MakeItRainScene}} />
    );
  }

  _getExperienceButtonOnPress(navigatorType) {
    return () => {
      this.setState({
        navigatorType : navigatorType
      })
    }
  }

  // This function "exits" Viro by setting the navigatorType to UNSET.
  _exitViro() { 
    this.setState({
      navigatorType : UNSET
    })
  }
}

var localStyles = StyleSheet.create({
  viroContainer :{
    flex : 1,
    backgroundColor: "black",
  },
  outer : {
    flex : 1,
    flexDirection: 'row',
    alignItems:'center',
    backgroundColor: "black",
  },
  inner: {
    flex : 1,
    flexDirection: 'column',
    alignItems:'center',
    backgroundColor: "black",
  },
  titleText: {
    paddingTop: 30,
    paddingBottom: 20,
    color:'#fff',
    textAlign:'center',
    fontSize : 25
  },
  buttonText: {
    color:'#fff',
    textAlign:'center',
    fontSize : 20
  },
  buttons : {
    height: 80,
    width: 150,
    paddingTop:20,
    paddingBottom:20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor:'#68a0cf',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
  exitButton : {
    height: 50,
    width: 100,
    paddingTop:10,
    paddingBottom:10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor:'#68a0cf',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  }
});

module.exports = ViroSample
