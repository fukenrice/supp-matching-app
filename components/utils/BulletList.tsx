import ProblemModel from "../../data/models/ProblemModel";
import HobbyModel from "../../data/models/HobbyModel";
import {StyleSheet, Text, TextStyle, View, ViewStyle} from "react-native";

export default function BulletList({data, onPress, containerStyle, textStyle}: {
    data: (ProblemModel | HobbyModel)[],
    onPress?: () => void,
    containerStyle?: ViewStyle,
    textStyle?: TextStyle
}) {

    return <View style={styles.container}>
        {data.map((v, index) => <View key={v.id} style={[styles.bulletContainer, containerStyle]}><Text style={[{color: "white"}, textStyle]}
                                                                  onPress={onPress ? () => onPress() : () => {}}>{"problemName" in v ? v.problemName : v.hobbyName}</Text></View>)}
    </View>

}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 5,
    },
    bulletContainer: {
        backgroundColor: "#575757",
        paddingVertical: 7,
        paddingHorizontal: 13.2,
        borderRadius: 100,
    }
})