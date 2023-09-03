import ProblemModel from "../../models/ProblemModel";
import HobbyModel from "../../models/HobbyModel";
import { StyleSheet, Text, View} from "react-native";

export default function BulletList({data, onPress}: {
    data: (ProblemModel | HobbyModel)[],
    onPress: () => void
}) {

    return <View style={styles.container}>
        {data.map(v => <View style={styles.bulletContainer}><Text style={{color: "white"}}
                                                                  onPress={() => onPress()}>{"problemName" in v ? v.problemName : v.hobbyName}</Text></View>)}
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