import React, {useEffect} from "react";
import {View, StyleSheet, Text, Image, TouchableOpacity, TextInput, Linking} from "react-native";
import {SvgXml} from "react-native-svg";
import {xml} from "../../assets/mainPic";
import {button, buttonText} from "../../styles";
import {useDispatch, useSelector} from "react-redux";
import {init} from "../../redux/action-creators/ProfileActionCreators";

export default function StartScreen() {
    const dispatch = useDispatch()

    return <View style={styles.container}>
        <View style={styles.mainPic}>
            <SvgXml xml={xml} height={"115%"}/>
        </View>

        <View style={styles.footer}>
            <TouchableOpacity style={
                {
                    ...button,
                    backgroundColor: "white",
                    margin: 15
                }
            }
            onPress={() => dispatch(init())}>
                <Text style={{...buttonText}}>Войти по номеру телефона</Text>
            </TouchableOpacity>
            <Text style={{
                color: "grey",
                alignItems: "center",
                width: "80%",
                textAlign: "center",
                fontSize: 10,
                marginBottom: 10
            }}>
                Продолжая, вы соглашаетесь с <Text
                style={{color: 'grey', textDecorationLine: "underline"}}
                onPress={() => {
                    Linking.openURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley')
                }}
            >
                Условиями использования
            </Text> и <Text
                style={{color: 'grey', textDecorationLine: "underline"}}
                onPress={() => {
                    Linking.openURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley')
                }}
            >
                Политикой конфиденциальности
            </Text>
            </Text>
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
    mainPic: {
        flex: 3,
    },
    footer: {
        flex: 1,
        width: "100%",
        backgroundColor: "#363636",
        alignItems: "center",
        justifyContent: 'space-between',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },

})