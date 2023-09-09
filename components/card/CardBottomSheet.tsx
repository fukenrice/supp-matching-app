import ProblemModel from "../../data/models/ProblemModel";
import HobbyModel from "../../data/models/HobbyModel";
import {ViewStyle, StyleSheet, View, Text, ScrollView} from "react-native";
import {calculateAge} from "../../utils/calculateAge";
import React from "react";
import BulletList from "../utils/BulletList";

export default function CardBottomSheet({name, desc, birthday, hobbies, problems, style}: {
    name: string,
    birthday: number,
    problems: ProblemModel[],
    hobbies: HobbyModel[],
    desc: string,
    style?: ViewStyle
})  {
    return <ScrollView contentContainerStyle={styles.container} style={{}}>

        <View style={styles.headerContainer}>
            <Text style={{fontWeight: "700", fontSize: 25, color: "#424242"}}>{name}, </Text>
            <Text style={{fontWeight: "600", fontSize: 20, color: "#424242"}}>{birthday}</Text>
        </View>
        <View style={{marginBottom: 10}}>
            <BulletList data={problems} bulletContainerStyle={styles.bulletStyle} textStyle={{color: "black"}}/>
        </View>
        <Text style={{fontWeight: "400", fontSize: 20, color: "#989898", marginBottom: 10}}>О себе</Text>
        <Text style={{fontWeight: "400", fontSize: 15, color: "#424242", marginBottom: 10}}>{desc}</Text>
        <Text style={{fontWeight: "400", fontSize: 20, color: "#989898", marginBottom: 10}}>Увлечения</Text>
        <BulletList data={hobbies} bulletContainerStyle={styles.bulletStyle} textStyle={{color: "black"}}/>
    </ScrollView>
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-start',
        alignSelf: 'stretch',
        paddingHorizontal: 20
    },
    headerContainer: {
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "flex-end",
        marginBottom: 10
    },
    bulletStyle: {
        borderWidth: 1,
        backgroundColor: "#eaeaea",
        borderColor: "#D8D8D8",
    }
})