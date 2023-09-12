import {KeyboardAvoidingView, StyleSheet, Text, View} from "react-native";
import {loginHintsText} from "../../styles";
import ButtonActive from "../buttons/ButtonActive";
import React, {useRef, useState} from "react";
import PhoneInput from "react-native-phone-number-input";
import ButtonInactive from "../buttons/ButtonInactive";

export default function PhoneScreen({authFun}: {authFun: (val: string) => void }) {
    const [value, setValue] = useState("");
    const [formattedValue, setFormattedValue] = useState("");
    const phoneInput = useRef<PhoneInput>(null);


    return <KeyboardAvoidingView style={styles.container} behavior={"padding"}>
        <View style={{flex: 9, alignItems: "center", justifyContent: "center"}}>
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
                    console.log("Phone screen: got phone number: " + formattedValue)
                    authFun(formattedValue)
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