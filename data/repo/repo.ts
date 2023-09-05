import firestore from '@react-native-firebase/firestore';
import ProblemModel from "../../models/ProblemModel";
import HobbyModel from "../../models/HobbyModel";
import storage from '@react-native-firebase/storage';
import auth from "@react-native-firebase/auth";

export const getProblems = async () => {
    const doc = await firestore().collection("tags").doc("problems").get()
    const problems = doc.data() as {problems: ProblemModel[]}
    return problems.problems
}

export const getHobbies = async () => {
    const doc = await firestore().collection("tags").doc("hobbies").get()
    const hobbies = doc.data() as {hobbies: HobbyModel[]}
    return hobbies.hobbies
}

export const uploadPhotos = async (photos: string[]) => {
    const names = photos.map(v => v.split('/').at(-1)) as string[]
    const ref = names.map(v => storage().ref(`photos/${auth().currentUser?.uid}/${v}`))
        storage().ref('');

    await Promise.all(ref.map((v, index) => v.putFile(photos[index])))
    return await Promise.all(ref.map(v => v.getDownloadURL()))
}