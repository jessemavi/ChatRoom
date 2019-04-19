import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getActiveUsers } from '../redux-new/actions/auth';

class UserList extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.getActiveUsers();
  }

  render() {
    return (
      <div>
        <h3>UserList Component</h3>
        {this.props.users.map((user, index) => (
          <p key={index}>{user.username}</p>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { users: state.users };
};

UserList = connect(mapStateToProps, { getActiveUsers })(UserList);

export default UserList;
