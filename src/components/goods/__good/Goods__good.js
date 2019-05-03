import React from 'react';
import './Goods__good.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faComment, faCheckSquare, faSquare} from '@fortawesome/free-solid-svg-icons';
import {connect} from 'react-redux';

class Goods__good extends React.Component {
constructor(props){
    super(props);
    this.state={checked: false}
}
    check(id) {
        // this.props.check(id);
        this.setState({
            checked:!this.state.checked
        })
    }
    componentDidMount(){
        if(this.props.store){
            this.setState({
                checked:this.props.store[this.props.idField-1].checked
            })
        }
    }

    render() {
        let result = [];
        let data = {...this.props};
        let segment = '';
        for (let i = 0; i < this.props.priceSegment; i++) {
            segment += String.fromCharCode(8381) + ' ';
        }
        data.priceSegment = <div className='segment'>{segment}</div>;
        if (!this.props.comments) {
            data.comments = '';
        } else {
            data.comments = [<FontAwesomeIcon key='comments' icon={faComment}/>, this.props.comments]
        }



        if (this.state.checked) {
            data.checked = <FontAwesomeIcon onClick={()=>this.check(this.props.idField-1)} icon={faCheckSquare}/>;
        } else {
            data.checked = <FontAwesomeIcon onClick={()=>this.check(this.props.idField-1)} icon={faSquare}/>;
        }
        data.store=null;

        for (let key in data) {
            result.push(<div key={key} className={key}>{data[key]}</div>)
        }

        return (
            <li className='Goods__good'>
                {result}
            </li>
        );
    }
}
function mapStateToProps(state) {
    return {
        store: state.tasksData.tasksData,
    };
}

export default connect(mapStateToProps)(Goods__good);