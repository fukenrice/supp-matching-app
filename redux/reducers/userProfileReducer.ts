import {ProfileAction} from "../actions/ProfileAction";
import ProblemModel from "../../models/ProblemModel";
import HobbyModel from "../../models/HobbyModel";
import {ProfileActionTypes} from "../action-types";
import {Reducer} from "redux";
import {EnumX} from "../../utils/IterableEnum";
import {getProblems} from "../../data/repo/repo";

interface ProfileData {
    _stage: ProfileActionTypes
    name: string,
    phone: string,
    birthday: Date | null,
    gender: string,
    problems: ProblemModel[],
    hobbies: HobbyModel[],
    desc: string,
    photos: string[],
    interestedGender: string,
    lowerAge: number,
    higherAge: number,
}

const INITIAL_STATE: ProfileData = {
    _stage: ProfileActionTypes.INIT,
    name: "",
    phone: "",
    birthday: null,
    gender: "",
    problems: [],
    hobbies: [],
    desc: "",
    photos: [],
    interestedGender: "",
    lowerAge: 18,
    higherAge: 99
}


export const userProfileReducer: Reducer<ProfileData, ProfileAction> = (state = INITIAL_STATE, action: ProfileAction): ProfileData => {
    switch (action.type) {
        case ProfileActionTypes.INIT:
            return {...state, _stage: ProfileActionTypes.ADD_PHONE}
        case ProfileActionTypes.GO_TO_PREVIOUS:
            if (state._stage === ProfileActionTypes.ADD_PROBLEMS ||
                state._stage === ProfileActionTypes.ADD_HOBBIES ||
                state._stage === ProfileActionTypes.ADD_PHOTO) {
                return {...state, _stage: ProfileActionTypes.FILL_INFO}
            }
            const stage = EnumX.of(ProfileActionTypes).prev(state._stage)
            if (stage === undefined) {
                return {...state}
            } else {
                return {...state, _stage: stage}
            }
        case ProfileActionTypes.ADD_PHONE:
            return {...state, phone: action.payload, _stage: ProfileActionTypes.CONFIRM_PHONE}
        case ProfileActionTypes.CONFIRM_PHONE:
            // TODO: Skip next steps, get profile data and go to stage "FINISH" if phone exists.
            return {...state, _stage: ProfileActionTypes.ADD_NAME}
        case ProfileActionTypes.ADD_NAME:
            return {...state, name: action.payload, _stage: ProfileActionTypes.ADD_BIRTHDAY}
        case ProfileActionTypes.ADD_BIRTHDAY:
            return {...state, birthday: action.payload, _stage: ProfileActionTypes.ADD_GENDER}
        case ProfileActionTypes.ADD_GENDER:
            return {...state, gender: action.payload, _stage: ProfileActionTypes.FILL_INFO}
        case ProfileActionTypes.FILL_INFO:
            return state
        case ProfileActionTypes.ADD_PROBLEMS:
            return {...state, _stage: ProfileActionTypes.ADD_PROBLEMS}
        case ProfileActionTypes.CONFIRM_PROBLEMS:
            return {...state, _stage: ProfileActionTypes.FILL_INFO, problems: action.payload}
        case ProfileActionTypes.ADD_HOBBIES:
            return {...state, _stage: ProfileActionTypes.ADD_HOBBIES}
        case ProfileActionTypes.CONFIRM_HOBBIES:
            return {...state, _stage: ProfileActionTypes.FILL_INFO, hobbies: action.payload}
        case ProfileActionTypes.ADD_DESC:
            return {...state, desc: action.payload, _stage: ProfileActionTypes.ADD_PHOTO}
        case ProfileActionTypes.ADD_PHOTO:
            const photos = [...state.photos]
            if (action.payload.index !== undefined) {
                photos[action.payload.index] = action.payload.uri
            } else {
                photos.push(action.payload.uri)
            }
            return {...state, photos: photos}
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
