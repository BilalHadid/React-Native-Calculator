import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import InputButton from './inputbuttons'


const Button = [
  ['Clear', 'DEL'],
  ['7', '8', '9', '/'],
  ['4', '5', '6', 'x'],
  ['1', '2', '3', '-'],
  ['0', '.', '=', '+'],
]
class App extends Component {
  constructor() {
    super()
    this.initialState = {
      displayValue: '0',
      operator: null,
      firstValue: '',
      secondValue: '',
      nextValue: false,
    }
    this.state = this.initialState
  }
  renderButton() {
    let Layouts = Button.map((ButtonRows, index) => {
      let rowItem = ButtonRows.map((buttonItem, buttonIndex) => {
        return <InputButton
          value={buttonItem}
          handleOnPress={this.handleInput.bind(this, buttonItem)}
          key={'btn-' + buttonIndex} />
      })
      return <View style={styles.inputrow} key={'row-' + index}>{rowItem}</View>

    });
    return Layouts
  }
  handleInput = (input) => {
    const { displayValue, operator, firstValue, secondValue,nextValue } = this.state;

    switch (input) {
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        this.setState({
          displayValue: (displayValue === '0') ? input : displayValue + input
        })
        if (!nextValue) {
          this.setState({
            firstValue: firstValue + input
          })

        }
        else {
          this.setState({
            secondValue: secondValue + input
          })
        }
        break;
      case '+':
      case '-':
      case 'x':
      case '/':
        this.setState({
          nextValue: true,
          operator: input,
          displayValue: (operator !== null ? displayValue.substr(0, displayValue.length - 1) : displayValue) + input
        })
        break;
      case '.':
        let dot = displayValue.toString().slice(-1)
        this.setState({
          displayValue: dot !== '.' ? displayValue + input : displayValue
        })
        if (!nextValue) {
          this.setState({
            firstValue: firstValue + input
          })

        }
        else {
          this.setState({
            secondValue: secondValue + input
          })
        }
        break;

      case '=':
        let formatOperator = (operator == 'x') ?'*' :(operator == '/') ? '/' : operator
        let result = eval(firstValue + formatOperator + secondValue)
        this.setState({
          displayValue: result % 1 == 0? result: result.toFixed(2),
          firstValue: result % 1 == 0? result: result.toFixed(2),
          secondValue: '',
          operator: null,
          nextValue: false
        })
        break;
      case 'Clear':
        this.setState(this.initialState)
        break;
      case 'DEL':
        let string = displayValue.toString()
        let deleteString = string.substr(0, string.length - 1)
        let lenght = string.length;
        this.setState({
          displayValue: lenght == 1 ? '0' : deleteString
        })
        break;
    }



  }



  render() {
    return (
      <View style={styles.container}>
        <View style={styles.resultContainer}>
          <Text style={styles.textresult}>{this.state.displayValue}</Text>

        </View>
        <View style={styles.inputContainer}>
          {this.renderButton()}
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1

  },
  resultContainer: {
    flex: 2,
    backgroundColor: '#1E1240',
    justifyContent: 'center'
  },
  inputContainer: {
    flex: 3,
    backgroundColor: '#3D0075'
  },
  textresult: {
    color: 'white',
    fontSize: 80,
    fontWeight: 'bold',
    padding: 20,
    textAlign: "right",
  },
  inputrow: {
    flex: 1,
    flexDirection: 'row',
    color: 'black'

  }



})
export default App