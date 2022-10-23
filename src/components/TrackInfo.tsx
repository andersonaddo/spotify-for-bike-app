import React from 'react';
import {
    Image,
    StyleSheet, Text, View
} from 'react-native';
import { Track } from 'react-native-spotify-remote';
import SpotifyWebApi from 'spotify-web-api-node';
import SpotifyAPIContext from '../SpotifyAPIContext';
import colors from '../utils/Colors';

interface TrackInfoState {
    url: string
}

class TrackInfo extends React.PureComponent<{}, TrackInfoState> {

    state: TrackInfoState = {
        url: ""
    }

    static contextType = SpotifyAPIContext;
    declare context: React.ContextType<typeof SpotifyAPIContext>

    webApi = new SpotifyWebApi()

    lastTrack: Track | undefined;

    render(): React.ReactNode {
        const isActive = this.context.isConnected == true

        this.fetchArtworkUrl()
        
        return (
            <View style={{ flex: 1 }}>
                <Image
                    defaultSource={require("../../media/music_default.png")}
                    source={(!isActive || this.state.url == "") ? require("../../media/music_default.png") : { uri: this.state.url }}
                    style={styles.albumCover}
                    resizeMode="contain"
                />

                <View style={styles.textPanel}>
                    <Text style={styles.trackTitle}>{!isActive ? "[Title]" : this.context.playerState?.track.name}</Text>
                    <Text style={styles.trackArtist}>{!isActive ? "[Artist]" : this.context.playerState?.track.artist.name}</Text>
                </View>

            </View>
        )
    }

    fetchArtworkUrl = async () => {
        try {
            if (!this.context.token) return;
            const currentTrack = this.context.playerState?.track
            const albumUri = this.context.playerState?.track.album.uri;
            
            if (this.lastTrack == currentTrack)  return;

            if (!albumUri) {
                this.setState({ url: "" })
            } else {
                const split = albumUri.split(":")
                if (split.length != 3) {
                    this.setState({ url: "" })
                } else {
                    this.webApi.setAccessToken(this.context.token);
                    const response = await this.webApi.getAlbum(split[2])
                    const images = response.body.images;
                    if (images.length > 0) this.setState({ url: images[0].url })
                    else this.setState({ url: "" })
                }
            }

            this.lastTrack = currentTrack;
        } catch (err) {
            this.context.onError(err as Error)
        }
    }
}

const styles = StyleSheet.create({
    albumCover: {
        marginTop: 5,
        height: 155,
        width: 155,
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
        color: colors.spotifySand,
        textAlign: "center"
    },
    trackArtist: {
        fontWeight: "bold",
        fontSize: 20,
        color: colors.spotifySand,
        textAlign: "center"
    },
    trackSource: {
        fontSize: 20,
        color: colors.spotifySand
    },
});

export default TrackInfo;
