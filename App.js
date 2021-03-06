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
  Div,
  TouchableHighlight,
  Platform
} from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './js/redux/reducers';
import { addAccount, selectAccounts } from './js/redux/actions.js';

import MoneyStackScene from './js/MoneyStackScene';
import MakeItRainScene from './js/MakeItRainScene';

import {
  ViroARSceneNavigator
} from 'react-viro';

/*
 TODO: Insert your API key below
 */
var sharedProps = {
  apiKey:"688B6179-61A8-44A4-871B-E330CA12690E",
}

var UNSET = "UNSET";
var MAKE_IT_RAIN = "MAKE_IT_RAIN";
var MONEY_STACK = "MONEY_STACK";
var ACCOUNT_SELECT = "ACCOUNT_SELECT";

var CHECKING_ACCOUNT="CHECKING_ACCOUNT";
var SAVINGS_ACCOUNT="SAVINGS_ACCOUNT";
var SECURED_CARD="SECURED_CARD";
var ALL_ACCOUNTS="ALL_ACCOUNTS";

// This determines which type of experience to launch in, or UNSET, if the user should
// be presented with a choice of AR or VR. By default, we offer the user a choice.
var defaultNavigatorType = UNSET;

const store = createStore(reducers);

export default class ViroSample extends Component {
  constructor() {
    super();

    this.state = {
      navigatorType : defaultNavigatorType,
      sharedProps : sharedProps,
      isLoading: false
    }

    this._exitViro = this._exitViro.bind(this);
  }



// Replace this function with the contents of _getVRNavigator() or _getARNavigator()
  // if you are building a specific type of experience.
  render() {
    return (
      <Provider store={store}>
        {this.getProvidedExperience()}
      </Provider>
    );
  }

  getProvidedExperience(){
    if (this.state.navigatorType == MAKE_IT_RAIN) {
      return this.getMakeItRainScene();
    }
    if (this.state.navigatorType == UNSET) {
      return this.getExperienceSelector();
    }
    if (this.state.navigatorType == ACCOUNT_SELECT) {
      return this.getAccountSelector();
    }
    if (this.state.navigatorType == MONEY_STACK) {
      return this.getMoneyStackScene();
    }
  }

  // Presents the user with a choice of an AR or VR experience
  getExperienceSelector() {
    return (
      <View style={localStyles.outer} >
        <View style={localStyles.inner} >
          <Text style={localStyles.bannerText}>
            Visualize Your Money!
          </Text>
          <Text style={localStyles.titleText}>
            What would you like to do?
          </Text>
          <TouchableHighlight style={localStyles.buttons}
            onPress={this._getExperienceButtonOnPress(ACCOUNT_SELECT)}
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

  getAccountSelector() {
    return (
      <View style={localStyles.outer} >
        <View style={localStyles.inner} >
          <Text style={localStyles.titleText}>
            Which account(s) would you like to view?
          </Text>
          <TouchableHighlight style={localStyles.buttons}
            onPress={this._getAccountButtonOnPress(CHECKING_ACCOUNT)}
            underlayColor={'#68a0ff'} >
            <Text style={localStyles.buttonText}>Checking Account: $42,177</Text>
          </TouchableHighlight>
          <TouchableHighlight style={localStyles.buttons}
            onPress={this._getAccountButtonOnPress(SAVINGS_ACCOUNT)}
            underlayColor={'#68a0ff'} >
            <Text style={localStyles.buttonText}>Savings Account: $11,928</Text>
          </TouchableHighlight>
          <TouchableHighlight style={localStyles.buttons}
            onPress={this._getAccountButtonOnPress(SECURED_CARD)}
            underlayColor={'#68a0ff'} >
            <Text style={localStyles.buttonText}>Secured Card Account: $1</Text>
          </TouchableHighlight>
          <TouchableHighlight style={localStyles.buttons}
            onPress={this._getAccountButtonOnPress(ALL_ACCOUNTS)}
            underlayColor={'#68a0ff'} >
            <Text style={localStyles.buttonText}>View all!</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

  getMoneyStackScene() {
    return (
        <View  style={localStyles.outer} >
          <ViroARSceneNavigator style={localStyles.arView} apiKey="688B6179-61A8-44A4-871B-E330CA12690E" initialScene={{scene: MoneyStackScene}} />
          <View style={{position: 'absolute',  left: 0, right: 0, bottom: 0, alignItems: 'center'}}>
            <TouchableHighlight style={localStyles.exitButton}
              onPress={this._exitViro}>
              <Text style={localStyles.exitButtonText}>Back</Text>
            </TouchableHighlight>
          </View>
        </View>
    );
  }

  getMakeItRainScene() {
    return (
      <View  style={localStyles.outer} >
          <ViroARSceneNavigator style={localStyles.arView} apiKey="688B6179-61A8-44A4-871B-E330CA12690E" initialScene={{scene: MakeItRainScene}} />
          <View style={{position: 'absolute',  left: 0, right: 0, bottom: 0, alignItems: 'center'}}>
            <TouchableHighlight style={localStyles.exitButton}
              onPress={this._exitViro}>
              <Text style={localStyles.exitButtonText}>Back</Text>
            </TouchableHighlight>
          </View>
        </View>
    );
  }

  _getExperienceButtonOnPress(navigatorType) {
    return () => {
      this.setState({
        navigatorType : navigatorType
      })
    }
  }

  _getAccountButtonOnPress(selectionType) {
    return () => {
      switch(selectionType) {
        case CHECKING_ACCOUNT:
          store.dispatch(selectAccounts([0]));
          break;
        case SAVINGS_ACCOUNT:
          store.dispatch(selectAccounts([1]));
          break;
        case SECURED_CARD:
          store.dispatch(selectAccounts([2]));
          break;
        default:
          store.dispatch(selectAccounts([0,1,2]));
          break;
      }
      this.setState({
        navigatorType: MONEY_STACK
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

//#12395B
//

var localStyles = StyleSheet.create({
  viroContainer :{
    flex : 1
  },
  arView :{
    flex : 1
  },
  outer : {
    flex : 1,
  },
  inner: {
    flex : 1,
    flexDirection: 'column',
    alignItems:'center',
    backgroundColor: "#12395B",
  },
  bannerText: {
    paddingTop: 60,
    width:'100%',
    color:'#FFF',
    textAlign:'center',
    fontSize: 70,
    fontStyle: 'italic',
    fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif-thin'
  },
  titleText: {
    paddingTop: 30,
    paddingBottom: 20,
    width:'100%',
    color:'#FFF',
    fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif-thin',
    fontWeight: '300',
    textAlign:'center',
    fontSize : 25,
    backgroundColor: "#12395B",
  },
  buttonText: {
    color:'#000',
    textAlign:'center',
    fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif-thin',
    fontWeight: '300',
    fontSize : 20,
    lineHeight: 80
  },
  buttons : {
    height: 80,
    width:'100%',
    backgroundColor:'#fff',
    margin: 10
  },
  exitButtonText: {
    color:'#000',
    fontWeight: '800',
    textAlign:'center',
    fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif-thin',
    fontSize : 20
  },
  exitButton : {
    height: 50,
    width: 100,
    paddingTop:10,
    paddingBottom:10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor:'#FFFFFF',
    borderRadius: 10,
    borderWidth: 1,
    opacity: 0.5,
    color: '#FFF',
    borderColor: '#fff',
  }
});


module.exports = ViroSample
