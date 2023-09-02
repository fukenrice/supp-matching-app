import {StyleSheet, Text, View} from "react-native";
import {loginHintsText} from "../../styles";
import ButtonActive from "../buttons/ButtonActive";
import React, {useState} from "react";
import ButtonInactive from "../buttons/ButtonInactive";
import DatePicker from "react-native-date-picker";
import {formatDate} from "../../utils/formatDate";
import {useDispatch} from "react-redux";
import {addBirthday} from "../../redux/action-creators/ProfileActionCreators";

export default function BirthdayScreen() {

    const maxDate = new Date()
    maxDate.setFullYear(maxDate.getFullYear() - 18)
    const [date, setDate] = useState(maxDate)
    const [open, setOpen] = useState(false)
    const [init, setInit] = useState(true)
    const dispatch = useDispatch()

    return <View style={styles.container}>
        <DatePicker
            modal
            open={open}
            date={date}
            maximumDate={maxDate}
            mode={"date"}
            androidVariant={"nativeAndroid"}
            onConfirm={(date) => {
                setOpen(false)
                setDate(date)
                setInit(false)
            }}
            onCancel={() => {
                setOpen(false)
            }}
        />
        <View style={{flex: 9, alignItems: "center", justifyContent: "center"}}>
            <Text style={loginHintsText}>Выбери дату своего рождения</Text>
            <Text
                style={init ? {...styles.date, color: "grey"} : {...styles.date}} onPress={() => setOpen(true)}>{init ? "Твоя дата рождения" : formatDate(date)}</Text>
        </View>

        <View style={{flex: 1, width: "100%", alignItems: "center"}}>
            {!init ?
                <ButtonActive text={"Далее"} onClick={() => {
                    dispatch(addBirthday(date))
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
