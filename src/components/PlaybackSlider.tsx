import React from 'react';
import SpotifyAPIContext from '../SpotifyAPIContext';
import { Slider } from '@rneui/themed';
import colors from '../utils/Colors';
import { StyleSheet, Text, View } from 'react-native';

class PlaybackSlider extends React.PureComponent {


    static contextType = SpotifyAPIContext;
    declare context: React.ContextType<typeof SpotifyAPIContext>


    render(): React.ReactNode {
        const isActive = this.context.isConnected == true
        const playerState = this.context.playerState
        const track = this.context.playerState?.track

        return (
            <View style={styles.containerStyle}>
                <Text style={styles.sliderDurationText}>
                    {this.formatDurationToString(playerState ? playerState.playbackPosition : 0)}
                </Text>

                <Slider
                    minimumValue={0}
                    maximumValue={track ? track.duration : 0}
                    value={playerState ? playerState.playbackPosition : 0}
                    onSlidingComplete={(val: number) => {
                        if (isActive) {
                            this.context.remote.seek(Math.round(val))
                                .catch(err => this.context.onError(err as Error));
                        }
                    }}
                    allowTouchTrack={false}
                    thumbStyle={styles.sliderThumb}
                    orientation="horizontal"
                    minimumTrackTintColor={colors.spotifySand}
                    maximumTrackTintColor={colors.sliderMediumGrey}
                    style={styles.sliderContainer}

                />

                <Text style={styles.sliderDurationText}>
                    {this.formatDurationToString(track ? track.duration : 0)}
                </Text>
            </View>

        )
    }

    formatDurationToString = (duration: number) => {
        const durationInS = Math.floor(duration / 1000);
        const fullMinutes = Math.floor(durationInS / 60)
        const remainingSeconds = durationInS % 60;
        return `${fullMinutes}:${remainingSeconds.toString().padStart(2, "0")}`
    }

}


const styles = StyleSheet.create({
    containerStyle: {
        marginHorizontal: 8,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    sliderThumb: {
        width: 50,
        height: 50,
        borderRadius: 10,
        backgroundColor: colors.spotifyGreen
    },
    sliderContainer: {
        width: "80%",
        height: 80,
        justifyContent: "center",
        alignSelf: "center",
    },
    sliderDurationText: {
        color: colors.spotifySand,
        marginHorizontal: 8
    }
})

export default PlaybackSlider;
