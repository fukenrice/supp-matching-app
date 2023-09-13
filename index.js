import { registerRootComponent } from 'expo';
import App from './App';
import {CometChat} from '@cometchat-pro/react-native-chat';
import Config from "react-native-config";
import {PermissionsAndroid} from 'react-native';

var appID = Config.COMETCHAT_APP_ID;
var region = Config.COMETCHAT_APP_REGION;

var appSetting = new CometChat.AppSettingsBuilder()
    .subscribePresenceForAllUsers()
    .setRegion(region)
    .build();

CometChat.init(appID, appSetting).then(
    () => {
        console.log('Initialization completed successfully');
    },
    (error) => {
        console.log('Initialization failed with error:', error);
    },
);


PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
