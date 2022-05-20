import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import colors from './Colors';
import { SettingsNavProps } from './types/navigationTypes';

class Settings extends React.PureComponent<SettingsNavProps> {

  render(): React.ReactNode {
    return (
      <View style={styles.container}>

        <Text>Hi</Text>

        <Button
          title="Back"
          onPress={() => this.props.navigation.navigate("MainScreen")}
        />

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
