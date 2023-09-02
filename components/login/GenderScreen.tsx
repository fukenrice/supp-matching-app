import {StyleSheet, Text, View} from "react-native";
import {loginHintsText} from "../../styles";
import ButtonActive from "../buttons/ButtonActive";
import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {addGender} from "../../redux/action-creators/ProfileActionCreators";

export default function GenderScreen() {

    const [selectedMale, setSelectedMale] = useState(true)
    const dispatch = useDispatch()

    return <View style={styles.container}>
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
