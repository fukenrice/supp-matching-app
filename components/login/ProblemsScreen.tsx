import {Alert, StyleSheet, Text, TextInput, View} from "react-native";
import {loginHintsText} from "../../styles";
import ButtonActive from "../buttons/ButtonActive";
import React, {useEffect, useRef, useState} from "react";
import ButtonInactive from "../buttons/ButtonInactive";
import {SearchBar} from "@rneui/themed";
import {Ionicons} from '@expo/vector-icons';
import ProblemModel from "../../data/models/ProblemModel";
import {getProblems} from "../../data/repo/repo";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/reducers/rootReducer";
import {confirmProblems} from "../../redux/action-creators/ProfileActionCreators";

const reactNativeTagSelect = require("react-native-tag-select")
const TagSelect = reactNativeTagSelect.TagSelect

export default function ProblemsScreen() {
    const ref = useRef()
    const [problems, setProblems] = useState<ProblemModel[]>([])
    const [displayedProblems, setDisplayedProblems] = useState<ProblemModel[]>([])
    const state = useSelector((state: RootState) => state.userProfile)
    const [checkedCount, setCheckedCount] = useState(state.problems.length)
    const dispatch = useDispatch()

    const fetchProblems = async () => {
        const remote = await getProblems()
        setDisplayedProblems(remote)
        setProblems(remote)
    }

    useEffect(() => {
        fetchProblems()
    }, []);

    const getSelectedProblems = () => {
        return ref.current!.itemsSelected as ProblemModel[]
    }


    return <View style={styles.container}>
        <View style={{flex: 9, alignItems: "flex-start", width: "100%", padding: 20}}>
            <Text
                style={{
                    ...loginHintsText,
                    marginBottom: 5
                }}>Выбери тему, которую хочешь обсудить</Text>
            <Text
                style={styles.hint}>Выбери до 5 проблем, котоыре тебя волнуют прямо сейчас</Text>

            <View style={styles.searchContainer}>
                <Ionicons name="search" style={{marginRight: 5}} size={20} color="grey"/>
                <TextInput placeholder={"Поиск..."} style={{width: "100%"}} onChangeText={(text) => {
                    setDisplayedProblems(prevState => {
                        return problems.filter(v => v.problemName.includes(text))
                    })
                }}/>
            </View>

            <TagSelect
                value={state.problems}
                data={displayedProblems}
                max={5}
                ref={ref}
                onItemPress={() => setCheckedCount(ref.current!.totalSelected)}
                labelAttr={"problemName"}
                itemStyle={styles.bulletContainer}
                itemStyleSelected={styles.bulletContainerSelected}
                onMaxError={() => {
                    Alert.alert("Выбрано 5 из 5 проблем");
                }}
            />
        </View>

        <View style={{flex: 1, width: "100%", alignItems: "center"}}>
            {checkedCount !== 0 ?
                <ButtonActive text={"Далее"} onClick={async () => {
                    console.log(getSelectedProblems())
                    dispatch(confirmProblems(getSelectedProblems()))
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
        alignItems: 'center',
        alignSelf: 'stretch',
        justifyContent: 'center',
    },
    bulletContainerSelected: {
        backgroundColor: "#575757",
        paddingVertical: 7,
        paddingHorizontal: 13.2,
        borderRadius: 100,
    },
    bulletContainer: {
        borderWidth: 1,
        backgroundColor: "#eaeaea",
        borderColor: "#D8D8D8",
        paddingVertical: 7,
        paddingHorizontal: 13.2,
        borderRadius: 100,
    },
    searchContainer: {
        marginTop: 20,
        marginBottom: 10,
        width: "100%",
        alignItems: 'center',
        padding: 5,
        flexDirection: "row",
        borderRadius: 10,
        borderWidth: 1,
        backgroundColor: "#eaeaea",
        borderColor: "#D8D8D8"
    },
    hint: {
        fontSize: 10,
        color: "#8F8F8F"
    }
})
