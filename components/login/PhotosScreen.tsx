import {StyleSheet, Text, View} from "react-native";
import {loginHintsText} from "../../styles";
import ButtonActive from "../buttons/ButtonActive";
import React from "react";
import ButtonInactive from "../buttons/ButtonInactive";

export default function PhotosScreen() {

    return <View style={styles.container}>
        <View style={{flex: 9, alignItems: "center", justifyContent: "center"}}>
            <Text style={loginHintsText}></Text>

        </View>

        <View style={{flex: 1, width: "100%", alignItems: "center"}}>
            {true ?
                <ButtonActive text={"Далее"} onClick={() => {
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
