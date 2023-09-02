import {BackHandler, StyleSheet, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/reducers/rootReducer";
import StartScreen from "./StartScreen";
import {useEffect, useState} from "react";
import {ProfileActionTypes} from "../../redux/action-types";
import PhoneScreen from "./PhoneScreen";
import {goToPrevious} from "../../redux/action-creators/ProfileActionCreators";
import {addPhone, goToPrevious} from "../../redux/action-creators/ProfileActionCreators";
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth'
import PhoneConfirmationScreen from "./PhoneConfirmationScreen";

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


    const [confirm, setConfirm] = useState<FirebaseAuthTypes.ConfirmationResult | null>(null)

    const signInWithPhoneNumber = async (phoneNumber: string) => {
        const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
        setConfirm(confirmation);
        dispatch(addPhone(phoneNumber))
    }

    // TODO: move auth logic to reducer
    const confirmCode = async (code: string) => {
        try {
            await confirm?.confirm(code)
            // dispatch(confirmPhone(""))
        } catch (e) {
            alert("Введен неправильный код")
        }
    }

    return <View style={styles.container}>
        {state._stage === ProfileActionTypes.INIT && <StartScreen />}
        {state._stage === ProfileActionTypes.ADD_PHONE && <PhoneScreen />}

        {state._stage === ProfileActionTypes.ADD_PHONE && <PhoneScreen authFun={signInWithPhoneNumber} />}
        {state._stage === ProfileActionTypes.CONFIRM_PHONE && <PhoneConfirmationScreen confirmCode={confirmCode}/>}

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
