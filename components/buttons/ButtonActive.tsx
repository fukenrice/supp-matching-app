import {Text, TextStyle, TouchableOpacity, View, ViewStyle} from "react-native";
import {commonStyles} from "../../styles";

export default function ButtonActive({text, onClick, containerStyle, textStyle}: {text: string, onClick: () => void, containerStyle?: ViewStyle | ViewStyle[], textStyle?: TextStyle | TextStyle[]}) {
    return <TouchableOpacity style={[commonStyles.buttonActiveContainer, containerStyle]} onPress={() => onClick()}>
        <Text style={[commonStyles.buttonActiveText, textStyle]}>{text}</Text>
    </TouchableOpacity>
}