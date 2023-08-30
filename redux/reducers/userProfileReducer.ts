import {ProfileAction} from "../actions/ProfileAction";
import ProblemModel from "../../models/ProblemModel";
import HobbyModel from "../../models/HobbyModel";
import {ProfileActionTypes} from "../action-types";
import {Reducer} from "redux";

interface ProfileData {
    _stage: "INIT" | ProfileActionTypes | "FILLED"
    name: string,
    phone: string,
    birthday: string,
    gender: string,
    problems: ProblemModel[],
    hobbies: HobbyModel[],
    desc: string,
    photos: string[],
    interestedGender: string,
    lowerAge: number,
    higherAge: number
}

const INITIAL_STATE: ProfileData =  {
    _stage: "INIT",
    name: "",
    phone: "",
    birthday: "",
    gender: "",
    problems: [],
    hobbies: [],
    desc: "",
    photos: [],
    interestedGender: "",
    lowerAge: 18,
    higherAge: 99
}


export const userProfileReducer: Reducer<ProfileData, ProfileAction> = (state= INITIAL_STATE, action: ProfileAction): ProfileData => {
    switch (action.type) {
        case ProfileActionTypes.ADD_PHONE:
            return {...state, phone: action.payload, _stage: ProfileActionTypes.CONFIRM_PHONE}
        case ProfileActionTypes.CONFIRM_PHONE:
            return {...state, _stage: ProfileActionTypes.ADD_NAME}
        case ProfileActionTypes.ADD_NAME:
            return {...state, name: action.payload, _stage: ProfileActionTypes.ADD_BIRTHDAY}
        case ProfileActionTypes.ADD_BIRTHDAY:
            return {...state, birthday: action.payload, _stage: ProfileActionTypes.ADD_GENDER}
        case ProfileActionTypes.ADD_GENDER:
            return {...state, gender: action.payload, _stage: ProfileActionTypes.ADD_PROBLEM}
        case ProfileActionTypes.ADD_PROBLEM:
            return {...state, problems: [...state.problems, action.payload]}
        case ProfileActionTypes.CONFIRM_PROBLEMS:
            return {...state, _stage: ProfileActionTypes.ADD_HOBBY}
        case ProfileActionTypes.ADD_HOBBY:
            return {...state, hobbies: [...state.hobbies, action.payload]}
        case ProfileActionTypes.CONFIRM_HOBBIES:
            return {...state,  _stage: ProfileActionTypes.ADD_DESC}
        case ProfileActionTypes.ADD_DESC:
            return {...state, desc: action.payload, _stage: ProfileActionTypes.ADD_PHOTO}
        case ProfileActionTypes.ADD_PHOTO:
            return {...state, photos: [...state.photos, action.payload]}
        case ProfileActionTypes.CONFIRM_PHOTOS:
            return {...state, _stage: ProfileActionTypes.ADD_INTERESTED_GENDER}
        case ProfileActionTypes.ADD_INTERESTED_GENDER:
            return {...state, interestedGender: action.payload, _stage: ProfileActionTypes.ADD_LOWER_AGE_EDGE}
        case ProfileActionTypes.ADD_LOWER_AGE_EDGE:
            return {...state, lowerAge: action.payload}
        case ProfileActionTypes.ADD_HIGHER_AGE_EDGE:
            return {...state, higherAge: action.payload}
        default:
            return state
    }
}
