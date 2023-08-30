import {combineReducers} from "redux";
import {userProfileReducer} from "./userProfileReducer";

export const rootReducer = combineReducers( {userProfile: userProfileReducer} )

export type RootState = ReturnType<typeof rootReducer>
// TODO: Добавил редьюсер профиля. Завтра сделать авторизацию + заполнение профиля(с фото)