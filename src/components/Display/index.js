import React from 'react';
import { Text, View } from 'react-native';

import { styles } from './styles';

export function Display({ value }) {
  return (
    <View style={styles.display}>
      <Text
        style={styles.displayValue}
        numberOfLines={1}>{value}</Text>
    </View>
  )
}