import {createAction, createSlice} from "@reduxjs/toolkit";
import todosService from "../services/todos.service";
import {setError} from "./errors";

const initialState = {entities: [], isLoading: true}



const taskSlice = createSlice({name: "task", initialState, reducers: {
    recived(state, action) {
        state.entities = action.payload
        state.isLoading = false
    },
    upDate(state, action) {
        const elementIndex = state.entities.findIndex(
            (el) => el.id === action.payload.id
        );
        state.entities[elementIndex] = {
            ...state.entities[elementIndex],
            ...action.payload
        }
    },
        create(state, action) {
            state.entities.push({title: action.payload.title, completed: action.payload.completed})
        },
        remove(state, action) {
            state.entities = state.entities.filter(
                (el) => el.id !== action.payload.id
            );
        },
        taskRequested(state) {
            state.isLoading = true
        },
        taskRequestFailed (state, action) {
            state.isLoading = false
        }
}})



const  {actions, reducer: taskReducer} = taskSlice
const  {upDate, remove, recived, taskRequested, taskRequestFailed, create} = actions






export const loadTasks = () => async (dispatch) =>  {
    dispatch(taskRequested())
    try {
        const data = await todosService.fetch()
        dispatch(recived(data))
    } catch (error) {
        dispatch(taskRequestFailed())
        dispatch(setError(error.message))
    }
}

export const completedTask= (id) => (dispatch, getState) => {
    dispatch(upDate({id: id, completed: true}))
}


export function titleChanged (id) {
    return upDate({id: id, title: `New title for ${id}`})
}
export const createTask = () => async (dispatch) => {
    try {
        const data = await todosService.create()
        dispatch(create(data))
    } catch (error) {
        dispatch(taskRequestFailed())
        dispatch(setError(error.message))
    }
}

export function taskDeleted (id) {
    return remove({id})
}

export const getTasks = () => (state) => state.tasks.entities
export const getTasksLoadingStatus = () => (state) => state.tasks.isLoading

export default taskReducer