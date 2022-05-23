import React from 'react';
import { StyleSheet, View } from 'react-native';
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


class MainScreen extends React.PureComponent<MainScreenNavProps> {

  render(): React.ReactNode {

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Icon
            name="spotify"
            color={colors.spotifyGreen}
            size={30} />
          <FeatherIcon
            name="settings"
            color={colors.spotifySand}
            size={30}
            onPress={() => this.props.navigation.navigate("Settings")} />
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
    paddingHorizontal: 8,
    height: 40,
    borderBottomColor: colors.spotifyGrey,
    borderBottomWidth: 1,
    justifyContent: 'space-between',
  },

  secondaryButtonPanel: {
    flexDirection: "row",
    width: "100%",
    height: "15%"
  }
});

export default MainScreen;
