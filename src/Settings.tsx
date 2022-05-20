import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import colors from './Colors';

class Settings extends React.PureComponent {

  render(): React.ReactNode {
    return (
      <View style={styles.container}>
        
        <Text>Hi</Text>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: colors.darkGrey,
    flex: 1
  },
});

export default Settings;
