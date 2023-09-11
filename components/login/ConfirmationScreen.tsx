import {StyleSheet, Text, View} from "react-native";
import {loginHintsText} from "../../styles";
import ButtonActive from "../buttons/ButtonActive";
import React from "react";
import UserCard from "../card/UserCard";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/reducers/rootReducer";
import Swiper from "react-native-swiper";
import {createChatUser, uploadPhotos, uploadUser} from "../../data/repo/repo";
import {useNavigation} from "@react-navigation/native";
import {calculateAge} from "../../utils/calculateAge";

export default function ConfirmationScreen() {

    const state = useSelector((state: RootState) => state.userProfile)
    const nav = useNavigation<any>()

    const createUsers = async () => {
        const photos = await uploadPhotos(state.photos)
        if (photos) {
            await Promise.all([uploadUser(state, photos), createChatUser(state.name, photos[0])])
        }
    }


    return <View style={styles.container}>
        <View style={{flex: 9, alignItems: "center", justifyContent: "center", width: "100%", padding: 20}}>
            <Text style={loginHintsText}></Text>
            <UserCard name={state.name} desc={state.desc} birthday={calculateAge(state.birthday!)} hobbies={state.hobbies}
                      photos={state.photos} problems={state.problems}
                      style={{width: "100%"}}
            />

        </View>

        <View style={{flex: 1, width: "100%", alignItems: "center"}}>
            <ButtonActive text={"Сохранить и начать поиск"} onClick={async () => {
                await createUsers()
                nav.replace("Main")
                console.log("profile added")
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
