import React from "react";
import {StyleSheet, TextStyle, ViewStyle} from "react-native";

export const button: ViewStyle = {
    borderRadius: 100,
    alignItems: "center",
    width: "80%",
    padding: 7
}

export const buttonText: TextStyle = {
    fontSize: 15,
}

export const styles = StyleSheet.create({
    buttonActiveContainer: {
        ...button,
        backgroundColor: "#363636"
    },
    buttonInactiveContainer: {
        ...button,
        backgroundColor: "#CFCFCF"
    },
    buttonActiveText: {
        ...buttonText,
        color: "white"
    },
    buttonInactiveText: {
        ...buttonText,
        color: "#5C5C5C"
    }
})