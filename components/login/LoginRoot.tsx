import {BackHandler, StyleSheet, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/reducers/rootReducer";
import StartScreen from "./StartScreen";
import {useEffect, useState} from "react";
import {ProfileActionTypes} from "../../redux/action-types";
import PhoneScreen from "./PhoneScreen";
import {addPhone, goToPrevious} from "../../redux/action-creators/ProfileActionCreators";
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth'
import PhoneConfirmationScreen from "./PhoneConfirmationScreen";
import NameScreen from "./NameScreen";
import BirthdayScreen from "./BirthdayScreen";
import GenderScreen from "./GenderScreen";
import InfoScreen from "./InfoScreen";
import ProblemsScreen from "./ProblemsScreen";
import HobbiesScreen from "./HobbiesScreen";
import PhotosScreen from "./PhotosScreen";
import InterestedGenderScreen from "./InterestedGenderScreen";
import AgeRangeScreen from "./AgeRangeScreen";
import ConfirmationScreen from "./ConfirmationScreen";
import {useNavigation} from "@react-navigation/native";

export default function LoginRoot() {
    const dispatch = useDispatch()
    const state = useSelector((state: RootState) => state.userProfile)
    const nav = useNavigation<any>()
    useEffect(() => {
        if (auth().currentUser) {
            nav.replace("Main")
        }
        // auth().signOut()

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
        {state._stage === ProfileActionTypes.ADD_PHONE && <PhoneScreen authFun={signInWithPhoneNumber} />}
        {state._stage === ProfileActionTypes.CONFIRM_PHONE && <PhoneConfirmationScreen confirmCode={confirmCode}/>}
        {state._stage === ProfileActionTypes.ADD_NAME && <NameScreen />}
        {state._stage === ProfileActionTypes.ADD_BIRTHDAY && <BirthdayScreen />}
        {state._stage === ProfileActionTypes.ADD_GENDER && <GenderScreen />}
        {state._stage === ProfileActionTypes.FILL_INFO && <InfoScreen />}
        {state._stage === ProfileActionTypes.ADD_PROBLEMS && <ProblemsScreen />}
        {state._stage === ProfileActionTypes.ADD_HOBBIES && <HobbiesScreen />}
        {state._stage === ProfileActionTypes.ADD_PHOTO && <PhotosScreen />}
        {state._stage === ProfileActionTypes.ADD_INTERESTED_GENDER && <InterestedGenderScreen />}
        {state._stage === ProfileActionTypes.ADD_AGE_RANGE && <AgeRangeScreen />}
        {state._stage === ProfileActionTypes.FINISH && <ConfirmationScreen />}

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

