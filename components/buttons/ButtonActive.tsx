import {Text, TouchableOpacity, View} from "react-native";
import {commonStyles} from "../../styles";

export default function ButtonActive({text, onClick}: {text: string, onClick: () => void}) {
    return <TouchableOpacity style={commonStyles.buttonActiveContainer} onPress={() => onClick()}>
        <Text style={commonStyles.buttonActiveText}>{text}</Text>
    </TouchableOpacity>
}