import React from "react";
import { createStackNavigator, StackScreenProps } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginRoot from "./components/login/LoginRoot";

const commonOptions = {
    headerShown: false,
}

const loginOptions = {
    ...commonOptions,

}

const mainOptions = {
    ...commonOptions,

}

const characterOptions = {
    ...commonOptions,

}

const characterListOptions = {
    ...commonOptions,

}

type RootStackParamList = {
    Login: undefined,
}

const MainStack = createStackNavigator<RootStackParamList>()


export default function Navigate() {
    return <NavigationContainer>
        <MainStack.Navigator>
            <MainStack.Screen name="Login" component={LoginRoot} options={loginOptions}/>
        </MainStack.Navigator>
    </NavigationContainer>
}
