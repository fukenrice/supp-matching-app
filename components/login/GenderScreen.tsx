import {StyleSheet, Text, View} from "react-native";
import {loginHintsText} from "../../styles";
import ButtonActive from "../buttons/ButtonActive";
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addGender} from "../../redux/action-creators/ProfileActionCreators";
import {RootState} from "../../redux/reducers/rootReducer";
import {SvgXml} from "react-native-svg";
import {genderProgress} from "../../assets/genderProgress";

export default function GenderScreen() {
    const state = useSelector((state: RootState) => state.userProfile)
    const [selectedMale, setSelectedMale] = useState(state.gender !== "female")
    const dispatch = useDispatch()

    return <View style={styles.container}>
        <SvgXml xml={genderProgress} style={{position: "absolute", top: 10, width: "100%"}}/>
        <View style={{flex: 9, alignItems: "center", justifyContent: "center"}}>
            <Text style={loginHintsText}>Выбери пол</Text>
            <View style={styles.genderContainer}>
                <Text style={selectedMale ? styles.gender : {...styles.gender, color: 'grey'}}
                      onPress={() => setSelectedMale(true)}>М</Text>
                <Text style={!selectedMale ? styles.gender : {...styles.gender, color: 'grey'}}
                      onPress={() => setSelectedMale(false)}>Ж</Text>
            </View>
        </View>

        <View style={{flex: 1, width: "100%", alignItems: "center"}}>
            <ButtonActive text={"Далее"} onClick={() => {
                dispatch(addGender(selectedMale ? "male" : "female"))
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
    genderContainer: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "space-evenly",
        width: '70%'
    },
    gender: {
        fontSize: 25,
        fontWeight: "600",
    }
})
