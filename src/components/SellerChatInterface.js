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
import { getConversationByConversationId } from 'apis/chatRoom'
import { useAuth0 } from '@auth0/auth0-react'
// import { getSellerById } from 'apis/sellerRegister'
import { getBuyerById } from 'apis/buyer'
import { postChatMessage } from 'apis/chatRoom'
import { useSelector } from 'react-redux'
import { getChatListBySellerId } from 'apis/chatRoom'
import { getSellerById } from 'apis/sellerRegister'

const ChatList = styled(List)({
  maxHeight: 'calc(100vh - 100px)',
  width: '20%',
})

const ChatContainer = styled('div')({
  display: 'flex',
  paddingTop: '20px',
  width: '100%',
})

const SellerChatInterface = () => {
  const [selectedConversation, setSelectedConversation] = useState({
    buyer_id: '',
    seller_id: '',
    messages: [],
  })
  const [selectedConversationId, setSelectedConversationId] = useState('')
  const [messageInput, setMessageInput] = useState('')
  const [sellerChatRoom, setSetBuyerChatRoom] = useState([])
  const [buyerNames, setBuyerNames] = useState([])
  const [sender, setSender] = useState('')
  const [receiver, setReceiver] = useState('')

  const sellerId = useSelector((state) => state.user.sellerId)

  const { getAccessTokenSilently } = useAuth0()

  const handleConversationClick = async (conversationId) => {
    const conversation = await getConversationByConversationId(
      conversationId,
      getAccessTokenSilently,
    )
    setSelectedConversationId(conversationId)
    setSelectedConversation({ ...conversation })
    setReceiver(buyerNames.find((buyer) => buyer.id === conversation.buyer_id))
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

  const getAllChatRoomBySellerIdHandler = async (sellerId) => {
    const chatRooms = await getChatListBySellerId(
      sellerId,
      getAccessTokenSilently,
    )
    setSetBuyerChatRoom(chatRooms)
    if (chatRooms.length > 0) {
      const buyerIds = chatRooms.map((room) => room.buyer_id)
      const buyer_info = await Promise.all(
        buyerIds.map((buyerId) =>
          getBuyerById(buyerId, getAccessTokenSilently),
        ),
      )
      setBuyerNames(buyer_info)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      await getAllChatRoomBySellerIdHandler(sellerId)
      const seller = await getSellerById(sellerId, getAccessTokenSilently)
      setSender(seller.email)
    }

    fetchData()

    // eslint-disable-next-line
  }, [])

  return (
    <>
      <ChatContainer>
        <Paper style={{ width: '20%' }}>
          <ChatList style={{ width: '100%' }}>
            {buyerNames.map((buyer, index) => (
              <React.Fragment key={buyer.id}>
                <ListItemButton
                  onClick={() =>
                    handleConversationClick(
                      sellerChatRoom[index].conversation_id,
                    )
                  }
                  style={{ width: '100%' }}
                >
                  <ListItemText primary={buyer.email} />
                </ListItemButton>
                {index < buyerNames.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </ChatList>
        </Paper>

        {selectedConversation.messages.length > 0  && (
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
    </>
  )
}

export default SellerChatInterface
