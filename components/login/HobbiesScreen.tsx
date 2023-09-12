import {Alert, StyleSheet, Text, TextInput, View} from "react-native";
import {loginHintsText} from "../../styles";
import ButtonActive from "../buttons/ButtonActive";
import React, {useEffect, useRef, useState} from "react";
import ButtonInactive from "../buttons/ButtonInactive";
import {SearchBar} from "@rneui/themed";
import {Ionicons} from '@expo/vector-icons';
import {getHobbies} from "../../data/repo/repo";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/reducers/rootReducer";
import {confirmHobbies} from "../../redux/action-creators/ProfileActionCreators";
import HobbyModel from "../../data/models/HobbyModel";
import Spinner from "react-native-loading-spinner-overlay";

const reactNativeTagSelect = require("react-native-tag-select")
const TagSelect = reactNativeTagSelect.TagSelect

export default function HobbiesScreen() {
    const ref = useRef()
    const [hobbies, setHobbies] = useState<HobbyModel[]>([])
    const [displayedHobbies, setDisplayedHobbies] = useState<HobbyModel[]>([])
    const state = useSelector((state: RootState) => state.userProfile)
    const [checkedCount, setCheckedCount] = useState(state.hobbies.length)
    const dispatch = useDispatch()
    const [spinner, setSpinner] = useState(false)

    const fetchHobbies = async () => {
        setSpinner(true)

        const remote = await getHobbies()
        if (remote) {
            setDisplayedHobbies(remote)
            setHobbies(remote)
        }
        setSpinner(false)
    }

    useEffect(() => {
        fetchHobbies()
    }, []);

    const getSelectedHobbies = () => {
        return ref.current!.itemsSelected as HobbyModel[]
    }


    return <View style={styles.container}>
        <Spinner
            visible={spinner}
            textContent={'Загружаю хобби...'}
            textStyle={{color: "white"}}
        />
        <View style={{flex: 9, alignItems: "flex-start", width: "100%", padding: 20}}>
            <Text
                style={{
                    ...loginHintsText,
                    marginBottom: 5
                }}>Выбери до 5 увлечений</Text>

            <View style={styles.searchContainer}>
                <Ionicons name="search" style={{marginRight: 5}} size={20} color="grey"/>
                <TextInput placeholder={"Поиск..."} style={{width: "100%"}} onChangeText={(text) => {
                    setDisplayedHobbies(prevState => {
                        return hobbies.filter(v => v.hobbyName.includes(text))
                    })
                }}/>
            </View>

            <TagSelect
                value={state.hobbies}
                data={displayedHobbies}
                max={5}
                ref={ref}
                onItemPress={() => setCheckedCount(ref.current!.totalSelected)}
                labelAttr={"hobbyName"}
                itemStyle={styles.bulletContainer}
                itemStyleSelected={styles.bulletContainerSelected}
                onMaxError={() => {
                    Alert.alert("Выбрано 5 из 5 увлечений");
                }}
            />
        </View>

        <View style={{flex: 1, width: "100%", alignItems: "center"}}>
            <ButtonActive text={"Далее"} onClick={async () => {
                console.log(getSelectedHobbies())
                dispatch(confirmHobbies(getSelectedHobbies()))
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
