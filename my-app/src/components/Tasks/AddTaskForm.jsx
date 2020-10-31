import React, { useState } from 'react';
import axios from 'axios';

import addSvg from '../../assets/img/add.svg';

export function AddTaskForm({ list, onAddTask }) {

    const [visibleForm, setVisibleForm] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const toggleFormVisible = () => {
        setVisibleForm(!visibleForm);
        setInputValue('');
    }

    const addTask = () => {
        const obj = {
            "listId": list.id,
            "text": inputValue,
            "completed": false
        }
        axios.post('http://localhost:3001/tasks', obj).then(({ data }) => {

            onAddTask(list.id, data)
            toggleFormVisible();
        })
    }

    return (
        <div className="tasks_form">
            {!visibleForm ?
            (<div className="tasks_form-new" onClick={toggleFormVisible}>
                <img src={addSvg} alt="" />
                <span>Новая задача</span>
            </div>) :
            (<div className="tasks_form-open">
                <input value={inputValue} className="field" type="text" placeholder="Текст задачи" onChange={event => setInputValue(event.target.value)} />
                <button className="button" onClick={addTask}>Добавить задачу</button>
                <button className="button button-grey" onClick={toggleFormVisible} >Отмена</button>
            </div>)}

        </div>
    );
}
