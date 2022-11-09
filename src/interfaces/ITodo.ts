export interface ITodo {
    _id: number;
    title: string;
    text: string;
    completed: boolean;
    date: string
}

export interface ITodos {
    [date: string]: ITodo[]
}

export interface ITodoProps {
    date: string;
    todos: ITodo[]
}