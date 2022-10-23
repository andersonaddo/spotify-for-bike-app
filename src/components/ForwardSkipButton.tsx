import React from 'react';
import {
    StyleSheet, Text, TouchableHighlight, View
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
                onPress={this.onButtonPressed}>
                {isActive ?
                    <Icon name="skip-forward" size={70} color={"black"} /> :
                    <Text style={styles.connectText}>CONNECT</Text>
                }

            </TouchableHighlight>
        )
    }

    onButtonPressed = async () => {
        try {
            const isActive = this.context.isConnected == true
            if (isActive) await this.context.remote.skipToNext()
            else this.context.startAuthSession()
        } catch (err) {
            this.context.onError(err as Error)
        }
    }
}

const styles = StyleSheet.create({

    skipForwardButton: {
        width: "100%",
        height: "30%",
        alignItems: "center",
        justifyContent: "center"
    },

    connectText: {
        fontSize: 30,
        fontWeight: "bold"
    },

    active: {
        backgroundColor: colors.spotifyGreen,
    },

    inactive: {
        backgroundColor: colors.spotifyGrey,
    }
});

export default SkipForwardButton;
