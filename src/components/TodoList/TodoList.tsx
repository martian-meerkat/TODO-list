import { List } from '@mui/material';
import React, { FunctionComponent } from 'react';
import { useQuery } from "react-query";
import { ITodo, ITodos } from '../../interfaces/ITodo';
import { getTodos } from '../../services/todos.service';
import TodayItem from '../TodayItem/TodayItem';
import TodoItem from '../TodoItem/TodoItem';

import './TodoList.css';

const TodoList: FunctionComponent = (): JSX.Element => {
    const fetchTodos = async (): Promise<ITodo[]> => {
        const response = await getTodos();
        return response;
    }

    const { data, isSuccess } = useQuery("todo-list", fetchTodos)

    const getTodoList = () => {
        const todoList = new Array();
        const todosByDate = new Array();
        data.forEach((record: ITodo) => {
            let todoByDate = todosByDate.find((todo) => 
                Object.keys(todo).includes(record.date)
            );
            if (todoByDate) {
                todoByDate[record.date].push(record);
            } else {
                todosByDate.push({[record.date]: [record]});
            }
        })
        todosByDate.sort((a: ITodos, b: ITodos) => {
            return Date.parse(Object.keys(a)[0]) - Date.parse(Object.keys(b)[0]);
        });
        const today = new Date().toJSON();
        let date = today.slice(0, today.indexOf('T'));
        let index = todosByDate.findIndex((todo) => Object.keys(todo).includes(date));
        todoList.push(<TodayItem key={`todos-${date}`} date={date} todos={todosByDate[index][date]} />);
        for (index += 1; index < todosByDate.length; index++) {
            date = Object.keys(todosByDate[index]).find((key) => /^\d{4}-\d{2}-\d{2}.*$/.test(key)).slice(0, today.indexOf('T'));
            todoList.push(<TodoItem key={`todos-${date}`} date={date} todos={todosByDate[index][date]} />);
        }
        return todoList;
    }

    return (
        <List className={'todo-list'}>
            {isSuccess && data.length && getTodoList()}
        </List>
    );
}

export default TodoList;