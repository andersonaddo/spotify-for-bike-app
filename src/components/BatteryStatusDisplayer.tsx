import React from 'react';
import {
    StyleSheet, Text, View
} from 'react-native';
import { getBatteryLevel } from 'react-native-device-info';
import Icon from 'react-native-vector-icons/FontAwesome';

const refreshHz = 10; //in seconds

class BatteryIcon extends React.PureComponent<{}, { batteryStatus: string, batteryColor: string, batteryLevel: number }> {

    intervalID: NodeJS.Timer | undefined = undefined;

    state = { batteryStatus: "4", batteryColor: "green", batteryLevel: 100 }

    componentDidMount() {
        this.updateBatteryStatus()
        this.intervalID = setInterval(this.updateBatteryStatus, refreshHz * 1000)
    }

    componentWillUnmount() {
        clearInterval(this.intervalID)
    }

    updateBatteryStatus = async () => {
        try {
            const batteryLevel = await getBatteryLevel()
            this.setState({ batteryLevel: batteryLevel * 100 })
            if (batteryLevel < 0.1) this.setState({ batteryStatus: "0", batteryColor: "red" })
            else if (batteryLevel < 0.25) this.setState({ batteryStatus: "1", batteryColor: "orange" })
            else if (batteryLevel < 0.5) this.setState({ batteryStatus: "2", batteryColor: "yellow" })
            else if (batteryLevel < 0.75) this.setState({ batteryStatus: "3", batteryColor: "green" })
            else this.setState({ batteryStatus: "4", batteryColor: "green" })

        } catch (e) {
            console.error(e)
        }
    }

    render(): React.ReactNode {
        return (
            <View style={styles.container}>
                <Icon
                    name={"battery-" + this.state.batteryStatus}
                    color={this.state.batteryColor}
                    size={30}
                    style={styles.batteryIcon} />
                <Text style={styles.text}>
                    {Math.ceil(this.state.batteryLevel)}%
                </Text>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center"
    },
    text: {
        color: "lightgrey",
        textAlign: "center"
    },
    batteryIcon: {
        marginHorizontal: 8
    },
});

export default BatteryIcon;
