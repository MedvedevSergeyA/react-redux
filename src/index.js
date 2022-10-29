import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom/client';
import {
    titleChanged,
    taskDeleted,
    completedTask,
    getTasks,
    loadTasks,
    getTasksLoadingStatus,
    createTask
} from "./store/task"
import configureStore from "./store/store";
import {Provider, useSelector, useDispatch} from "react-redux";
import {getError} from "./store/errors";


const store = configureStore()

const App = (params) => {
    const state = useSelector(getTasks())
    const loading = useSelector(getTasksLoadingStatus())
    const error = useSelector(getError())
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadTasks())
    },[])

    const changeTitle = (taskId) => {
        dispatch(titleChanged(taskId))
    }
    const deleteTask = (taskId) => {
        dispatch(taskDeleted(taskId))
    }
    const addTask = (task) => {
        dispatch(createTask(task))
    }
    if(loading) {
        return <h1>Loading...</h1>
    }
    if(error) {
        return <p>{error}</p>
    }
    return (<>
            <h1>App</h1>
            <ul>
                {state.map(el =>
                    <li key={el.id}>
                        <p>{el.title}</p>
                        <p>{`Completed: ${el.completed}`}</p>
                        <button onClick={() => dispatch(completedTask(el.id))}>Complete</button>
                        <button onClick={() => changeTitle(el.id)}>ChangeTitle</button>
                        <button onClick={() => deleteTask(el.id)}>DeleteTask</button>
                        <hr/>
                    </li>
                )}
                <button onClick={() => addTask({id: 10, title: "новая задача", completed: false})}>Create</button>
            </ul>
        </>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
        <App/>
        </Provider>
    </React.StrictMode>
)
