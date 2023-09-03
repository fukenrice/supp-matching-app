import firestore from '@react-native-firebase/firestore';
import ProblemModel from "../../models/ProblemModel";
import HobbyModel from "../../models/HobbyModel";

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