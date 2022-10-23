import React from 'react';
import { Linking, StyleSheet, View } from 'react-native';
import colors from './utils/Colors';
import SkipBackwardsButton from './components/BackwardsSkipButton';
import SkipForwardButton from './components/ForwardSkipButton';
import PausePlayButton from './components/PausePlayButton';
import TrackInfo from './components/TrackInfo';
import Icon from 'react-native-vector-icons/FontAwesome5'
import FeatherIcon from 'react-native-vector-icons/Feather'
import { MainScreenNavProps } from './types/navigationTypes';
import ConnectionBanner from './components/ConnectionBanner';
import PlaybackSlider from './components/PlaybackSlider';
import Snackbar from 'react-native-snackbar';
import BatteryIcon from './components/BatteryStatusDisplayer';
import TimeDisplay from './components/TimeDisplayer';
import ScreenLockButton from './components/ScreenLockButton';
import VolumeSlider from './components/VolumeSlider';

//I'm making the pip window parent from here instead of the App.tsx so that React 
//doesn't have to create the entre render stack (navigation stack, context, etc) when pip
//mode changes
class MainScreen extends React.PureComponent<MainScreenNavProps> {

  openSpotify = async () => {
    const url = "spotify://"
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      Snackbar.show({
        text: "You don't have Spotify installed on this phone!",
        duration: Snackbar.LENGTH_SHORT,
      });
    }
  }

  render(): React.ReactNode {

    return (
      <View style={styles.container}>

        <View style={{ flex: 1, flexDirection: "row" }}>
          <View style={{ flex: 1, flexDirection: "column" }}>
            <View style={styles.header}>
              <View style={{...styles.headerElementWrapperBesideTime, justifyContent:"flex-start",}}>
                <Icon
                  name="spotify"
                  color={colors.spotifyGreen}
                  size={40}
                  style={styles.headerIcon}
                  onPress={this.openSpotify} />
                <BatteryIcon />
              </View>

              <TimeDisplay />

              <View style={{...styles.headerElementWrapperBesideTime, justifyContent:"flex-end"}}>
                <ScreenLockButton />
                <FeatherIcon
                  name="settings"
                  color={colors.spotifySand}
                  size={30}
                  onPress={() => this.props.navigation.navigate("Settings")}
                  style={styles.headerIcon} />
              </View>
            </View>
            <TrackInfo />
          </View>
          <VolumeSlider />
        </View>

        <PlaybackSlider />

        <View style={styles.secondaryButtonPanel}>
          <SkipBackwardsButton />
          <PausePlayButton />
        </View>

        <SkipForwardButton />

        <ConnectionBanner />

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
  headerElementWrapperBesideTime: {
    marginHorizontal: 8,
    flex: 1,
    height: "100%",
    flexDirection: "row",
    alignItems: "center"
  },
  header: {
    flexDirection: "row",
    height: 55,
    borderBottomColor: colors.spotifyGrey,
    borderBottomWidth: 1,
    justifyContent: "space-evenly",
    alignItems: 'center',
  },

  headerIcon: {
    marginHorizontal: 8,
  },

  secondaryButtonPanel: {
    flexDirection: "row",
    width: "100%",
    height: "15%"
  }
});

export default MainScreen;
