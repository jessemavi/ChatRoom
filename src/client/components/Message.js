import React from 'react';
import { Comment, Icon, Card, Image } from 'semantic-ui-react';

const Message = ({ content, user, time, urlMetadata }) => {
  return (
    <Comment>
      <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
      <Comment.Content>
        <Comment.Author>{user}</Comment.Author>
        <Comment.Metadata>{time}</Comment.Metadata>
        <Comment.Text>{content}</Comment.Text>
        {urlMetadata.length > 0 ?
          <Card.Group>
            {urlMetadata.map((metadata, index) => (
              <Card 
                key={index} 
                target="_blank" 
                rel="noopener noreferrer" 
                href={metadata.url}
              >
                {metadata.image !== '' ? 
                  <Image src={metadata.image} fluid /> :
                  null
                }
                <Card.Header style={{color:'black'}}>{metadata.title}</Card.Header>
                <Card.Description style={{color:'grey'}}>{metadata.description}</Card.Description>
                  <Card.Description style={{color:'grey'}}>
                    <Icon name='linkify'/>
                    {metadata.source}
                  </Card.Description>
              </Card>
            ))}
          </Card.Group>
        :
          null
        }
      </Comment.Content>
    </Comment>
  );
}

export default Message;
