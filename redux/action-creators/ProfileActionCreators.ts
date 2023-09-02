import {
    AddBirthdayAction, AddGenderAction,
    AddNameAction,
    AddPhoneAction,
    ConfirmPhoneAction,
    GoToPreviousAction,
    InitAction
} from "../actions/ProfileAction";
import {ProfileActionTypes} from "../action-types";

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