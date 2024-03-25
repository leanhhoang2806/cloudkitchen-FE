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
  Typography,
} from '@mui/material'
import { styled } from '@mui/system'
import Theme from './Theme'
import {
  getAllChatRoomByBuyer,
  getConversationByConversationId,
} from 'apis/chatRoom'
import { useParams } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { getSellerById } from 'apis/sellerRegister'
import { getBuyerById } from 'apis/buyer'
import { postChatMessage } from 'apis/chatRoom'

const ChatList = styled(List)({
  maxHeight: 'calc(100vh - 100px)',
  width: '20%',
})

const ChatContainer = styled('div')({
  display: 'flex',
  paddingTop: '20px',
  width: '80%',
})

const ChatInterface = () => {
  const [selectedConversation, setSelectedConversation] = useState({
    buyer_id: '',
    seller_id: '',
    messages: [],
  })
  const [selectedConversationId, setSelectedConversationId] = useState('')
  const [messageInput, setMessageInput] = useState('')
  const [buyerChatRoom, setBuyerChatRoom] = useState([])
  const [sellerNames, setSellerNames] = useState([])
  const [sender, setSender] = useState('')
  const [receiver, setReceiver] = useState('')
  const { buyer_id } = useParams()

  const { getAccessTokenSilently } = useAuth0()

  const handleConversationClick = async (conversationId) => {
    const conversation = await getConversationByConversationId(
      conversationId,
      getAccessTokenSilently,
    )
    setSelectedConversationId(conversationId)
    setSelectedConversation({ ...conversation })
    setReceiver(
      sellerNames.find((seller) => seller.id === conversation.seller_id),
    )
  }

  const handleInputChange = (event) => {
    setMessageInput(event.target.value)
  }

  const handleSendMessage = async () => {
    if (messageInput.trim() !== '') {
      // Here you can implement logic to send the message
      await postChatMessage(
        selectedConversationId,
        selectedConversation.seller_id,
        selectedConversation.buyer_id,
        messageInput,
        getAccessTokenSilently,
      )
      setMessageInput('')
      const newMessage = await getConversationByConversationId(
        selectedConversationId,
        getAccessTokenSilently,
      )
      setSelectedConversation(newMessage)
    }
  }

  const getAllChatRoomByBuyerHandler = async (buyer_id) => {
    const chatRooms = await getAllChatRoomByBuyer(
      buyer_id,
      getAccessTokenSilently,
    )
    setBuyerChatRoom(chatRooms)
    if (chatRooms.length > 0) {
      const sellerIds = chatRooms.map((room) => room.seller_id)
      const sellers = await Promise.all(
        sellerIds.map((sellerId) =>
          getSellerById(sellerId, getAccessTokenSilently),
        ),
      )
      setSellerNames(sellers)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      await getAllChatRoomByBuyerHandler(buyer_id)
      const buyer = await getBuyerById(buyer_id, getAccessTokenSilently)
      setSender(buyer.email)
    }

    fetchData()

    // eslint-disable-next-line
  }, [])

  return (
    <Theme>
      <div // This div is the reason we have top and bottom app bars fixed in place
        style={{
          width: '80%',
          margin: 'auto',
          backgroundColor: 'white',
          padding: '20px',
          marginTop: '20px',
        }}
      >
        <ChatContainer>
          <Paper style={{ width: '20%', minHeight: '100vh' }}>
            {' '}
            {/* min height*/}
            <Typography variant="h4" gutterBottom>
              Chats
            </Typography>
            <Divider sx={{ bgcolor: 'grey.600', height: 3 }} />
            <ChatList style={{ width: '100%' }}>
              {sellerNames.map((seller, index) => (
                <React.Fragment key={seller.id}>
                  <ListItemButton
                    onClick={() =>
                      handleConversationClick(
                        buyerChatRoom[index].conversation_id,
                      )
                    }
                    style={{ width: '100%' }}
                  >
                    <ListItemText primary={seller.name} />
                  </ListItemButton>
                  {index < sellerNames.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </ChatList>
          </Paper>

          {selectedConversation.messages.length > 0 && (
            <Paper style={{ flex: 1, marginLeft: '20px', padding: '20px' }}>
              <div>
                <h3>{receiver.name}</h3>
                <Divider />
                <List>
                  {selectedConversation.messages.map((message) => (
                    <ListItem key={message.id}>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <ListItemText
                          primary={sender}
                          secondary={message.text}
                          primaryTypographyProps={{ variant: 'subtitle2' }}
                          secondaryTypographyProps={{ variant: 'body1' }}
                        />

                        <Typography
                          variant="body2"
                          align="left"
                          style={{ paddingLeft: '16px' }}
                        >
                          {message.content}
                        </Typography>
                      </div>
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
      </div>
    </Theme>
  )
}

export default ChatInterface
