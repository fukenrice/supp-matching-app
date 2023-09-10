import {FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import React, {useEffect, useState} from "react";
import {SvgXml} from "react-native-svg";
import {mainTabIcon} from "../../assets/mainTabIcon";
import {useIsFocused, useNavigation} from "@react-navigation/native";
import {getChats} from "../../data/repo/repo";
import {loginHintsText} from "../../styles";
import {Ionicons} from "@expo/vector-icons";
import {ChatListProps, PrivateChatProps} from "../../Navigate";
import {StackNavigationProp} from "@react-navigation/stack";

export default function ChatListScreen({navigation: navigation, }: ChatListProps) {
    const isFocused = useIsFocused();
    const [chats, setChats] = useState<{ uid: string, name: string, photo: string }[]>([])
    const [displayedChats, setDisplayedChats] = useState<{ uid: string, name: string, photo: string }[]>([])
    const nav = useNavigation<any>()


    const fetchChats = async () => {
        const chats = await getChats()
        setChats(chats!)
        setDisplayedChats(chats!)
    }

    useEffect(() => {
        if (isFocused) {
            const parent = navigation.getParent()
            parent?.setOptions({tabBarStyle: {display: "flex"}})
            fetchChats()
        }
    }, [isFocused]);


    return <View style={styles.container}>
        <Text style={loginHintsText}>
            Сообщения
        </Text>
        <View style={styles.searchContainer}>
            <Ionicons name="search" style={{marginRight: 5}} size={20} color="grey"/>
            <TextInput placeholder={"Поиск..."} style={{width: "100%"}} onChangeText={(text) => {
                setDisplayedChats(prevState => {
                    return chats.filter(v => v.name.includes(text))
                })
            }}/>
        </View>
        <FlatList data={displayedChats} renderItem={(item) => {
            return <TouchableOpacity style={styles.chatContainer} onPress={() => nav.navigate("PrivateChat", {
                companionUid: item.item.uid,
                companionName: item.item.name,
                companionPhoto: item.item.photo
            })}>
                <Image source={{uri: item.item.photo}} style={{borderRadius: 100, aspectRatio: 1, width: 60}}/>
                <View style={{marginLeft: 20}}>
                    <Text style={{fontWeight: "bold", fontSize: 20}}>{item.item.name}</Text>
                    <Text style={{color: "grey"}}>last message placeholder..</Text>
                </View>
            </TouchableOpacity>
        }}/>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-start',
        alignSelf: 'stretch',
        padding: 20
    },
    chatContainer: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        height: "100%",
    },
    searchContainer: {
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
