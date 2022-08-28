import React from 'react';
import {
    StyleSheet, Text
} from 'react-native';
import { getBatteryLevel } from 'react-native-device-info';
import Icon from 'react-native-vector-icons/FontAwesome';

const refreshHz = 10; //in seconds

class TimeDisplay extends React.PureComponent<{}, { time: string }> {

    intervalID: NodeJS.Timer | undefined = undefined;

    state = { time: "" }

    componentDidMount() {
        this.updateTime()
        this.intervalID = setInterval(this.updateTime, refreshHz * 1000)
    }

    componentWillUnmount() {
        clearInterval(this.intervalID)
    }

    updateTime = async () => {
        const currentDate = new Date()
        const hours = currentDate.getHours()
        const minutes = currentDate.getMinutes()
        this.setState({ time: `${hours}:${minutes}` })
    }

    render(): React.ReactNode {
        return (
            <Text style={styles.timeText}>
                {this.state.time}
            </Text>
        )
    }
}


const styles = StyleSheet.create({
    timeText: {
        marginHorizontal: 8,
        color: "lightgrey",
        fontWeight: "bold"
    },
});

export default TimeDisplay;
