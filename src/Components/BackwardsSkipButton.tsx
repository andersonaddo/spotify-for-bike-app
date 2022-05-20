import React from 'react';
import {
    StyleSheet, TouchableHighlight, View
} from 'react-native';
import colors from '../Colors';
import Icon from "react-native-vector-icons/Feather"


class SkipBackwardsButton extends React.PureComponent {

    render(): React.ReactNode {
        return (
            <TouchableHighlight style={styles.skipBackwardsButton}>
                <Icon name="skip-back" size={70} color={"black"} />
            </TouchableHighlight>
        )
    }
}

const styles = StyleSheet.create({

    skipBackwardsButton: {
        backgroundColor: colors.blue,
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        flex: 2
    }
});

export default SkipBackwardsButton;
