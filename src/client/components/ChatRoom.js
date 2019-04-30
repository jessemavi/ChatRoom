import React from 'react';
import { Grid, Button } from 'semantic-ui-react';
import UserList from './UserList';
import MessageList from './MessageList';
import AddMessage from './AddMessage';

const ChatRoom = (props) => (
  <div>
    {/*
    <Button onClick={props.logoutUser}>Logout</Button>
    */}
    <Grid>
      <Grid.Column width={3}>
        <UserList />
      </Grid.Column>
      <Grid.Column width={10}>
        <MessageList />
        <AddMessage />
      </Grid.Column>
    </Grid>
  </div>
);

export default ChatRoom;
