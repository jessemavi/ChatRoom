import React, { Component } from 'react';
import { List, Image, Header } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { getActiveUsers } from '../redux-new/actions/users';

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
        <Header as='h3'>Users</Header>
        <List style={{ height: '85vh', overflow: 'auto' }}>
          {this.props.users.map((user, index) => (
            <List.Item key={index}>
              <Image avatar src='https://react.semantic-ui.com/images/avatar/small/rachel.png' />
              <List.Content>
                <List.Header>{user.username}</List.Header>
              </List.Content>
            </List.Item>
          ))}
        </List>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { users: state.users };
};

UserList = connect(mapStateToProps, { getActiveUsers })(UserList);

export default UserList;
