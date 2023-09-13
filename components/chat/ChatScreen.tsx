import {StyleSheet, Text, View} from "react-native";
import React, {useEffect, useState} from "react";
import {PrivateChatProps} from "../../Navigate";
import {CometChat} from "@cometchat-pro/react-native-chat";
import {CometChatMessages} from '../cometchat-pro-react-native-ui-kit';
import {getFocusedRouteNameFromRoute, useIsFocused} from "@react-navigation/native";

export default function ChatScreen({navigation: navigation, route: route,}: PrivateChatProps) {
    const isFocused = useIsFocused();
    const [localUser, setLocalUser] = useState<CometChat.User | null>(null);
    const [userToChat, setUserToChat] = useState<CometChat.User | null>(null);
    useEffect(() => {
        const parent = navigation.getParent()
        parent?.setOptions({tabBarStyle: {display: "none"}})

        var user = CometChat.getLoggedinUser().then(
            user => {
                setLocalUser(user);
            },
            error => {
                console.log('error getting details:', {error});
            },
        );


        CometChat.getUser(route.params.companionUid.toLowerCase()).then(
            user => {
                setUserToChat(user);
            },
            error => {
                console.log('error getting user: ', {error});
            },
        );
    }, []);

    const actionGenerated = () => {
    };

    if (localUser && userToChat) {
        return (
            <View style={{flex: 1}}>
                <CometChatMessages
                    type={'user'}
                    item={userToChat}
                    firebaseUid={route.params.companionUid}
                    loggedInUser={localUser}
                    actionGenerated={actionGenerated}
                    audioCall={false}
                    videoCall={false}
                    navigation={navigation}
                />
            </View>
        );
    }

    return null;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        alignSelf: 'stretch',
        justifyContent: 'center',
    },

})
