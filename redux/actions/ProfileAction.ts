import {ProfileActionTypes} from "../action-types";
import ProblemModel from "../../data/models/ProblemModel";
import HobbyModel from "../../data/models/HobbyModel";
import {Genders} from "../../data/models/Genders";

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

export interface FillInfoAction {
    type: ProfileActionTypes.FILL_INFO
}

export interface AddProblemsAction {
    type: ProfileActionTypes.ADD_PROBLEMS
}

export interface ConfirmProblemsAction {
    type: ProfileActionTypes.CONFIRM_PROBLEMS,
    payload: ProblemModel[]
}

export interface AddHobbiesAction {
    type: ProfileActionTypes.ADD_HOBBIES
}

export interface ConfirmHobbiesAction{
    type: ProfileActionTypes.CONFIRM_HOBBIES,
    payload: HobbyModel[]
}

export interface AddDescAction {
    type: ProfileActionTypes.ADD_DESC,
    payload: string
}

export interface AddPhotoAction {
    type: ProfileActionTypes.ADD_PHOTO,
    payload: {uri: string, index?: number}
}

export interface ConfirmPhotosAction {
    type: ProfileActionTypes.CONFIRM_PHOTOS
}

export interface AddInterestedGenderAction {
    type: ProfileActionTypes.ADD_INTERESTED_GENDER,
    payload: Genders
}

export interface AddAgeRangeAction {
    type: ProfileActionTypes.ADD_AGE_RANGE,
    payload: {lowerEdge: number, higherEdge: number}
}

export interface FinishAction {
    type: ProfileActionTypes.FINISH
}



export type ProfileAction =
    InitAction
    | GoToPreviousAction
    | AddPhoneAction
    | ConfirmPhoneAction
    | AddNameAction
    | AddBirthdayAction
    | AddGenderAction
    | FillInfoAction
    | AddProblemsAction
    | ConfirmProblemsAction
    | AddHobbiesAction
    | ConfirmHobbiesAction
    | AddDescAction
    | AddPhotoAction
    | ConfirmPhotosAction
    | AddInterestedGenderAction
    | AddAgeRangeAction
    | FinishAction