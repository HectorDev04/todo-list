import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

const TodoForm = ({ fetchTodos }) => {
    const [task, setTask] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!task) return;

        try {
            await addDoc(collection(db, 'todos'), {
                task,
                completed: false,
            });
            setTask('');
            fetchTodos(); // Refresca la lista de tareas
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="Agregar nueva tarea"
            />
            <button type="submit">Agregar</button>
        </form>
    );
};

export default TodoForm;
