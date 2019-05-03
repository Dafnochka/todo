import React from 'react';
import connect from "react-redux/es/connect/connect";
import './ShoppingCart.css';

let advantages = [
    'Мы классные.',
    'Мы классные и очень-очень крутые.',
    'Даже сложно описать нашу крутость :)'

];

class ShoppingCart extends React.Component {
    render() {
        let checked = this.props.tasksData.filter((good) => good.checked);
        let unit;
        switch (checked.length) {
            case 0: {
                unit = ' товарв:';
                break;
            }
            case 1: {
                unit = ' товар:';
                break;
            }
            case 2: {
                unit = ' товара:';
                break;
            }
            case 3: {
                unit = ' товара:';
                break;
            }
            default:
                break;
        }
        let result = [<div>Вы выбрали </div>,
            <div className='number'>{' ' + checked.length + ' '}</div>,
            <div>{unit}</div>];
        let goods = [];
        checked.forEach((good) => {
            goods.push(good.name);
        });
        let advantageBlock = advantages.map((advantage, index) => <div className='advantage'>
            <div className='advantageNum'>{index + 1}</div>
            <div className='advantageText'>{advantage}</div>
        </div>);
        return (
            <div className="container">
                <h1>Корзина</h1>
                <div className="shopping_result">
                    {result}
                    <div>
                        {goods.join(', ')}
                    </div>
                </div>
                <h2>Преимущества покупок у нас</h2>
                <div className="advantages">
                    {advantageBlock}
                </div>
                <div className="separator"></div>
                <div className="forU">И это все - для вас!</div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        tasksData: state.tasksData.tasksData,
    };
}

export default connect(mapStateToProps)(ShoppingCart);
