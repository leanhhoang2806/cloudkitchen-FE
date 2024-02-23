import React, { useState, useEffect } from 'react';
import { Typography, List, ListItem, ListItemText, ListItemAvatar, Avatar, Divider, Pagination } from '@mui/material';
import Button from '@mui/material/Button';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import Image1 from "media/images/n1.jpg"
import Image2 from "media/images/n2.jpg"
import Image3 from "media/images/r1.jpg"
import { useAuth0 } from '@auth0/auth0-react';
import { buyerGetByEmail } from 'apis/buyer';
import Theme from './Theme';
import { useDispatch } from 'react-redux';
import { changeEmail } from 'store/slices/userSlice';

const orders = [
  { id: 1, image: Image1, status: 'Delivered', time: '2024-02-16 10:30 AM', price: '$15.99' },
  { id: 2, image: Image2, status: 'Pending', time: '2024-02-15 05:45 PM', price: '$10.50' },
  { id: 3, image: Image3, status: 'Delivered', time: '2024-02-14 08:20 AM', price: '$20.75' },
  // Add more orders as needed
];

const ProfilePage = () => {
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  // const mainUser = useSelector(state => state.user)
  const dispatch = useDispatch();

  const { getAccessTokenSilently, user } = useAuth0();

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  useEffect(() => {
    const fetchUser = async () => {
      const getUser  = await buyerGetByEmail(getAccessTokenSilently, user.email)
      dispatch(changeEmail(getUser.email))
    }
    fetchUser()
  }, []);

  return (
    <Theme>
      <div style={{ width: '80%', margin: 'auto', backgroundColor: 'white', padding: '20px', marginTop: '20px' }}>
        <Typography variant="h4" gutterBottom>
          My Orders
        </Typography>
        <Divider sx={{ bgcolor: 'grey.600', height: 3 }} />
        <List>
          {orders.slice(startIndex, endIndex).map(order => (
            <React.Fragment key={order.id}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt="Food" src={order.image} style={{ width: '150px', height: '150px' }} />
                </ListItemAvatar>
                <ListItemText
                  primary={<Typography variant="subtitle1" style={{ color: '#4287f5' }}>{`Status: ${order.status}`}</Typography>}
                  secondary={
                    <React.Fragment>
                      <Typography variant="body2" component="span" color="textPrimary" style={{ paddingLeft: '10px' }}>
                        Time: {order.time}
                      </Typography>
                      <Typography variant="body2" component="span" color="textPrimary" style={{ marginLeft: '20px' }}>
                        Price: {order.price}
                      </Typography>
                    </React.Fragment>
                  }
                  style={{ paddingLeft: '20px' }} // Add left padding to the ListItemText
                />
                <ListItemSecondaryAction>
                  <Button variant="contained" color="error" size="small">
                    DELETE
                  </Button>
                </ListItemSecondaryAction>
              </ListItem>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          ))}
        </List>
        <Pagination
          count={Math.ceil(orders.length / itemsPerPage)}
          page={page}
          onChange={handlePageChange}
          color="primary"
          style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}
        />
      </div>
    </Theme>
  );
};


export default ProfilePage;
