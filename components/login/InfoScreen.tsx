import {
    FlatList,
    KeyboardAvoidingView,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import {loginHintsText} from "../../styles";
import ButtonActive from "../buttons/ButtonActive";
import ButtonInactive from "../buttons/ButtonInactive";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/reducers/rootReducer";
import ProblemModel from "../../data/models/ProblemModel";
import {addDesc, addHobbies, addProblems, confirmDesc} from "../../redux/action-creators/ProfileActionCreators";
import HobbyModel from "../../data/models/HobbyModel";
import BulletList from "../utils/BulletList";
import React, {useRef, useState} from "react";

export default function InfoScreen() {

    const state = useSelector((state: RootState) => state.userProfile)
    const dispatch = useDispatch()
    // const [desc, setDesc] = useState(state.desc)
    const textInputRef = useRef<TextInput>(null)

    return <View style={styles.container}>
        <KeyboardAvoidingView
            style={{flex: 9, alignItems: "center", justifyContent: "center", width: "100%", padding: 20}}
            behavior={"height"}>
            <View style={styles.dataInputContainer}>
                <Text style={loginHintsText}>О чем ты хочешь поговорить?</Text>
                {state.problems.length !== 0 ?
                    <BulletList data={state.problems} onPress={() => dispatch(addProblems())}/> :
                    <TouchableOpacity style={styles.addButtonContainer} onPress={() => dispatch(addProblems())}>
                        <Text style={{fontSize: 15, color: "#656565"}}>+ Добавить проблему</Text>
                    </TouchableOpacity>
                }

            </View>

            <View style={styles.dataInputContainer}>
                <Text style={loginHintsText}>Чем ты увлекаешься?</Text>
                {state.hobbies.length !== 0 ?
                    <BulletList data={state.hobbies} onPress={() => dispatch(addHobbies())}/> :
                    <TouchableOpacity style={styles.addButtonContainer} onPress={() => dispatch(addHobbies())}>
                        <Text style={{fontSize: 15, color: "#656565"}}>+ Добавить увлечение</Text>
                    </TouchableOpacity>
                }

            </View>

            <View style={{...styles.dataInputContainer, marginBottom: 0}}>
                <Text style={loginHintsText}>Расскажи о себе</Text>
                <View style={styles.textInputContainer}>
                    <TextInput multiline={true} numberOfLines={15} style={styles.textInput} maxLength={1500}
                               onChangeText={(text) => dispatch(addDesc(text))}
                               placeholder={"Чем ты увлекаешься? Чего ищешь тут? Чего ждешь от общения?"}>{state.desc}</TextInput>
                </View>
            </View>
        </KeyboardAvoidingView>

        <View style={{flex: 1, width: "100%", alignItems: "center"}}>
            {state.desc.length !== 0 && state.problems.length !== 0 ?
                <ButtonActive text={"Далее"} onClick={() => {
                    dispatch(confirmDesc())
                }}/>
                :
                <ButtonInactive text={"Далее"}/>
            }
        </View>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-start',
        alignSelf: 'stretch',
        justifyContent: 'center',
    },
    addButtonContainer: {
        borderRadius: 100,
        alignItems: "center",
        alignSelf: "flex-start",
        padding: 7,
        paddingHorizontal: 13.2,
        borderStyle: "dashed",
        borderWidth: 1,
        backgroundColor: "#eaeaea",
        borderColor: "#D8D8D8"
    },
    dataInputContainer: {
        alignSelf: "stretch",
        marginBottom: 20
    },
    textInputContainer: {
        width: "100%",
        alignItems: "center",
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        backgroundColor: "#eaeaea",
        borderColor: "#D8D8D8",
    },
    textInput: {
        width: "100%",
        textAlignVertical: "top"
    },
})