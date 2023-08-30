import {SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {commonStyles, loginHintsText} from "../../styles";
import ButtonActive from "../buttons/ButtonActive";
import React, {useEffect, useRef, useState} from "react";
import PhoneInput from "react-native-phone-number-input";
import ButtonInactive from "../buttons/ButtonInactive";
import {useDispatch, useSelector} from "react-redux";
import {addPhone} from "../../redux/action-creators/ProfileActionCreators";
import Spinner from "react-native-loading-spinner-overlay";

export default function PhoneScreen() {
    const [value, setValue] = useState("");
    const [formattedValue, setFormattedValue] = useState("");
    const phoneInput = useRef<PhoneInput>(null);
    const [spinner, setSpinner] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {

    }, []);

    return <View style={styles.container}>
        <View style={{flex: 9, alignItems: "center", justifyContent: "center"}}>
            <Spinner
                visible={spinner}
                textContent={'Авторизация...'}
                textStyle={{color: "white"}}
            />
            <Text style={loginHintsText}>Введи номер телефона</Text>

                <PhoneInput
                    ref={phoneInput}
                    defaultValue={value}
                    defaultCode="RU"
                    layout="first"
                    onChangeText={(text) => {
                        setValue(text);
                    }}
                    onChangeFormattedText={(text) => {
                        setFormattedValue(text);
                    }}
                    withDarkTheme
                    withShadow
                    autoFocus
                />
        </View>

        <View style={{flex: 1, width: "100%", alignItems: "center"}}>
            {phoneInput.current?.isValidNumber(value) ?
                <ButtonActive text={"Далее"} onClick={() => {
                    setSpinner(true)
                    console.log("Phone screen: got phone number: " + formattedValue)
                    // TODO: firebase request to handle response in component
                    // dispatch(addPhone(formattedValue))
                    setTimeout(() => {
                        setSpinner(false)
                    }, 1000)
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
})