import React from 'react';
import {
    StyleSheet, TouchableHighlight, View
} from 'react-native';
import colors from '../Colors';
import Icon from "react-native-vector-icons/Feather"

class SkipForwardButton extends React.PureComponent {

    render(): React.ReactNode {
        return (
            <TouchableHighlight style={styles.skipForwardButton}>
                <Icon name="skip-forward" size = {70} color = {"black"}/>
            </TouchableHighlight>
        )
    }
}

const styles = StyleSheet.create({
    
    skipForwardButton: {
        backgroundColor: colors.spotifyGreen,
        width: "100%",
        height: "33%",
        alignItems: "center",
        justifyContent: "center"
    },
});

export default SkipForwardButton;
