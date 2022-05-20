import React from 'react';
import { StyleSheet, View } from 'react-native';
import colors from './Colors';
import SkipBackwardsButton from './Components/BackwardsSkipButton';
import SkipForwardButton from './Components/ForwardSkipButton';
import PausePlayButton from './Components/PausePlayButton';
import TrackInfo from './Components/TrackInfo';

class MainScreen extends React.PureComponent {

  render(): React.ReactNode {
    return (
      <View style={styles.container}>
        <View style={styles.header}></View>

        <TrackInfo />

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
    height: 30,
    borderBottomColor: colors.spotifyGrey,
    borderBottomWidth: 1
  },

  secondaryButtonPanel: {
    flexDirection: "row",
    width: "100%",
    height: "15%"
  }
});

export default MainScreen;
