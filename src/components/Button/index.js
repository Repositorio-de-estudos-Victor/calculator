import React from 'react';
import { Text, TouchableHighlight } from 'react-native';

import { styles } from './styles';

export function Button({
  double,
  triple,
  operation,
  onClick,
  label,
  ...rest
}) {
  const stylesButton = [styles.button]

  if (double) stylesButton.push(styles.buttonDouble);

  if (triple) stylesButton.push(styles.buttonTriple);

  if (operation) stylesButton.push(styles.operationButton);

  return (
    <TouchableHighlight onPress={() => onClick(label)} {...rest} >
      <Text style={stylesButton}>{label}</Text>
    </TouchableHighlight>
  )
}