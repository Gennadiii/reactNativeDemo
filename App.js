import React, {Component} from 'react';
import {Button, Picker, Text, TextInput, View} from 'react-native';
import * as Platform from "react-native-deprecated-custom-components";

const operations = {
  summ: '+',
  substruct: '-',
  multiply: '*',
  devide: '/'
};

export default class Calculator extends Component {

  constructor() {
    super();
    this.state = {printText: false};
    this.state = {progressStarted: false};
    this.state = {randomNumber: 1000};
    this.state = Platform.OS === 'ios' ? {margin: 200} : {margin: 0};
  }

  showText = () => {
    this.setState({printText: true});
  };

  resetResult = () => {
    this.setState({printText: false});
    this.setState({progressStarted: false});
  };

  startProgress = () => {
    this.setState({progressStarted: true});
  };

  setRandomNumber = () => {
    this.setState({randomNumber: getRandomNumber(4 * 1000)});
  };


  render() {

    return (
      <View style={{padding: 20}}>

        <TextInput
          style={{height: 80, fontSize: 50}}
          placeholder="First number"
          onChangeText={(firstNumber) => {
            this.setState({firstNumber});
            this.resetResult();
          }}
          name='firstNumber'
        />

        <Picker
          selectedValue={this.state.operation}
          style={{height: 70, width: 200}}
          onValueChange={(itemValue) => {
            this.setState({operation: itemValue});
            this.resetResult();
          }}
          name='operationsPicker'
        >
          <Picker.Item label="+" value="+"/>
          <Picker.Item label="-" value="-"/>
          <Picker.Item label="*" value="*"/>
          <Picker.Item label="/" value="/"/>
        </Picker>

        <TextInput
          style={{height: 80, fontSize: 50, marginTop: this.state.margin}}
          itemPositioning={'center'}
          placeholder="Second number"
          onChangeText={(secondNumber) => {
            this.setState({secondNumber});
            this.resetResult();
          }}
          name='secondNumber'
        />

        <View style={{padding: 20}}>
          <Button
            onPress={() => {
              this.setRandomNumber();
              setTimeout(this.showText, this.state.randomNumber);
              this.startProgress();
            }}
            title="Count"
            color="#FFA500"
            disabled={!(this.state.firstNumber && this.state.secondNumber)}
            accessibilityLabel='countButton'
            name='countButton'
          />
          {
            Platform.OS === 'ios' && this.state.progressStarted && alert('You should be using Android')
          }
          {
            this.state.progressStarted &&
            <Text
              style={{padding: 0, fontSize: 50, textAlign: 'center'}}>
              {this.state.printText ? '' : 'Counting...'}
            </Text>}
          {
            this.state.printText &&
            <Text
              style={{padding: 0, fontSize: 50, textAlign: 'center'}}
              name='result'>
              {calculate(this.state.operation, this.state.firstNumber, this.state.secondNumber)}
            </Text>
          }
        </View>


      </View>
    );
  }
}


function calculate(operation, firstNumber, secondNumber) {
  firstNumber = +firstNumber;
  secondNumber = +secondNumber;
  switch (operation) {
    case operations.substruct:
      return firstNumber - secondNumber;
    case operations.multiply:
      return firstNumber * secondNumber;
    case operations.devide:
      return firstNumber / secondNumber;
    default:
      return firstNumber + secondNumber;
  }
}

function getRandomNumber(max) {
  return Math.floor(Math.random() * max);
}
