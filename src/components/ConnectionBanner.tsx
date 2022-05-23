import React from 'react';
import {
    StyleSheet, Text
} from 'react-native';
import colors from '../utils/Colors';
import SpotifyAPIContext from '../SpotifyAPIContext';


class ConnectionBanner extends React.PureComponent {

    static contextType = SpotifyAPIContext;
    declare context: React.ContextType<typeof SpotifyAPIContext>

    render(): React.ReactNode {
        const isConnected = this.context.isConnected == true

        if (isConnected) return null;

        return (
            <Text style={styles.banner}>
                Not Connected to Spotify!
            </Text>
        )
    }
}

const styles = StyleSheet.create({

    banner: {
        textAlign: "center",
        backgroundColor: colors.errorRed,
        color: colors.spotifySand,
        height: 25,
        alignItems: "center",
        justifyContent: "center",
    },
});

export default ConnectionBanner;
