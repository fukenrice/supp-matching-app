import {StatusBar} from 'expo-status-bar';
import {Alert, StyleSheet, Text, View} from 'react-native';
import MainStack from "./Navigate"
import {Provider} from "react-redux";
import {store} from "./redux/store";
import {useEffect} from "react";
import messaging from "@react-native-firebase/messaging";


export default function App() {

    useEffect(() => {
        return messaging().onMessage(message => {
            Alert.alert(message.data?.title!, message.data?.body!)
        })
    }, []);

    return (
        <Provider store={store}>
            <MainStack/>
        </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
