import {StyleSheet, Text, View} from "react-native";
import {loginHintsText} from "../../styles";
import ButtonActive from "../buttons/ButtonActive";
import React, {useState} from "react";
import ButtonInactive from "../buttons/ButtonInactive";
import {Genders} from "../../data/models/Genders";
import {useDispatch, useSelector} from "react-redux";
import {addInterestedGender} from "../../redux/action-creators/ProfileActionCreators";
import {RootState} from "../../redux/reducers/rootReducer";

export default function InterestedGenderScreen() {
    const state = useSelector((state: RootState) => state.userProfile)
    const [gender, setGender] = useState(state.interestedGender as Genders)
    const dispatch = useDispatch()

    return <View style={styles.container}>
        <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
            <Text style={{...loginHintsText}}>С кем ты хочешь общаться?</Text>

        </View>
        <View style={{flex: 8, alignItems: "center", justifyContent: "center", width: "100%"}}>
            <ButtonActive containerStyle={[{
                marginBottom: 5,
                borderWidth: 1,
                borderColor: "#D8D8D8"
            }, gender === Genders.FEMALE ? {} : {backgroundColor: "#eaeaea"}]}
                          textStyle={gender === Genders.FEMALE ? {} : {color: "#656565"}}
                          text={"Женщины"} onClick={() => {
                setGender(Genders.FEMALE)
            }}/>
            <ButtonActive containerStyle={[{
                marginBottom: 5,
                borderWidth: 1,
                borderColor: "#D8D8D8"
            }, gender === Genders.MALE ? {} : {backgroundColor: "#eaeaea"}]}
                          textStyle={gender === Genders.MALE ? {} : {color: "#656565"}}
                          text={"Мужчины"} onClick={() => {
                setGender(Genders.MALE)
            }}/>
            <ButtonActive containerStyle={[{
                marginBottom: 5,
                borderWidth: 1,
                borderColor: "#D8D8D8"
            }, gender === Genders.DOES_NOT_MATTER ? {} : {backgroundColor: "#eaeaea"}]}
                          textStyle={gender === Genders.DOES_NOT_MATTER ? {} : {color: "#656565"}}
                          text={"Без разницы"} onClick={() => {
                setGender(Genders.DOES_NOT_MATTER)
            }}/>

        </View>

        <View style={{flex: 1, width: "100%", alignItems: "center"}}>
            <ButtonActive text={"Далее"} onClick={() => {
                dispatch(addInterestedGender(gender))
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
