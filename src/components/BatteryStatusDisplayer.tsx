import React from 'react';
import {
    StyleSheet, Text, View
} from 'react-native';
import { getBatteryLevel } from 'react-native-device-info';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const refreshHz = 10; //in seconds

class BatteryIcon extends React.PureComponent<{}, { batteryStatus: string, batteryColor: string, batteryLevel: number }> {

    intervalID: NodeJS.Timer | undefined = undefined;

    state = { batteryStatus: "-40", batteryColor: "green", batteryLevel: 100 }

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
            if (batteryLevel <= 0.1) this.setState({ batteryColor: "#FF0D0D" })
            else if (batteryLevel <= 0.20) this.setState({ batteryColor: "#FF8E15" })
            else if (batteryLevel <= 0.35) this.setState({ batteryColor: "#ffcc00" })
            else if (batteryLevel <= 0.45) this.setState({ batteryColor: "#fbfd00" })
            else if (batteryLevel <= 0.70) this.setState({ batteryColor: "#a5c90f" })
            else this.setState({ batteryColor: "#2cba00" })

            this.setState({
                batteryStatus: batteryLevel >= 0.9
                    ? ""
                    : ("-" + Math.max(10, Math.round(batteryLevel * 10) * 10).toString())
            })

        } catch (e) {
            console.error(e)
        }
    }

    render(): React.ReactNode {
        return (
            <View style={styles.container}>
                <Icon
                    name={"battery" + this.state.batteryStatus}
                    color={this.state.batteryColor}
                    size={35}
                    style={styles.batteryIcon} />
                <Text style={styles.text}>
                    {Math.round(this.state.batteryLevel)}%
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
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 14
    },
    batteryIcon: {
        transform: [{ rotate: "90deg" }],
        marginHorizontal: 4,
        marginBottom: -4,
    },
});

export default BatteryIcon;
