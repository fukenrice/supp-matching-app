import {StyleSheet, Text, View} from "react-native";
import {loginHintsText} from "../../styles";
import ButtonActive from "../buttons/ButtonActive";
import React, {useState} from "react";
import UserCard from "../card/UserCard";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/reducers/rootReducer";
import Swiper from "react-native-swiper";
import {createChatUser, getProblems, registerMessagingUser, uploadPhotos, uploadUser} from "../../data/repo/repo";
import {useNavigation} from "@react-navigation/native";
import {calculateAge} from "../../utils/calculateAge";
import Spinner from "react-native-loading-spinner-overlay";

export default function ConfirmationScreen() {

    const state = useSelector((state: RootState) => state.userProfile)
    const nav = useNavigation<any>()
    const [spinner, setSpinner] = useState(false)

    const createUsers = async () => {
        setSpinner(true)
        const photos = await uploadPhotos(state.photos)
        if (photos) {
            const [firebaseUser, chatUser, messagingUser] = await Promise.all([uploadUser(state, photos), createChatUser(state.name, photos[0]), registerMessagingUser()])
            setSpinner(false)
            return firebaseUser && chatUser && messagingUser
        }
        setSpinner(false)
        return false
    }


    return <View style={styles.container}>
        <Spinner
            visible={spinner}
            textContent={'Создаю профиль...'}
            textStyle={{color: "white"}}
        />
        <View style={{flex: 9, alignItems: "center", justifyContent: "center", width: "100%", padding: 20}}>
            <Text style={loginHintsText}></Text>
            <UserCard name={state.name} desc={state.desc} birthday={calculateAge(state.birthday!)} hobbies={state.hobbies}
                      photos={state.photos} problems={state.problems}
                      style={{width: "100%"}}
            />

        </View>

        <View style={{flex: 1, width: "100%", alignItems: "center"}}>
            <ButtonActive text={"Сохранить и начать поиск"} onClick={async () => {
                const result = await createUsers()
                if (result) {
                    nav.replace("Main")
                    console.log("profile added")
                } else {
                    alert("Ошибка при создании профиля, пожалуйста, повторите попытку позднее")
                }
            }}/>
        </View>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        alignSelf: 'stretch',
        justifyContent: 'center',
    },
})
