import {BackHandler, StyleSheet, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/reducers/rootReducer";
import StartScreen from "./StartScreen";
import {useEffect} from "react";
import {ProfileActionTypes} from "../../redux/action-types";
import PhoneScreen from "./PhoneScreen";
import {goToPrevious} from "../../redux/action-creators/ProfileActionCreators";

export default function LoginRoot() {
    const dispatch = useDispatch()
    const state = useSelector((state: RootState) => state.userProfile)
    useEffect(() => {
        const backAction = () => {
            dispatch(goToPrevious())
            return true
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );

        return () => backHandler.remove();
    }, []);

    return <View style={styles.container}>
        {state._stage === ProfileActionTypes.INIT && <StartScreen />}
        {state._stage === ProfileActionTypes.ADD_PHONE && <PhoneScreen />}


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
