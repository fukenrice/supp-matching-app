import {KeyboardAvoidingView, StyleSheet, Text, TextInput, View} from "react-native";
import {loginHintsText} from "../../styles";
import ButtonActive from "../buttons/ButtonActive";
import React, {useState} from "react";
import ButtonInactive from "../buttons/ButtonInactive";
import {useDispatch, useSelector} from "react-redux";
import {addName} from "../../redux/action-creators/ProfileActionCreators";
import {RootState} from "../../redux/reducers/rootReducer";

export default function NameScreen() {

    const state = useSelector((state: RootState) => state.userProfile)
    const [name, setName] = useState(state.name)
    const dispatch = useDispatch()


    return <KeyboardAvoidingView style={styles.container} behavior={"padding"} >
        <View style={{flex: 9, alignItems: "center", justifyContent: "center"}}>
            <Text style={loginHintsText}>Как к тебе обращаться?</Text>
            <TextInput placeholder={"Твое имя..."} style={{fontSize: 25, fontWeight: "600", textAlign: 'center'}}
                       onChangeText={(text) => setName(text)}
                       maxLength={15}>{name}</TextInput>
        </View>

        <View style={{flex: 1, width: "100%", alignItems: "center"}}>
            {name.length !== 0 ?
                <ButtonActive text={"Далее"} onClick={() => {
                    dispatch(addName(name))
                }}/>
                :
                <ButtonInactive text={"Далее"}/>
            }
        </View>
    </KeyboardAvoidingView>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        alignSelf: 'stretch',
        justifyContent: 'center',
    },
})
