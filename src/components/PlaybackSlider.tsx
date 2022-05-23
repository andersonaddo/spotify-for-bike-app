import React from 'react';
import SpotifyAPIContext from '../SpotifyAPIContext';
import { Slider } from '@miblanchard/react-native-slider';
import colors from '../utils/Colors';

class PlaybackSlider extends React.PureComponent {


    static contextType = SpotifyAPIContext;
    declare context: React.ContextType<typeof SpotifyAPIContext>


    render(): React.ReactNode {
        const isActive = this.context.isConnected == true
        const playerState = this.context.playerState

        return (
            <Slider
                minimumValue={0}
                maximumValue={playerState?.track ? playerState.track.duration : 0}
                value={playerState ? playerState.playbackPosition : 0}
                onSlidingComplete={(val: number | number[]) => {
                    if (isActive && typeof val != "number") {
                        this.context.remote.seek(Math.round(val[0]))
                            .catch(err => this.context.onError(err as Error));
                    }
                }}
                containerStyle={{ width: "80%", height: 80, justifyContent: "center", alignSelf: "center", }}
                thumbStyle={{ width: 50, height: 50, backgroundColor: colors.spotifyGreen }}
                trackStyle={{ backgroundColor: colors.spotifySand }}
            />
        )
    }

}

export default PlaybackSlider;
