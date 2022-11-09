import { Card, CardContent, CardHeader, Collapse, IconButton, List, ListItem, ListItemText } from '@mui/material';
import React, { FunctionComponent, useState } from 'react';
import { useMutation } from 'react-query';
import { ITodo, ITodoProps } from '../../interfaces/ITodo';
import { requestCompleted } from '../../services/todos.service';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AppSwitch from '../AppSwitch/AppSwitch';
import itemColors from '../../constants/Colors';

import './TodoItem.css';

const TodoItem: FunctionComponent<ITodoProps> = (props) => {
    const dateArray = props.date.split('-');
    const [collapsed, setCollapsed] = useState(true);
    const [itemsCollapsed, setItemsCollapsed] = useState(new Array(props.todos.length).fill(true));
    
    const mutation = useMutation(
        (todo: ITodo) => {
            return requestCompleted(todo._id, !todo.completed);
        },
        {onSuccess: (response, variables) => {
            variables.completed = response.data.todo.completed;
        }}
    );

    const toggleCompleted = (todo: ITodo) => {
        mutation.mutate(todo);
    };

    const isTomorrow = () => 
        new Date(props.date).getDate() === new Date().getDate() + 1;

    const getItemColor = (i: number) => 
        itemColors[(i % itemColors.length + itemColors.length) % itemColors.length];

    const toggleItemCollapsed = (i: number) => {
        setItemsCollapsed(itemsCollapsed.map((item, index) => 
            i === index ? !item : item
        ));
    };

    return (
        <Card className={'todo-item'}>
            <CardHeader 
                action={
                  <IconButton
                      color="inherit"
                      aria-label="menu"
                      onClick={ () => setCollapsed(!collapsed) }
                      className={'todo-item-expand-button'}
                  >
                      { collapsed ? <ExpandMoreIcon /> : <ExpandLessIcon/> }
                  </IconButton>
                }
                title={
                    <h2>{isTomorrow() ? 
                        'Tomorrow tasks' :
                        `${[dateArray[2], dateArray[1]].join('/')} Tasks`}</h2>
                }
                className={'todo-item-header'}
            />
            <Collapse in={!collapsed}>
                <CardContent className={'todo-item-list'}>
                    <List>
                        {props.todos.map((todo, i) => {
                            return (
                                <ListItem
                                    key={`todo-${todo._id}`}
                                    sx={{borderLeft: `5px solid ${getItemColor(i)}`}}
                                    className={`${itemsCollapsed[i] ? 'collapsed' : ''} ${todo.completed ? 'completed' : ''}`}
                                >
                                    <ListItemText
                                        primary={todo.title}
                                        secondary={todo.text}
                                    />
                                    <AppSwitch checked={todo.completed} onChange={() => { toggleCompleted(todo) }} />
                                </ListItem>
                            )}
                        )}
                    </List>
                </CardContent>
            </Collapse>
        </Card>
    );
};

export default TodoItem;

