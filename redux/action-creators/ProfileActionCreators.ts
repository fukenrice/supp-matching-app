import {
    AddBirthdayAction,
    AddDescAction,
    AddGenderAction,
    AddHobbiesAction,
    AddNameAction,
    AddPhoneAction,
    AddProblemsAction,
    ConfirmHobbiesAction,
    ConfirmPhoneAction,
    ConfirmProblemsAction,
    GoToPreviousAction,
    InitAction
} from "../actions/ProfileAction";
import {ProfileActionTypes} from "../action-types";
import ProblemModel from "../../models/ProblemModel";
import HobbyModel from "../../models/HobbyModel";

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
