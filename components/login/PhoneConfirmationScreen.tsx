import {StyleSheet, Text, View} from "react-native";
import ButtonActive from "../buttons/ButtonActive";
import ButtonInactive from "../buttons/ButtonInactive";
import React, {useEffect, useState} from "react";
import {loginHintsText} from "../../styles";
import {CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell} from "react-native-confirmation-code-field";
import Spinner from "react-native-loading-spinner-overlay";
import auth, {FirebaseAuthTypes} from "@react-native-firebase/auth";
import {confirmPhone} from "../../redux/action-creators/ProfileActionCreators";
import {useDispatch} from "react-redux";

export default function PhoneConfirmationScreen({confirmCode}: {confirmCode: (val: string) => void }) {

    const [code, setCode] = useState('');
    const ref = useBlurOnFulfill({value: code, cellCount: 6});
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value: code,
        setValue: setCode,
    });
    const [spinner, setSpinner] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        return auth().onAuthStateChanged(onAuthStateChanged)
    }, []);

    const onAuthStateChanged = (user: FirebaseAuthTypes.User | null) => {
        if (user) {
            console.log(user)
            dispatch(confirmPhone(""))
        }
    }

    const handleCode = async () => {
        setSpinner(true)
        await confirmCode(code)
        setSpinner(false)
    }

    return <View style={styles.container}>
        <Spinner
            visible={spinner}
            textContent={'Авторизация...'}
            textStyle={{color: "white"}}
        />
        <View style={{flex: 9, alignItems: "center", justifyContent: "center"}}>
            <Text style={loginHintsText}>Введи код{"\n"}из SMS-сообщения</Text>
            <CodeField
                ref={ref}
                {...props}
                value={code}
                onChangeText={setCode}
                cellCount={6}
                rootStyle={styles.codeFieldRoot}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                renderCell={({index, symbol, isFocused}) => (
                    <Text key={index} style={[styles.cell]}
                          onLayout={getCellOnLayoutHandler(index)}>{symbol || (isFocused ? <Cursor/> : null)}</Text>
                )}
            />
        </View>
        <View style={{flex: 1, width: "100%", alignItems: "center"}}>
            {code.length === 6 ?
                <ButtonActive text={"Далее"} onClick={() => {
                    handleCode()
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
    codeFieldRoot: {marginTop: 20},
    cell: {
        marginHorizontal: 8,
        width: 40,
        height: 40,
        lineHeight: 38,
        fontSize: 24,
        backgroundColor: "#e8e8e8",
        textAlign: 'center',
        borderRadius: 10
    },
})