import React from "react";
import {connect} from 'react-redux';
import {Tasks} from '../../store/tasks/Tasks';
import {Users} from '../../store/users/Users';
import './Lyout.css';

class Layout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {nextTask: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({nextTask: event.target.value});
    }

    handleSubmit(event) {
        this.props.dispatch(Tasks.add(this.state.nextTask));
        event.preventDefault();
        this.setState({nextTask: ''})
    }

    fetchData() {
        this.props.dispatch(Tasks.fetch());
        this.props.dispatch(Users.fetch());
    }

    complete(id) {
        const newComplete = !this.props.tasksData.tasks[id].completed;
        this.props.dispatch(Tasks.complete(id, newComplete));
    }

    render() {


        return <div>
            <div>
                Test Task of Daria Guketleva. TODO list
            </div>
            <div className="titles">
                <div className="description">Description (click to complete)</div>
                <div className="assignee">Assignee</div>
                <div className="assign">Assign to</div>
            </div>
            {this.props.tasksData.tasks && this.props.tasksData.tasks.map((task) =>
                <div className={'row'}>
                    <div
                        className="description"
                        style={{color: task.completed ? 'green' : 'red',}}
                        onClick={() => this.complete(task.id)}
                    >
                        {task.description}</div>
                    <div className="assignee">{this.props.usersData && this.props.usersData.users &&
                    task.assigneeId && this.props.usersData.users[task.assigneeId] &&
                    this.props.usersData.users[task.assigneeId].name}</div>
                    <div className="assign">
                        {this.renderUserList(task.id)}
                  </div>
                </div>
            )}
            <form onSubmit={this.handleSubmit}>
                <input
                    type="text"
                    value={this.state.nextTask}
                    onChange={this.handleChange}
                />
                <button>add</button>
            </form>
            {this.props.tasksData.loading && <div className={'loading'}>LOADING</div>}

            <footer className="card-footer">
                &copy; Daria Guketleva 2019г.
            </footer>
        </div>

    }

    componentDidMount() {
        this.fetchData();
    }

    renderUserList (taskId){
        const users = [];
        if (this.props.usersData){
            for (let i in this.props.usersData.users){
                users.push(<div
                    onClick={() => this.props.dispatch(Tasks.assign(taskId, +i))}>
                    {this.props.usersData.users[i].name}</div>)
            }
        }
        return users
    }
}

function mapStateToProps(state) {
    return {
        tasksData: state.tasksData,
        usersData: state.usersData,
    };
}

export default connect(mapStateToProps)(Layout);