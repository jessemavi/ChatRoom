import React from 'react';
import { connect } from 'react-redux';

let UserList = ({ users }) => (
  <div>
    <h3>UserList Component</h3>
    {users.map((user, index) => (
      <p key={index}>{user.email}</p>
    ))}
  </div>
);

const mapStateToProps = state => {
  return { users: state.users };
};

UserList = connect(mapStateToProps)(UserList);

export default UserList;
