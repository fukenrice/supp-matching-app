import firestore from '@react-native-firebase/firestore';
import ProblemModel from "../models/ProblemModel";
import HobbyModel from "../models/HobbyModel";
import storage from '@react-native-firebase/storage';
import auth from "@react-native-firebase/auth";
import {ProfileData} from "../models/ProfileData";
import {Genders} from "../models/Genders";
import moment from "moment";
import config from "../../config";
import axios from "axios";
import Config from "react-native-config";
import messaging from '@react-native-firebase/messaging';

export const getProblems = async () => {
    try {
        const doc = await firestore().collection("tags").doc("problems").get()
        if (doc.exists) {
            const problems = doc.data() as {
                problems: ProblemModel[]
            }
            return problems.problems
        } else {
            return []
        }
    } catch (e) {
        console.log(e)
        return []
    }
}

export const getHobbies = async () => {
    try {
        const doc = await firestore().collection("tags").doc("hobbies").get()
        if (doc.exists) {
            const hobbies = doc.data() as {
                hobbies: HobbyModel[]
            }
            return hobbies.hobbies
        } else {
            return []
        }
    } catch (e) {
        console.log(e)
        return []
    }
}

export const uploadPhotos = async (photos: string[]) => {
    try {
        const names = photos.map(v => v.split('/').at(-1)) as string[]
        const ref = names.map(v => storage().ref(`photos/${auth().currentUser?.uid}/${v}`))
        await Promise.all(ref.map((v, index) => v.putFile(photos[index])))
        return await Promise.all(ref.map(v => v.getDownloadURL()))
    } catch (e) {
        console.log(e)
    }
}

export const uploadUser = async (data: ProfileData, photoUrls: string[]) => {
    try {
        const {_stage: _, ...dataStoringData} = data
        console.log("userData: " + auth().currentUser?.uid)
        await firestore()
            .collection('Profiles')
            .doc(auth().currentUser?.uid)
            .set({...dataStoringData, photos: photoUrls, uid: auth().currentUser?.uid})
        return true
    } catch (e) {
        console.log("uploadUser: " + e)
        return false
    }
}

export const registerMessagingUser = async () => {
    try {
        const url = config.BASE_URL + "/register"
        const data = {
            name: "",
            fcmToken: await messaging().getToken(),
            uid: auth().currentUser?.uid
        }
        const header = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        await axios.post(url, data, header)
        return true
    } catch (e) {
        console.log("registerMessaging: " + e)
        return false
    }
}

export const sendNotification = async (name: string, uid: string) => {
    try {
        const url = config.BASE_URL + "/send-message"
        const data = {
            uid: uid,
            messageContent: `У вас взаимная симпатия с пользователем ${name}, во вкладке с диалогами у вас появился соответствующий диалог. Удачного общения!`,
            messageTitle: "Мэтч!"
        }
        const header = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        await axios.post(url, data, header)
    } catch (e) {
        console.log("sendNotification: " + e)
    }
}

export const createChatUser = async (name: string, photo: string) => {
    const url = `https://${Config.COMETCHAT_APP_ID}.api-eu.cometchat.io/v3/users`
    const body = {
        uid: auth().currentUser?.uid,
        name: name,
        avatar: photo,
        metadata: {
            firebase_doc_uid: auth().currentUser?.uid,
        }
    }
    const headers = {
        headers: {
            'Content-type':
                "application/json",
            Accept:
                "application/json",
            appId:
            Config.COMETCHAT_APP_ID,
            apiKey:
            Config.COMETCHAT_API_KEY,
            region:
            Config.COMETCHAT_APP_REGION
        }
    }
    console.log("headers: "+ headers.headers)
    console.log("url: " + url)
    try {
        await axios.post(url, body, headers)
        return true
    } catch (e) {
        console.log("createChatUser: " + e)
        return false
    }
}

export const profileExists = async (uid: string) => {
    const url = `https://${Config.COMETCHAT_APP_ID}.api-eu.cometchat.io/v3/users/${uid}`
    const headers = {
        headers: {
            apiKey:
            Config.COMETCHAT_API_KEY,
        }
    }
    try {
        const [response, doc] = await Promise.all([
            axios.get(url, headers),
            firestore().doc(`Profiles/${auth().currentUser?.uid}`).get()
        ])
        if (!doc.exists || response.status.toString()[0] !== "2") {
            return false
        }
        return true
    } catch (e) {
        console.log("Profile exists: " + e)
        return false
    }
}

export const getUserProfile = async (uid: string) => {
    try {
        const doc = await firestore().doc(`Profiles/${uid}`).get()
        if (doc.exists) {

            const data = {
                ...doc.data(),
                birthday: new Date(doc.data()!.birthday.seconds * 1000 + doc.data()!.birthday.nanoseconds / 1000000)
            } as ProfileData
            return data
        }
    } catch
        (e) {
        console.log("getUserProfile: " + e)
    }
}

export const getProfiles = async () => {
    try {
        const profile = await getUserProfile(auth().currentUser?.uid!)
        if (profile) {
            const minDate = moment().add(1, "day").subtract(profile.lowerAge, 'years').toDate()
            const maxDate = moment().subtract(profile.higherAge, 'years').toDate()
            const doc = await firestore().collection("Profiles")
                .where(
                    "uid", '!=', auth().currentUser?.uid
                )
                .get()


            if (!doc.empty) {
                const data = doc.docs.map(value => {
                    return {
                        ...value.data(),
                        birthday: new Date(value.data().birthday.seconds * 1000 + value.data().birthday.nanoseconds / 1000000)
                    } as ProfileData
                })
                var filtered: ProfileData[]
                if (profile.interestedGender === Genders.DOES_NOT_MATTER) {
                    filtered = data.filter(v =>
                        v.birthday! <= minDate
                        && v.birthday! >= maxDate
                        && v.problems.some(r => profile.problems.some(v => v.problemName === r.problemName))
                        && (v.interestedGender == profile.gender || v.interestedGender == Genders.DOES_NOT_MATTER)
                        && !profile.liked?.includes(v.uid!)
                    )
                } else {
                    filtered = data.filter(v =>
                        v.birthday! <= minDate &&
                        v.birthday! >= maxDate &&
                        v.problems.some(r => profile.problems.some(v => v.problemName === r.problemName)) &&
                        v.gender === profile.interestedGender &&
                        (v.interestedGender === profile.gender || v.interestedGender === Genders.DOES_NOT_MATTER) &&
                        !profile.liked?.includes(v.uid!)
                    )
                }
                return filtered
            } else {
                return []
            }
        } else {
            return []
        }
    } catch (e) {
        console.log("getProfiles: " + e)
        return []
    }
}

export const addLiked = async (uid: string) => {
    try {
        const result = await firestore().doc(`Profiles/${auth().currentUser?.uid}`).update({liked: firestore.FieldValue.arrayUnion(uid)})
    } catch (e) {
        console.log(e)
    }
}

export const addChat = async (likerUid: string, likerName: string, likerPhoto: string, likedUid: string, likedName: string, likedPhoto: string) => {
    try {
        const collection = firestore().collection("chats")
        await Promise.all([collection.add({
            user_A_id: likerUid,
            user_A_name: likerName,
            user_B_id: likedUid,
            user_B_name: likedName,
            user_B_photo: likedPhoto
        }), collection.add({
            user_A_id: likedUid,
            user_A_name: likedName,
            user_B_id: likerUid,
            user_B_name: likerName,
            user_B_photo: likerPhoto
        })])
    } catch (e) {
        console.log(e)
    }
}

export const getChats = async () => {
    try {
        const chatsCollection = await firestore().collection('chats')
            .where('user_A_id', '==', auth().currentUser?.uid)
            .get();

        if (!chatsCollection.empty) {
            return chatsCollection.docs.map(doc => {
                return {
                    uid: doc.data().user_B_id as string,
                    name: doc.data().user_B_name as string,
                    photo: doc.data().user_B_photo as string
                }
            })
        } else {
            return []
        }
    } catch (e) {
        console.log(e)
        return []
    }
}
