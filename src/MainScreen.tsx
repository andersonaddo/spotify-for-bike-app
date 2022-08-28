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
        <View style={styles.header}>
          <Icon
            name="spotify"
            color={colors.spotifyGreen}
            size={30}
            style={styles.headerIcon}
            onPress={this.openSpotify} />
          <BatteryIcon />
          <TimeDisplay />
          <FeatherIcon
            name="settings"
            color={colors.spotifySand}
            size={30}
            onPress={() => this.props.navigation.navigate("Settings")}
            style={styles.headerIcon} />
        </View>

        <ConnectionBanner />

        <TrackInfo />

        <PlaybackSlider />

        <View style={styles.secondaryButtonPanel}>
          <SkipBackwardsButton />
          <PausePlayButton />
        </View>

        <SkipForwardButton />

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
  header: {
    flexDirection: "row",
    height: 45,
    borderBottomColor: colors.spotifyGrey,
    borderBottomWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  headerIcon: {
    marginHorizontal: 8,
    marginTop: 8
  },

  secondaryButtonPanel: {
    flexDirection: "row",
    width: "100%",
    height: "15%"
  }
});

export default MainScreen;
