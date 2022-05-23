import React from 'react';
import {
    StyleSheet, TouchableHighlight, View
} from 'react-native';
import colors from '../utils/Colors';
import Icon from "react-native-vector-icons/Feather"
import SpotifyAPIContext from '../SpotifyAPIContext';

class SkipForwardButton extends React.PureComponent {

    static contextType = SpotifyAPIContext;
    declare context: React.ContextType<typeof SpotifyAPIContext>

    render(): React.ReactNode {
        const isActive = this.context.isConnected == true

        return (
            <TouchableHighlight
                style={[styles.skipForwardButton, isActive ? styles.active : styles.inactive]}
                onPress={this.skipForward}>
                <Icon name="skip-forward" size={70} color={"black"} />
            </TouchableHighlight>
        )
    }

    skipForward = async () => {
        try{
            const isActive = this.context.isConnected == true
            if (!isActive) return;
            await this.context.remote.skipToNext()
        }catch(err){
            this.context.onError(err as Error)
        }
    }
}

const styles = StyleSheet.create({

    skipForwardButton: {
        width: "100%",
        height: "33%",
        alignItems: "center",
        justifyContent: "center"
    },

    active: {
        backgroundColor: colors.spotifyGreen,
    },

    inactive: {
        backgroundColor: colors.spotifyGrey,
    }
});

export default SkipForwardButton;
