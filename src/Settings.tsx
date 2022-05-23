import React from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, TouchableOpacityBase, View } from 'react-native';
import colors from './utils/Colors';
import { SettingsNavProps } from './types/navigationTypes';
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import * as settings from "./utils/AsyncStorageValues"
import { SpotifyAPIContext } from './SpotifyAPIContext';
import IdleTimerManager from 'react-native-idle-timer';


export default class Settings extends React.PureComponent<SettingsNavProps> {

  render(): React.ReactNode {

    return (
      <View style={styles.container}>

        <SettingsTextInput
          title="Client ID"
          setting={settings.connectionSettings.SPOTIFY_CLIENT_ID}
        />

        <SettingsTextInput
          title="Redirect URL"
          setting={settings.connectionSettings.SPOTIFY_REDIRECT_URL}
        />

        <SettingsTextInput
          title="Token Refresh URL"
          setting={settings.connectionSettings.SPOTIFY_TOKEN_REFRESH_URL}
        />

        <SettingsTextInput
          title="Token Swap URL"
          setting={settings.connectionSettings.SPOTIFY_TOKEN_SWAP_URL}
        />

        <AuthButton />

        <View style={styles.sleepButtonContainer}>

          <TouchableOpacity
            onPress={() => IdleTimerManager.setIdleTimerDisabled(false)}
            style={styles.sleepButton}
          >
            <Text style={styles.sleepButtonText}>Disable Screen Sleep</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => IdleTimerManager.setIdleTimerDisabled(true)}
            style={styles.sleepButton}
          >
            <Text style={styles.sleepButtonText}>Enable Screen Sleep</Text>
          </TouchableOpacity>

        </View>

        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("MainScreen")}
          style={styles.backButton}
        >
          <Text style={styles.buttonTitleStyle}>Back</Text>
        </TouchableOpacity>

      </View>
    )
  }
}

interface SettingsTextInputProps {
  title: string,
  setting: settings.connectionSettings,
}

interface SettingsTextInputState {
  value: string
}
class SettingsTextInput extends React.PureComponent<SettingsTextInputProps, SettingsTextInputState> {

  state: SettingsTextInputState = {
    value: ""
  }

  componentDidMount() {
    this.setInitialValue()
  }

  render(): React.ReactNode {
    return (
      <>
        <Text style={styles.inputLabel}>{this.props.title}</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TextInput
            autoCorrect={false}
            style={styles.input}
            onChangeText={this.setSetting}
            value={this.state.value}
          />
          <Icon
            color={colors.spotifySand}
            name="restart" size={30}
            onPress={this.resetSettingToDefault}
          />
        </View>

      </>
    )
  }

  setInitialValue = async () => {
    try {
      const val = await settings.getSetting(this.props.setting)
      this.setState({ value: val })
    } catch (err) {
      Alert.alert("Error!", err as string)
    }
  }


  resetSettingToDefault = async () => {
    try {
      await settings.resetSetting(this.props.setting)
      const val = await settings.getSetting(this.props.setting)
      this.setState({ value: val })
    } catch (err) {
      Alert.alert("Error!", err as string)
    }
  }


  setSetting = async (newVal: string) => {
    try {
      this.setState({ value: newVal })
      await settings.setSetting(this.props.setting, newVal)
      const val = await settings.getSetting(this.props.setting)
    } catch (err) {
      Alert.alert("Error!", err as string)
    }
  }

}


class AuthButton extends React.PureComponent {

  static contextType = SpotifyAPIContext;
  declare context: React.ContextType<typeof SpotifyAPIContext>

  render(): React.ReactNode {
    const isConnected = this.context.isConnected == true

    return (
      <TouchableOpacity
        style={isConnected ? styles.disconnectButton : styles.connectButton}
        onPress={this.toggleAuth}
      >
        <Text style={styles.buttonTitleStyle}>{isConnected ? "Disconnect" : "Connect"}</Text>
      </TouchableOpacity>
    )
  }

  toggleAuth = () => {
    const isConnected = this.context.isConnected == true
    if (!isConnected) {
      this.context.startAuthSession()
    } else {
      this.context.endAuthSession()
    }
  }
}


const styles = StyleSheet.create({
  //For Settings class
  container: {
    flexDirection: "column",
    backgroundColor: colors.darkGrey,
    flex: 1,
    alignItems: "center"
  },

  backButton: {
    backgroundColor: colors.spotifyGreen,
    width: 250,
    borderRadius: 50
  },

  buttonTitleStyle: {
    color: "black",
    fontSize: 24,
    textAlign: "center"
  },

  sleepButton: {
    backgroundColor: colors.blue,
    width: 120,
    height: 50,
    borderRadius: 50,
    justifyContent: "center",
    alignContent: "center"
  },

  sleepButtonText: {
    color: colors.spotifySand,
    fontSize: 19,
    textAlign: "center"
  },

  sleepButtonContainer: {
    flexDirection: "row",
    marginVertical: 16,
    marginHorizontal: 18,
    justifyContent: "space-evenly",
    width: "80%"
  },

  //For SettingsTextInput class
  inputLabel: {
    color: colors.spotifySand,
    fontSize: 16,
    width: "80%",
    marginTop: 8
  },

  input: {
    borderColor: colors.spotifySand,
    borderWidth: 1,
    borderRadius: 5,
    width: "80%",
    fontSize: 16,
    marginBottom: 8,
    color: colors.spotifySand,
  },

  //For AuthButton class
  connectButton: {
    backgroundColor: colors.spotifyGreen,
    width: 250,
    height: 50,
    borderRadius: 50,
    marginBottom: 16,
    justifyContent: "center",
    alignContent: "center"
  },

  disconnectButton: {
    backgroundColor: colors.errorRed,
    width: 250,
    height: 50,
    borderRadius: 50,
    marginBottom: 16,
    justifyContent: "center",
    alignContent: "center"
  },
});