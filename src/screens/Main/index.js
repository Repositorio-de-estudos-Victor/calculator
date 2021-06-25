import React, { useState } from 'react'
import { View, StatusBar } from 'react-native'
import { Button } from '../../components/Button'
import { Display } from '../../components/Display'

import { styles } from './styles'

export function Main() {
  const [displayValue, setDisplayValue] = useState('0');
  const [clearDisplay, setClearDisplay] = useState(false);
  const [operation, setOperation] = useState(null);
  const [values, setValues] = useState([0, 0]);
  const [current, setCurrent] = useState(0);

  function addDigit(n) {
    const clearDisplayChanged = displayValue === '0'
      || clearDisplay

    if(n === '.' && !clearDisplayChanged && displayValue.includes('.')){
      return
    }

    const currentValue = clearDisplayChanged ? '' : displayValue
    const displayValueChanged = currentValue + n

    setDisplayValue(displayValueChanged)
    setClearDisplay(false);

    if(n !== '.'){
      const newValue = parseFloat(displayValueChanged)
      const valuesChanged = [...values]
      valuesChanged[current] = newValue
      setValues(valuesChanged)
    }
  }

  function clearMemory() {
    setDisplayValue('0')
    setClearDisplay(false)
    setOperation(null)
    setValues([0, 0]);
    setCurrent(0);
  }

  function handleOperation(operationComing) {
    if(current === 0){
      setOperation(operationComing);
      setCurrent(1);
      setClearDisplay(true);
    } else {
      const equals = operationComing === '='
      const valuesChanged = [...values]

      try{
        valuesChanged[0] = eval(`${valuesChanged[0]} ${operation} ${valuesChanged[1]}`)
      } catch(e) {
        valuesChanged[0] = values[0]
      }

      valuesChanged[1] = 0

      setDisplayValue(`${valuesChanged[0]}`);
      setOperation(equals ? null : operationComing);
      setCurrent(equals ? 0 : 1);
      setClearDisplay(!equals);
      setValues(valuesChanged);
    }
  }

    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />
        <Display value={displayValue} />
        <View style={styles.buttons}>
          <Button label='AC' triple onClick={clearMemory} />
          <Button label='/' operation onClick={handleOperation} />
          <Button label='7' onClick={addDigit} />
          <Button label='8' onClick={addDigit} />
          <Button label='9' onClick={addDigit} />
          <Button label='*' operation onClick={handleOperation}/>
          <Button label='4' onClick={addDigit} />
          <Button label='5' onClick={addDigit} />
          <Button label='6' onClick={addDigit} />
          <Button label='-' operation onClick={handleOperation}/>
          <Button label='1' onClick={addDigit} />
          <Button label='2' onClick={addDigit} />
          <Button label='3' onClick={addDigit} />
          <Button label='+' operation onClick={handleOperation}/>
          <Button label='0' double onClick={addDigit} />
          <Button label='.' onClick={addDigit} />
          <Button label='=' operation onClick={handleOperation}/>
        </View>
      </View>
    );
}
