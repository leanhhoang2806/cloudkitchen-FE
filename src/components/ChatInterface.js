import React, { useState, useEffect } from 'react'
import {
  Paper,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  TextField,
  Button,
} from '@mui/material'
import { styled } from '@mui/system'
import Theme from './Theme' // Assuming Theme is located in the same directory

const ChatList = styled(List)({
  maxHeight: 'calc(100vh - 100px)', // Adjust height according to your layout
  width: '20%',
})

const ChatContainer = styled('div')({
  display: 'flex',
  paddingTop: '20px',
  width: '80%',
})

const ConversationList = [
  {
    id: 1,
    name: 'John',
    messages: [
      { id: 1, text: 'Hello Jane!', sender: 'John' },
      { id: 2, text: 'Hi John!', sender: 'Jane' },
    ],
  },
  {
    id: 2,
    name: 'Jane',
    messages: [
      { id: 1, text: 'Hi John!', sender: 'Jane' },
      { id: 2, text: 'Hello Jane!', sender: 'John' },
    ],
  },
  // Add more conversations as needed
]

const ChatInterface = () => {
  const [selectedConversation, setSelectedConversation] = useState(
    ConversationList[0],
  )
  const [messageInput, setMessageInput] = useState('')

  const handleConversationClick = (conversation) => {
    setSelectedConversation(conversation)
  }

  const handleInputChange = (event) => {
    setMessageInput(event.target.value)
  }

  const handleSendMessage = () => {
    if (messageInput.trim() !== '') {
      // Here you can implement logic to send the message
      console.log('Message sent:', messageInput)
      setMessageInput('')
    }
  }

  // Load the first conversation when the component mounts
  useEffect(() => {
    setSelectedConversation(ConversationList[0])
  }, [])

  return (
    <Theme>
      <ChatContainer>
        <Paper style={{ width: '20%' }}>
          <ChatList style={{ width: '100%' }}>
            {ConversationList.map((conversation, index) => (
              <React.Fragment key={conversation.id}>
                <ListItemButton
                  onClick={() => handleConversationClick(conversation)}
                  style={{ width: '100%' }}
                >
                  <ListItemText primary={conversation.name} />
                </ListItemButton>
                {index < ConversationList.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </ChatList>
        </Paper>

        {selectedConversation && (
          <Paper style={{ flex: 1, marginLeft: '20px', padding: '20px' }}>
            <div>
              <h3>{selectedConversation.name}</h3>
              <Divider />
              <List>
                {selectedConversation.messages.map((message) => (
                  <ListItem key={message.id}>
                    <ListItemText
                      primary={message.sender}
                      secondary={message.text}
                      primaryTypographyProps={{ variant: 'subtitle2' }}
                      secondaryTypographyProps={{ variant: 'body1' }}
                    />
                  </ListItem>
                ))}
              </List>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <TextField
                label="Type a message"
                variant="outlined"
                value={messageInput}
                onChange={handleInputChange}
                multiline
                rows={3} // Adjust the number of rows as needed\
                style={{ padding: '10px', marginBottom: '10px' }} // Add padding around the text field and bottom margin
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleSendMessage}
              >
                Send
              </Button>
            </div>
          </Paper>
        )}
      </ChatContainer>
    </Theme>
  )
}

export default ChatInterface
