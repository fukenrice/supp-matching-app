import {ProfileActionTypes} from "../../redux/action-types";
import ProblemModel from "./ProblemModel";
import HobbyModel from "./HobbyModel";

export interface ProfileData {
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
    uid?: string,
    liked?: string[],
}