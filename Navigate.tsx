import React from "react";
import { createStackNavigator, StackScreenProps } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginRoot from "./components/login/LoginRoot";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import MatchingScreen from "./components/main/MatchingScreen";
import ChatListScreen from "./components/chat/ChatListScreen";
import ChatScreen from "./components/chat/ChatScreen";
import {SvgXml} from "react-native-svg";
import {mainTabIcon} from "./assets/mainTabIcon";
import {chatIcon} from "./assets/chatIcon";

const commonOptions = {
    headerShown: false,
}

const loginOptions = {
    ...commonOptions,

}

const mainOptions = {
    ...commonOptions,

}

const chatOptions = {
    ...commonOptions,
    tabBarIcon: ({ focused }: {focused: boolean}) => {
        const color = focused ? "black" : "grey"
        return <SvgXml xml={chatIcon} stroke={color} fill={color}/>;
    },
    tabBarLabel: "Сообщения"
}

const privateChatOptions = {
    ...commonOptions,
}



const matchesOptions = {
    ...commonOptions,
    tabBarIcon: ({ focused }: {focused: boolean}) => {
        const color = focused ? "black" : "grey"
        return <SvgXml xml={mainTabIcon} stroke={color}/>;
    },
    tabBarLabel: "Подборка"

}

type RootStackParamList = {
    Login: undefined,
    Main: undefined
}

const ChatStack = createStackNavigator()

const ChatStackNavigator = () => {
    return <ChatStack.Navigator>
        <ChatStack.Screen name={"ChatList"} component={ChatListScreen} options={chatOptions}/>
        <ChatStack.Screen name={"PrivateChat"} component={ChatScreen} options={privateChatOptions}/>
    </ChatStack.Navigator>
}

const Tab = createBottomTabNavigator()

const TabsNavigator = () => {
    return <Tab.Navigator screenOptions={{
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "grey",
        tabBarStyle: {
            height: "8%",
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15
        }
    }}>
        <Tab.Screen name={"Matches"} component={MatchingScreen} options={{...matchesOptions}}/>
        <Tab.Screen name={"Chat"} component={ChatStackNavigator} options={chatOptions}/>

    </Tab.Navigator>
}

const MainStack = createStackNavigator<RootStackParamList>()


export default function Navigate() {
    return <NavigationContainer>
        <MainStack.Navigator>
            <MainStack.Screen name="Login" component={LoginRoot} options={loginOptions}/>
            <MainStack.Screen name="Main" component={TabsNavigator} options={mainOptions}/>
        </MainStack.Navigator>
    </NavigationContainer>
}
