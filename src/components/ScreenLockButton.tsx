import React from 'react';
import {
    StyleSheet, Text, TouchableOpacity, View
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../utils/Colors';
import IdleTimerManager from 'react-native-idle-timer';
import Snackbar from 'react-native-snackbar';


let isLocked = false;

class ScreenLockButton extends React.PureComponent<{}, { locked: boolean }> {

    state = { locked: isLocked }

    render(): React.ReactNode {
        return (
            <TouchableOpacity style={styles.container} onPress={this.toggleScreenSleepLock}>
                <Icon
                    name={isLocked ? "sleep-off" : "sleep"}
                    color={colors.spotifySand}
                    size={30} />
                <Text style={styles.lockText}>
                    Sleep {isLocked ? "off" : "on"}
                </Text>
            </TouchableOpacity>

        )
    }

    toggleScreenSleepLock = () => {
        isLocked = !isLocked
        IdleTimerManager.setIdleTimerDisabled(isLocked)
        this.setState({ locked: isLocked })

        Snackbar.show({
            text: `Screen sleep is now ${isLocked ? "disabled" : "enabled"}`,
            duration: Snackbar.LENGTH_SHORT,
        });
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    lockText: {
        color: "lightgrey",
        fontWeight: "bold",
        fontSize: 14,
        textAlign: "center"
    },
});

export default ScreenLockButton;
