import React from 'react';
import {
    StyleSheet, TouchableHighlight, View
} from 'react-native';
import colors from '../Colors';
import Icon from "react-native-vector-icons/Feather"

class PausePlayButton extends React.PureComponent {

    render(): React.ReactNode {
        return (
            <TouchableHighlight style={styles.pausePlayButton}>
                <Icon name="play" size={70} color={"black"} />
            </TouchableHighlight>
        )
    }
}

const styles = StyleSheet.create({

    pausePlayButton: {
        backgroundColor: colors.darkBlue,
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        flex: 3
    },
});

export default PausePlayButton;
