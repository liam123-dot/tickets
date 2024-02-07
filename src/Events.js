import React, {useEffect, useState} from 'react';
import { Divider } from '@mui/material';
import { Box, CircularProgress, Card, CardMedia, CardContent, Typography, TextField } from '@mui/material';

// import react query
import { useQuery } from 'react-query';
import { useBasket } from './BasketContext'; // Assuming BasketContext is in the same directory

export default function Events() {
    const getEvents = async () => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/events`);
        const data = await response.json();
        return data;
    };

    const { data, isLoading } = useQuery('events', getEvents);

    return (
        <Box>
            {isLoading ? (
                <CircularProgress />
            ) : (
                data && (
                    <Box
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'center', // Centers items on the line
                            gap: 2, // Adds space between cards
                            p: 2, // Padding around the container for some breathing room
                        }}
                    >
                        {data.map(event => (
                            <Event key={event.event_id} event={event} />
                        ))}
                    </Box>

                )
            )}
        </Box>
    );
}

function Event({ event }) {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const openTime = new Date(event.open_time * 1000);
    const dayOfWeek = daysOfWeek[openTime.getDay()];

    return (
        <Card sx={{ m: 2, overflow: 'visible' }}> {/* Adjust max width as needed and ensure overflow is visible for drop shadows or overflow content */}
            <CardMedia
                component="img"
                height="140"
                image={event.image_url}
                alt={event.event_name}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {event.event_name}
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={2}>
                    {dayOfWeek}, {openTime.toLocaleString()}
                </Typography>
                <Box display="flex" flexDirection="column" alignItems="stretch">
                    {event.tickets.map((ticket, index) => (
                        <Ticket key={index} ticket={ticket} /> // Pass index as key, consider using a unique ticket identifier if available
                    ))}
                </Box>
            </CardContent>
        </Card>
    );
}

function Ticket({ ticket }) {
    const { basket, updateTicketQuantity } = useBasket(); // Assuming this function is added to the context
    const [quantity, setQuantity] = useState(0);

    useEffect(() => {
        const basketItem = basket.find((item) => item.ticket_id === ticket.ticket_id);
        if (basketItem) {
            setQuantity(basketItem.quantity);
        } else {
            setQuantity(0);
        }
    }, [basket, ticket.ticket_id]);

    const handleQuantityChange = (event) => {
        const newQuantity = Math.max(0, Math.min(ticket.listings_count, parseInt(event.target.value, 10)));
        setQuantity(newQuantity);
        updateTicketQuantity(ticket.ticket_id, newQuantity, ticket.price);
    };

    return (
        <Card variant="outlined" sx={{ my: 2, p: 2, width: '90%' }}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                    <Typography variant="body1" color="text.primary">
                        {ticket.ticket_name}                    
                    </Typography>
                    <Typography>
                        £{(ticket.price / 100).toFixed(2)}
                    </Typography>
                </Box>
                <TextField
                    size="small"
                    type="number"
                    InputProps={{ inputProps: { min: 0, max: ticket.listings_count } }}
                    value={quantity}
                    onChange={handleQuantityChange}
                    sx={{ width: '80px' }}
                />
            </Box>
            <Divider sx={{ my: 1 }} />
            <Typography variant="body2" color="text.secondary">
                Select quantity
            </Typography>
        </Card>
    );
}
