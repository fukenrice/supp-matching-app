import firestore from '@react-native-firebase/firestore';
import ProblemModel from "../models/ProblemModel";
import HobbyModel from "../models/HobbyModel";
import storage from '@react-native-firebase/storage';
import auth from "@react-native-firebase/auth";
import {RootState} from "../../redux/reducers/rootReducer";
import {ProfileData} from "../models/ProfileData";

export const getProblems = async () => {
    try {
        const doc = await firestore().collection("tags").doc("problems").get()
        const problems = doc.data() as {problems: ProblemModel[]}
        return problems.problems
    } catch (e) {
        console.log(e)
    }
}

export const getHobbies = async () => {
    try {
        const doc = await firestore().collection("tags").doc("hobbies").get()
        const hobbies = doc.data() as {hobbies: HobbyModel[]}
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

export const uploadUser = async (data: ProfileData)=> {
    try {
        const photoUrls = await uploadPhotos(data.photos)
        const {_stage: _,...dataStoringData} = data
        return await firestore()
            .collection('Profiles')
            .doc(auth().currentUser?.uid)
            .set({...dataStoringData, photos: photoUrls})
    } catch (e) {
        console.log(e)
    }

}
