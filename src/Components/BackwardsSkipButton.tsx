import React from 'react';
import {
    StyleSheet, TouchableHighlight, View
} from 'react-native';
import colors from '../utils/Colors';
import Icon from "react-native-vector-icons/Feather"
import SpotifyAPIContext from '../SpotifyAPIContext';


class SkipBackwardsButton extends React.PureComponent {

    static contextType = SpotifyAPIContext;
    declare context: React.ContextType<typeof SpotifyAPIContext>

    render(): React.ReactNode {
        const isActive = this.context.isConnected == true

        return (
            <TouchableHighlight
                style={[styles.skipBackwardsButton, isActive ? styles.active : styles.inactive]}
                onPress={this.skipBack}>
                <Icon name="skip-back" size={70} color={"black"} />
            </TouchableHighlight>
        )
    }

    skipBack = async () => {
        try{
            const isActive = this.context.isConnected == true
            if (!isActive) return;
            await this.context.remote.skipToPrevious()
        }catch(err){
            this.context.onError(err as Error)
        }
    }
}

const styles = StyleSheet.create({

    skipBackwardsButton: {
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        flex: 2
    },


    active: {
        backgroundColor: colors.blue,
    },

    inactive: {
        backgroundColor: colors.spotifyGrey,
    }
});

export default SkipBackwardsButton;
