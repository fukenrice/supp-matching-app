import {Text, TouchableOpacity, View} from "react-native";
import {commonStyles} from "../../styles";

export default function ButtonInactive({text}: {text: string}) {
    return <View style={commonStyles.buttonInactiveContainer}>
    <Text style={commonStyles.buttonInactiveText}>{text}</Text>
        </View>
}