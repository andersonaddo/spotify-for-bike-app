import React from 'react';
import {
    Image,
    StyleSheet, Text, TouchableHighlight, View
} from 'react-native';
import colors from '../Colors';

class TrackInfo extends React.PureComponent {

    render(): React.ReactNode {
        return (
            <View style={{ flex: 1 }}>
                <Image
                    source={require("../../media/music_default.png")}
                    style={styles.albumCover}
                    resizeMode="contain"
                />

                <View style={styles.textPanel}>
                    <Text style={styles.trackTitle}>Title</Text>
                    <Text style={styles.trackArtist}>Artist</Text>
                    <Text style={styles.trackSource}>Extra Info</Text>
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    albumCover: {
        height: 160,
        width: 160,
        alignSelf: "center",
        overflow: "hidden",
        borderRadius: 12
    },
    textPanel: {
        marginTop: 16,
        marginLeft: 16
    },
    trackTitle: {
        fontWeight: "bold",
        fontSize: 25,
        color: colors.spotifySand
    },
    trackArtist: {
        fontWeight: "bold",
        fontSize: 20,
        color: colors.spotifySand
    },
    trackSource: {
        fontSize: 20,
        color: colors.spotifySand
    },
});

export default TrackInfo;
