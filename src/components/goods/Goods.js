import React from 'react';
import connect from "react-redux/es/connect/connect";
import './Goods.css';
import Goods__good from './__good/Goods__good'
import Goods__Header from "./__header/Goods__Header";
import {Link} from "react-router";

class Goods extends React.Component {
    constructor(props){
        super(props);
        this.state={checked: false}
    }
    check(id) {
        // this.props.dispatch(check(id));
        this.setState({
            checked:!this.state.checked
        })
    }

    render(props) {
        let checked = this.props.tasksData.filter((good) => good.checked);
        let resultType = checked.length ? 'result filled' : 'result empty';
        let unit;
        switch (checked.length) {
            case 0: {
                unit = '';
                break;
            }
            case 1: {
                unit = 'товар';
                break;
            }
            case 2: {
                unit = 'товара';
                break;
            }
            case 3: {
                unit = 'товара';
                break;
            }
            default:
                break;
        }
        let result = checked.length ? [<div>Вы выбрали</div>,
                <div className='number'>{checked.length}</div>,
                <div>{unit}</div>, <div className='cart'><Link to='/shopping_cart'>
                    ПЕРЕЙТИ В КОРЗИНУ
                </Link></div>]
            : <div>Пожалуйста, отметьте галочками несоклько товаров</div>;
            let goods=[];
        this.props.tasksData.forEach((good)=>{
            goods.push(<Goods__good
                key={good.id}
                idField={good.id}
                name={good.name}
                rating={good.rating}
                trand={good.trand}
                priceSegment={good.priceSegment}
                comments={good.comments.length}
                checked={good.checked}
                check={(id)=>this.check(id)}
            />);
        });
        return (
            <div>
                <div className="container">
                    <h1>Список товаров</h1>
                    <ul>
                        <Goods__Header
                            idField="#"
                            name="Название"
                            rating='Рейтинг'
                            trand="Тренд"
                            priceSegment="Ценовой сегмент"
                            comments='Отзывы'
                            checked='В корзину'
                        />
                        {goods}
                    </ul>
                </div>
                <div className={resultType}>{result}</div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        tasksData: state.tasksData.tasksData,
    };
}

export default  connect(mapStateToProps)(Goods);
