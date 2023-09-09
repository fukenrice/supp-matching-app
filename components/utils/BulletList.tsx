import ProblemModel from "../../data/models/ProblemModel";
import HobbyModel from "../../data/models/HobbyModel";
import {StyleSheet, Text, TextStyle, View, ViewStyle} from "react-native";

export default function BulletList({data, onPress, bulletContainerStyle, textStyle, checked, defaultMode, containerStyle}: {
    data: (ProblemModel | HobbyModel)[],
    onPress?: () => void,
    containerStyle?: ViewStyle,
    bulletContainerStyle?: ViewStyle,
    defaultMode?: "dark" | "light",
    textStyle?: TextStyle,
    checked?: (ProblemModel | HobbyModel)[]
}) {

    if (defaultMode === undefined) {
        defaultMode = "dark"
    }

    if (defaultMode === "dark") {
        return <View style={[styles.container, containerStyle]}>
            {data.map((v, index) =>
                <View
                    key={v.id}
                    style={[styles.bulletContainerSelected, bulletContainerStyle]}><Text
                    style={[{color: "white"}, textStyle]}
                    onPress={onPress ? () => onPress() : () => {
                    }}>{"problemName" in v ? v.problemName : v.hobbyName}</Text></View>)}
        </View>
    } else {
        return <View style={[styles.container, containerStyle]}>
            {data.map((v, index) =>
                <View
                    key={v.id}
                    style={[checked?.some(check => check.id === v.id) ? styles.bulletContainerSelected : styles.bulletContainer, bulletContainerStyle]}><Text
                    style={[checked?.some(check => check.id === v.id) ? {color: "white"} : {color: "black"}, textStyle]}
                    onPress={onPress ? () => onPress() : () => {
                    }}>{"problemName" in v ? v.problemName : v.hobbyName}</Text></View>)}
        </View>
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 5,
    },
    bulletContainer: {
        borderWidth: 1,
        backgroundColor: "#eaeaea",
        borderColor: "#D8D8D8",
        paddingVertical: 7,
        paddingHorizontal: 13.2,
        borderRadius: 100,
    },
    bulletContainerSelected: {
        backgroundColor: "#575757",
        borderWidth: 1,
        borderColor: "#D8D8D8",
        paddingVertical: 7,
        paddingHorizontal: 13.2,
        borderRadius: 100,
    },
})