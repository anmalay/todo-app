import React from 'react';
import axios from 'axios';
import classNames from 'classnames';

import { Badge } from '../Badge/index';

import './List.scss';
import removeSvg from '../../assets/img/remove.svg';

export function List({ items, isRemovable, onClick, onRemove, onClickItem, activeItem }) {

    const removeList = (item) => {
        if (window.confirm('Вы действительно хотите удалить список?')) {
            axios.delete('http://localhost:3001/lists/' + item.id).then(() => {
                onRemove(item.id);
            });
        }
    }

    return(
    <ul onClick={onClick} className="list">
        {items.map((item, index) => (
            <li key={index} onClick={onClickItem ? () => onClickItem(item) : null} className={classNames(item.className, {'active' : activeItem && activeItem.id === item.id})}>
                <i>{item.icon ? item.icon : <Badge color={item.color.name}/>}</i>
                <span>{item.name} {item.tasks && item.tasks.length > 0 && ` (${item.tasks.length})`}</span>
                {isRemovable && <img src={removeSvg} alt="x" className="list_remove-icon" onClick={() => removeList(item)} />}
            </li>
        ))}
    </ul>
    );
}
