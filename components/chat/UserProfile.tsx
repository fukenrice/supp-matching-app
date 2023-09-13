import {StyleSheet, Text, View} from "react-native";
import {loginHintsText} from "../../styles";
import ButtonActive from "../buttons/ButtonActive";
import React, {useEffect, useState} from "react";
import UserCard from "../card/UserCard";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/reducers/rootReducer";
import Swiper from "react-native-swiper";
import {createChatUser, getProblems, getUserProfile, uploadPhotos, uploadUser} from "../../data/repo/repo";
import {useNavigation} from "@react-navigation/native";
import {calculateAge} from "../../utils/calculateAge";
import Spinner from "react-native-loading-spinner-overlay";
import {ProfileData} from "../../data/models/ProfileData";
import {UserProfileProps} from "../../Navigate";

export default function UserProfile({route: {params}}: UserProfileProps) {

    const nav = useNavigation<any>()
    const [spinner, setSpinner] = useState(false)
    const [profile, setProfile] = useState<ProfileData | undefined>(undefined)

    useEffect(() => {
        getUser()
    }, []);

    const getUser = async () => {
        setSpinner(true)
        const data = await getUserProfile(params.uid)
        console.log()
        if (data) {
            setProfile(data)
        }
        setSpinner(false)
    }

    return <View style={styles.container}>
        <Spinner
            visible={spinner}
            textContent={'Загружаю профиль...'}
            textStyle={{color: "white"}}
        />
        {profile &&  <View style={{flex: 1, alignItems: "center", justifyContent: "center", width: "100%", padding: 20}}>
            <UserCard name={profile.name} desc={profile.desc} birthday={calculateAge(profile.birthday!)} hobbies={profile.hobbies}
                      photos={profile.photos} problems={profile.problems}
                      style={{width: "100%"}}
            />
        </View>}
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
