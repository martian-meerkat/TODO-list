import { Card, CardContent, CardHeader, Checkbox, Collapse, List, ListItem, ListItemText } from '@mui/material';
import React, { FunctionComponent, useState } from 'react';
import { useMutation } from 'react-query';
import { ITodo, ITodoProps } from '../../interfaces/ITodo';
import { requestCompleted } from '../../services/todos.service';
import itemColors from '../../constants/Colors';
import CheckIcon from '@mui/icons-material/Check';
import AppSwitch from '../AppSwitch/AppSwitch';

import './TodayItem.css';

const TodayItem: FunctionComponent<ITodoProps> = (props): JSX.Element => {
    const [collapsed, setCollapsed] = useState(false);
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

    const getItemColor = (i: number) => 
        itemColors[(i % itemColors.length + itemColors.length) % itemColors.length];

    const toggleItemCollapsed = (i: number) => {
        setItemsCollapsed(itemsCollapsed.map((item, index) => 
            i === index ? !item : item
        ));
    };

    return (
        <Card className={'today-item'}>
            <CardHeader
                className={'today-item-header'}
                action={
                    <Checkbox
                        className={'today-item-checkbox'}
                        checked={!collapsed} 
                        onChange={(e) => {setCollapsed(!e.target.checked)}}
                        checkedIcon={<CheckIcon className={'today-item-checkbox-sign'}/>}
                        size={'small'}
                    />
                }
                title={
                    <h2 className={'today-item-header-label'}>Today Tasks:</h2>
                }
            />
            <Collapse in={!collapsed}>
                <CardContent className={'today-item-list'}>
                    <List>
                        {props.todos.map((todo, i) => {
                            return (
                                <ListItem
                                    key={`todo-${todo._id}`}
                                    sx={{borderLeft: `5px solid ${getItemColor(i)}`}}
                                    className={`${itemsCollapsed[i] ? 'collapsed' : ''} ${todo.completed ? 'completed' : ''}`}
                                >
                                    <ListItemText
                                        primary={<span onClick={() => toggleItemCollapsed(i)}>{todo.title}</span>}
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

export default TodayItem;