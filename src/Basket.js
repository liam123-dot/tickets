import React, { useEffect, useState } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import { useBasket } from './BasketContext';
import Checkout from './Checkout';

export default function Basket() {
    const { basket, clearBasket } = useBasket();
    const [total, setTotal] = useState(0);
    const [onCheckoutStep, setOnCheckoutStep] = useState(false);

    useEffect(() => {
        let totalPrice = basket.reduce((total, item) => total + (item.price * item.quantity), 0);
        totalPrice = (Math.round(totalPrice) / 100).toFixed(2);
        setTotal(totalPrice);
    }, [basket]);

    const handleCheckout = async () => {

        console.log('Checkout clicked');

        setOnCheckoutStep(true);

    }

    return (
        <Box sx={{
            position: 'fixed',
            bottom: 0,
            left: '50%', // Center the basket horizontally
            transform: 'translateX(-50%)', // Move the basket back to the left by half of its width
            width: '90%', // Adjust width to take up 90% of the screen
            maxWidth: '400px', // Set a maximum width for the basket
            bgcolor: 'background.paper',
            boxShadow: '0 -2px 10px rgba(0,0,0,0.1)',
            zIndex: 1100, // Ensure it stays on top of other content; adjust as needed
            padding: 2, // Increase padding for a larger size
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderRadius: '8px', // Add some border radius for rounded corners
        }}>
            <Typography variant="body1" sx={{ fontSize: '1.2rem' }}> {/* Increase font size */}
                Total: £{total}
            </Typography>
            <Box>
                <IconButton color="primary" onClick={handleCheckout} aria-label="checkout" disabled={basket && basket.length == 0}>
                    <Typography>Checkout</Typography>
                </IconButton>
                <IconButton color="error" onClick={clearBasket} aria-label="clear basket">
                    <DeleteSweepIcon />
                </IconButton>
            </Box>
            <Checkout open={onCheckoutStep} setOpen={setOnCheckoutStep} />
        </Box>
    );
}
