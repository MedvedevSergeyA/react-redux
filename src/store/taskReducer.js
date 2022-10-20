import {taskDeleted, taskUpdated} from "./actionTypes";

export function taskReducer(state = [], action) {
    switch (action.type) {
        case taskUpdated : {
            const newArr = [...state]
            const elementIndex = newArr.findIndex(el => el.id === action.payload.id)
            console.log( newArr[elementIndex])
            newArr[elementIndex] = {...newArr[elementIndex], ...action.payload}
            return newArr

        }
        case taskDeleted : {
            return state.filter(el=> el.id !== action.payload.id)
        }
        default:
            return state
    }
}