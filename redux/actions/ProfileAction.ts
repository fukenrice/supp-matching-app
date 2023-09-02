import {ProfileActionTypes} from "../action-types";
import ProblemModel from "../../models/ProblemModel";
import HobbyModel from "../../models/HobbyModel";

export interface InitAction {
    type: ProfileActionTypes.INIT,
}

export interface GoToPreviousAction {
    type: ProfileActionTypes.GO_TO_PREVIOUS
}

export interface AddPhoneAction {
    type: ProfileActionTypes.ADD_PHONE,
    payload: string
}

export interface ConfirmPhoneAction {
    type: ProfileActionTypes.CONFIRM_PHONE,
    payload: string
}

export interface AddNameAction {
    type: ProfileActionTypes.ADD_NAME,
    payload: string
}

export interface AddBirthdayAction {
    type: ProfileActionTypes.ADD_BIRTHDAY,
    payload: Date
}

export interface AddGenderAction {
    type: ProfileActionTypes.ADD_GENDER,
    payload: string
}

export interface AddProblemAction {
    type: ProfileActionTypes.ADD_PROBLEM,
    payload: ProblemModel
}

export interface ConfirmProblemsAction {
    type: ProfileActionTypes.CONFIRM_PROBLEMS
}

export interface AddHobbyAction {
    type: ProfileActionTypes.ADD_HOBBY,
    payload: HobbyModel
}

export interface ConfirmHobbiesAction{
    type: ProfileActionTypes.CONFIRM_HOBBIES
}

export interface AddDescAction {
    type: ProfileActionTypes.ADD_DESC,
    payload: string
}

export interface AddPhotoAction {
    type: ProfileActionTypes.ADD_PHOTO,
    payload: string
}

export interface ConfirmPhotosAction {
    type: ProfileActionTypes.CONFIRM_PHOTOS
}

export interface AddInterestedGenderAction {
    type: ProfileActionTypes.ADD_INTERESTED_GENDER,
    payload: string
}

export interface AddLowerAgeAction {
    type: ProfileActionTypes.ADD_LOWER_AGE_EDGE,
    payload: number
}

export interface AddHigherAgeAction {
    type: ProfileActionTypes.ADD_HIGHER_AGE_EDGE,
    payload: number
}


export type ProfileAction =
    InitAction
    | GoToPreviousAction
    | AddPhoneAction
    | ConfirmPhoneAction
    | AddNameAction
    | AddBirthdayAction
    | AddGenderAction
    | AddProblemAction
    | ConfirmProblemsAction
    | AddHobbyAction
    | ConfirmHobbiesAction
    | AddDescAction
    | AddPhotoAction
    | ConfirmPhotosAction
    | AddInterestedGenderAction
    | AddLowerAgeAction
    | AddHigherAgeAction