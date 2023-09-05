import {
    AddAgeRangeAction,
    AddBirthdayAction,
    AddDescAction,
    AddGenderAction,
    AddHobbiesAction,
    AddInterestedGenderAction,
    AddNameAction,
    AddPhoneAction,
    AddPhotoAction,
    AddProblemsAction,
    ConfirmHobbiesAction,
    ConfirmPhoneAction,
    ConfirmPhotosAction,
    ConfirmProblemsAction,
    GoToPreviousAction,
    InitAction
} from "../actions/ProfileAction";
import {ProfileActionTypes} from "../action-types";
import ProblemModel from "../../data/models/ProblemModel";
import HobbyModel from "../../data/models/HobbyModel";
import {Genders} from "../../data/models/Genders";

export const init = (): InitAction => {
    return {type: ProfileActionTypes.INIT}
}

export const goToPrevious = (): GoToPreviousAction => {
    return {type: ProfileActionTypes.GO_TO_PREVIOUS}
}

export const addPhone = (phoneNumber: string): AddPhoneAction => {
    return {type: ProfileActionTypes.ADD_PHONE, payload: phoneNumber}
}

export const confirmPhone = (code: string): ConfirmPhoneAction => {
    return {type: ProfileActionTypes.CONFIRM_PHONE, payload: code}
}

export const addName = (name: string): AddNameAction => {
    return {type: ProfileActionTypes.ADD_NAME, payload: name}
}

export const addBirthday = (birthday: Date): AddBirthdayAction => {
    return {type: ProfileActionTypes.ADD_BIRTHDAY, payload: birthday}
}

export const addGender = (gender: string): AddGenderAction => {
    return {type: ProfileActionTypes.ADD_GENDER, payload: gender}
}

export const addProblems = (): AddProblemsAction => {
    return {type: ProfileActionTypes.ADD_PROBLEMS}
}

export const addHobbies = (): AddHobbiesAction => {
    return {type: ProfileActionTypes.ADD_HOBBIES}
}

export const confirmProblems = (problems: ProblemModel[]): ConfirmProblemsAction => {
    return {type: ProfileActionTypes.CONFIRM_PROBLEMS, payload: problems}
}

export const confirmHobbies = (hobbies: HobbyModel[]): ConfirmHobbiesAction => {
    return {type: ProfileActionTypes.CONFIRM_HOBBIES, payload: hobbies}
}

export const addDesc = (desc: string): AddDescAction => {
    return {type: ProfileActionTypes.ADD_DESC, payload: desc}
}

export const addPhoto = (uri: string, index?: number): AddPhotoAction => {
    return {type: ProfileActionTypes.ADD_PHOTO, payload: {uri: uri, index: index}}
}

export const confirmPhotos = (): ConfirmPhotosAction => {
    return {type: ProfileActionTypes.CONFIRM_PHOTOS}
}

export const addInterestedGender = (gender: Genders): AddInterestedGenderAction => {
    return {type: ProfileActionTypes.ADD_INTERESTED_GENDER, payload: gender}
}

export const addAgeRange = (min: number, max: number): AddAgeRangeAction => {
    return {type: ProfileActionTypes.ADD_AGE_RANGE, payload: {lowerEdge: min, higherEdge: max}}
}