import http from './http-common';
import { ITodo } from '../interfaces/ITodo';
import { AxiosResponse } from 'axios';
import { any } from 'prop-types';

export const getTodos = (): Promise<ITodo[]> => {
    return http.get('/todo-list').then(response => response.data.todos);
};

export const requestCompleted = (id: number, completed: boolean): Promise<AxiosResponse> => {
    const body = {
        id,
        completed
    };
    return http.patch('/todo-list', body);
};

export const requestNews = (): Promise<any> => {
    return fetch('https://newsapi.org/v2/top-headlines?country=ru&apiKey=1b13b8f13b93495ea84b23d896d00f8b').then(response => response.json());
}