import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import TodoForm from './TodoForm';
import '../styles/TodoList.css';

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [editTaskId, setEditTaskId] = useState(null);
    const [editTaskValue, setEditTaskValue] = useState("");

    const fetchTodos = async () => {
        const todosCollection = collection(db, 'todos');
        const todosSnapshot = await getDocs(todosCollection);
        const todosList = todosSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));
        setTodos(todosList);
    };

    const toggleComplete = async (id, completed) => {
        const todoDoc = doc(db, 'todos', id);
        await updateDoc(todoDoc, { completed: !completed });
        fetchTodos();
    };

    const deleteTodo = async (id) => {
        const todoDoc = doc(db, 'todos', id);
        await deleteDoc(todoDoc);
        fetchTodos();
    };

    const startEdit = (todo) => {
        setEditTaskId(todo.id);
        setEditTaskValue(todo.task);
    };

    const saveEdit = async (e) => {
        e.preventDefault();
        if (editTaskValue.trim() === "") return;

        const todoDoc = doc(db, 'todos', editTaskId);
        await updateDoc(todoDoc, { task: editTaskValue });
        setEditTaskId(null);
        setEditTaskValue("");
        fetchTodos();
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    return (
        <div className="todo-container">
            <h1 className="title">Lista de Tareas</h1>
            <TodoForm fetchTodos={fetchTodos} />
            <ul className="todo-list">
                {todos.map(todo => (
                    <li key={todo.id} className="todo-item">
                        {editTaskId === todo.id ? (
                            <form onSubmit={saveEdit} className="edit-form">
                                <input
                                    type="text"
                                    value={editTaskValue}
                                    onChange={(e) => setEditTaskValue(e.target.value)}
                                    className="edit-input"
                                />
                                <button type="submit" className="save-btn">Guardar</button>
                                <button type="button" onClick={() => setEditTaskId(null)} className="cancel-btn">Cancelar</button>
                            </form>
                        ) : (
                            <div className="task-wrapper">
                                <span className={`task ${todo.completed ? 'completed' : ''}`}>
                                    {todo.task}
                                </span>
                                <div className="button-group">
                                    <button onClick={() => toggleComplete(todo.id, todo.completed)} className="toggle-btn">
                                        {todo.completed ? 'Desmarcar' : 'Completar'}
                                    </button>
                                    <button onClick={() => startEdit(todo)} className="edit-btn">Editar</button>
                                    <button onClick={() => deleteTodo(todo.id)} className="delete-btn">Eliminar</button>
                                </div>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;
