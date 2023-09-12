import {StyleSheet, Text, View} from "react-native";
import {loginHintsText} from "../../styles";
import ButtonActive from "../buttons/ButtonActive";
import React, {useState} from "react";
import ButtonInactive from "../buttons/ButtonInactive";
import DatePicker from "react-native-date-picker";
import {formatDate} from "../../utils/formatDate";
import {useDispatch, useSelector} from "react-redux";
import {addBirthday, confirmBirthday} from "../../redux/action-creators/ProfileActionCreators";
import {RootState} from "../../redux/reducers/rootReducer";
import {SvgXml} from "react-native-svg";
import {bdProgress} from "../../assets/bdProgress";

export default function BirthdayScreen() {

    const state = useSelector((state: RootState) => state.userProfile)
    const maxDate = new Date()
    maxDate.setFullYear(maxDate.getFullYear() - 18)
    const [date, setDate] = useState(maxDate)
    const [open, setOpen] = useState(false)
    const [init, setInit] = useState(true)
    const dispatch = useDispatch()

    return <View style={styles.container}>
        <SvgXml xml={bdProgress} style={{position: "absolute", top: 10}}/>
        <DatePicker
            modal
            open={open}
            date={date}
            maximumDate={maxDate}
            mode={"date"}
            androidVariant={"nativeAndroid"}
            onConfirm={(date) => {
                setOpen(false)
                dispatch(addBirthday(date))
            }}
            onCancel={() => {
                setOpen(false)
            }}
        />
        <View style={{flex: 9, alignItems: "center", justifyContent: "center"}}>
            <Text style={loginHintsText}>Выбери дату своего рождения</Text>
            <Text
                style={state.birthday ? {...styles.date} : {...styles.date, color: "grey"}}
                onPress={() => setOpen(true)}>{state.birthday ? formatDate(state.birthday) : "Твоя дата рождения"}</Text>
        </View>

        <View style={{flex: 1, width: "100%", alignItems: "center"}}>
            {state.birthday ?
                <ButtonActive text={"Далее"} onClick={() => {
                    dispatch(confirmBirthday())
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
    date: {
        fontSize: 25,
        fontWeight: "600",
    }
})
