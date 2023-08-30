import {ProfileActionTypes} from "../action-types";
import ProblemModel from "../../models/ProblemModel";
import HobbyModel from "../../models/HobbyModel";

interface AddPhoneAction {
    type: ProfileActionTypes.ADD_PHONE,
    payload: string
}

interface ConfirmPhoneAction {
    type: ProfileActionTypes.CONFIRM_PHONE,
    payload: number
}

interface AddNameAction {
    type: ProfileActionTypes.ADD_NAME,
    payload: string
}

interface AddBirthdayAction {
    type: ProfileActionTypes.ADD_BIRTHDAY,
    payload: string
}

interface AddGenderAction {
    type: ProfileActionTypes.ADD_GENDER,
    payload: string
}

interface AddProblemAction {
    type: ProfileActionTypes.ADD_PROBLEM,
    payload: ProblemModel
}

interface ConfirmProblemsAction {
    type: ProfileActionTypes.CONFIRM_PROBLEMS
}

interface AddHobbyAction {
    type: ProfileActionTypes.ADD_HOBBY,
    payload: HobbyModel
}

interface ConfirmHobbiesAction{
    type: ProfileActionTypes.CONFIRM_HOBBIES
}

interface AddDescAction {
    type: ProfileActionTypes.ADD_DESC,
    payload: string
}

interface AddPhotoAction {
    type: ProfileActionTypes.ADD_PHOTO,
    payload: string
}

interface ConfirmPhotosAction {
    type: ProfileActionTypes.CONFIRM_PHOTOS
}

interface AddInterestedGenderAction {
    type: ProfileActionTypes.ADD_INTERESTED_GENDER,
    payload: string
}

interface AddLowerAgeAction {
    type: ProfileActionTypes.ADD_LOWER_AGE_EDGE,
    payload: number
}

interface AddHigherAgeAction {
    type: ProfileActionTypes.ADD_HIGHER_AGE_EDGE,
    payload: number
}


export type ProfileAction =
    AddPhoneAction
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