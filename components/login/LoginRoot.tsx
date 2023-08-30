import {StyleSheet, View} from "react-native";
import {useDispatch, useSelector, useStore} from "react-redux";
import {ProfileAction} from "../../redux/actions/ProfileAction";
import {RootState} from "../../redux/reducers/rootReducer";
import StartScreen from "./StartScreen";

export default function LoginRoot() {
    const dispatch = useDispatch()
    const state = useSelector((state: RootState) => state.userProfile)

    return <View style={styles.container}>
        {state._stage === "INIT" && <StartScreen />}
        {state._stage === "ADD_PHONE" && <StartScreen />}


    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        alignItems: 'center',
        justifyContent: 'center',
    },
});
