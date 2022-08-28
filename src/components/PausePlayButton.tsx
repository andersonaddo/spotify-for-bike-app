import React from 'react';
import {
    StyleSheet, TouchableHighlight, View
} from 'react-native';
import colors from '../utils/Colors';
import Icon from "react-native-vector-icons/Feather"
import SpotifyAPIContext from '../SpotifyAPIContext';

class PausePlayButton extends React.PureComponent {

    static contextType = SpotifyAPIContext;
    declare context: React.ContextType<typeof SpotifyAPIContext>

    render(): React.ReactNode {
        const isActive = this.context.isConnected == true
        const isPaused = this.context.playerState?.isPaused == true
        return (
            <TouchableHighlight
                style={[styles.pausePlayButton, isActive ? styles.active : styles.inactive]}
                onPress={this.pausePlay}>
                <Icon name={isPaused ? "play" : "pause"} size={70} color={"black"} />
            </TouchableHighlight>
        )
    }

    pausePlay = async() => {
        try{
            const isActive = this.context.isConnected == true
            const isPaused = this.context.playerState?.isPaused == true
            if (!isActive) return;
            if (isPaused) await this.context.remote.resume()
            else await this.context.remote.pause()
        }catch(err){
            this.context.onError(err as Error)
        }
    }


}

const styles = StyleSheet.create({

    pausePlayButton: {
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        flex: 3
    },

    active: {
        backgroundColor: colors.darkBlue,
    },

    inactive: {
        backgroundColor: colors.spotifyGrey,
    }
});

export default PausePlayButton;
