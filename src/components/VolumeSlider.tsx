import { Slider } from '@rneui/themed';
import React from 'react';
import { AppState, EmitterSubscription, LayoutChangeEvent, NativeEventSubscription, Pressable, StyleSheet, Text, View } from 'react-native';
import colors from '../utils/Colors';
import SystemSetting from 'react-native-system-setting'


class VolumeSlider extends React.PureComponent<{}, { width: number, height: number, volume: number }> {

    state = { width: 1, height: 1, volume: 0 }
    volumeListener: any
    appStateSubscription: NativeEventSubscription | undefined;


    componentDidMount(): void {
        SystemSetting.getVolume("music").then((volume) => {
            this.setState({ volume })
        });

        this.volumeListener = SystemSetting.addVolumeListener((data) => {
            const volume = data.value;
            this.setState({ volume })
        });

        this.appStateSubscription = AppState.addEventListener("change",
            nextAppState => {
                if (nextAppState === "active") {
                    SystemSetting.getVolume("music").then((volume) => {
                        this.setState({ volume })
                    });
                }
            }
        );
    }

    componentWillUnmount(): void {
        SystemSetting.removeVolumeListener(this.volumeListener)
        this.appStateSubscription?.remove();
    }

    onPageLayout = (event: LayoutChangeEvent) => {
        const { width, height } = event.nativeEvent.layout;
        this.setState({ width, height })
    }

    render(): React.ReactNode {
        return (
            <View
                style={styles.containerStyle}
                onLayout={this.onPageLayout}
            >

                <Text style={styles.sliderDurationText}>
                    +
                </Text>

                <Slider
                    value={1 - this.state.volume}
                    onValueChange={(volume) => {
                        volume = 1 - volume;
                        SystemSetting.setVolume(volume, { type: "music" });
                        this.setState({ volume: volume })
                    }}
                    maximumValue={1}
                    minimumValue={0}
                    style={{ height: "80%", width: "100%" }}
                    step={0.05}
                    allowTouchTrack={false}
                    thumbStyle={styles.sliderThumb}
                    orientation="vertical"
                    minimumTrackTintColor={colors.sliderMediumGrey}
                    maximumTrackTintColor={colors.spotifySand}
                />

                <Text style={styles.sliderDurationText}>
                    -
                </Text>
            </View>

        )
    }
}


const styles = StyleSheet.create({
    containerStyle: {
        width: 50,
        justifyContent: "space-between",
        alignItems: 'center',
        flexDirection: "column"
    },
    sliderThumb: {
        width: 45,
        height: 45,
        borderRadius: 10,
        backgroundColor: colors.spotifyGrey,
    },
    sliderContainer: {
        marginVertical: 0,
    },
    sliderDurationText: {
        color: colors.spotifySand,
        marginHorizontal: 8,
        fontSize: 30
    }
})

export default VolumeSlider;
