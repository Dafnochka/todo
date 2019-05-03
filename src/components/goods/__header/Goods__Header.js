import React from 'react';
import './Goods__Header.css'

export default class Goods__Header extends React.Component {
    render() {
        let result = [];
        for (let key in this.props) {
            result.push(<div  key={key} className={key}>{this.props[key]}</div>)
        }

        return (
            <li className='Goods__Header'>
                {result}
            </li>
        );
    }
}