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

export const getProblems = async () => {
    try {
        const doc = await firestore().collection("tags").doc("problems").get()
        const problems = doc.data() as {
            problems: ProblemModel[]
        }
        return problems.problems
    } catch (e) {
        console.log(e)
    }
}

export const getHobbies = async () => {
    try {
        const doc = await firestore().collection("tags").doc("hobbies").get()
        const hobbies = doc.data() as {
            hobbies: HobbyModel[]
        }
        return hobbies.hobbies
    } catch (e) {
        console.log(e)
    }
}

export const uploadPhotos = async (photos: string[]) => {
    try {
        const names = photos.map(v => v.split('/').at(-1)) as string[]
        const ref = names.map(v => storage().ref(`photos/${auth().currentUser?.uid}/${v}`))
        storage().ref('');

        await Promise.all(ref.map((v, index) => v.putFile(photos[index])))
        return await Promise.all(ref.map(v => v.getDownloadURL()))
    } catch (e) {
        console.log(e)
    }
}

export const uploadUser = async (data: ProfileData) => {
    try {
        const photoUrls = await uploadPhotos(data.photos)
        const {_stage: _, ...dataStoringData} = data
        return await firestore()
            .collection('Profiles')
            .doc(auth().currentUser?.uid)
            // .doc("a")
            .set({...dataStoringData, photos: photoUrls, uid: auth().currentUser?.uid})
    } catch (e) {
        console.log(e)
    }
}

export const createChatUser = async (name: string) => {
    try {
        await axios.post(`${config.BASE_URL}/create-user`, {
            uid: auth().currentUser?.uid,
            firebase_doc_uid: auth().currentUser?.uid,
            name,
        });
    } catch (e) {
        console.log(e)
    }

}

export const getUserProfile = async () => {
    try {
        const doc = await firestore().doc(`Profiles/${auth().currentUser?.uid}`).get()
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
        const profile = await getUserProfile()
        if (profile) {
            const minDate = moment().add(1, "day").subtract(profile.lowerAge, 'years').toDate()
            const maxDate = moment().subtract(profile.higherAge, 'years').toDate()
            const doc = await firestore().collection("Profiles")
                .where(
                    "uid", '!=', auth().currentUser?.uid
                    // firestore.Filter("birthday", "<=", minDate),
                    // firestore.Filter("birthday", ">=", maxDate),
                    // firestore.Filter("problems", "array-contains-any", profile.problems),
                    // firestore.Filter.or(
                    //     firestore.Filter("interestedGender", "==", profile.gender),
                    //     firestore.Filter("interestedGender", "==", Genders.DOES_NOT_MATTER)
                    // )
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
                    // firestore.Filter("birthday", "<=", minDate),
                    // firestore.Filter("birthday", ">=", maxDate),
                    // firestore.Filter("problems", "array-contains-any", profile.problems),
                    // firestore.Filter.or(
                    //     firestore.Filter("interestedGender", "==", profile.gender),
                    //     firestore.Filter("interestedGender", "==", Genders.DOES_NOT_MATTER)

                    filtered = data.filter(v =>
                        v.birthday! <= minDate
                        && v.birthday! >= maxDate
                        // && v.problems.some(r=> profile.problems.includes(r))
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
            }
        }
    } catch (e) {
        console.log("getProfiles: " + e)
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
        await collection.add({
            user_A_id: likerUid,
            user_A_name: likerName,
            user_B_id: likedUid,
            user_B_name: likedName,
            user_B_photo: likedPhoto
        })

        await collection.add({
            user_A_id: likedUid,
            user_A_name: likedName,
            user_B_id: likerUid,
            user_B_name: likerName,
            user_B_photo: likerPhoto
        })
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
        }
    } catch (e) {
        console.log(e)
    }
}
