import React, { useEffect, useState } from "react";
import { Modal, Box, TextField, Button, CircularProgress, Typography } from "@mui/material";
import axios from "axios";

import VerifyEmail from "./VerifyEmail";
import { useBasket } from "./BasketContext";

export default function Checkout({ open, setOpen }) {
    const [email, setEmail] = useState('');
    const [verifiedEmail, setVerifiedEmail] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { basket } = useBasket();

    useEffect(() => {
        if (open) {
            const foundEmail = localStorage.getItem('email');
            if (foundEmail) {
                setEmail(foundEmail);
                setVerifiedEmail(true);
            }
        }
    }, [open]);

    const handleChangeEmail = () => {
        setVerifiedEmail(false); // Reset verifiedEmail to trigger VerifyEmail component
    };

    const finishCheckout = async () => {
        console.log(basket); // Log the basket content

        setIsLoading(true); // Start loading
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/reserve`, {
                basket,
                email
            });
            const { url } = response.data;

            // Redirect to the checkout page
            window.location.href = url;
        } catch (error) {
            console.error('Checkout failed:', error);
        } finally {
            setIsLoading(false); // End loading
        }
    }

    return (
        <Modal
            open={open}
            onClose={() => setOpen(false)}
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Box sx={{
                width: '100%',
                maxWidth: 400,
                bgcolor: 'background.paper',
                border: '1px solid #000',
                borderRadius: '8px',
                boxShadow: 24,
                p: 4,
                display: 'flex',
                flexDirection: 'column',
                gap: 2
            }}>
                {!verifiedEmail ? (
                    <VerifyEmail setVerifiedEmail={setEmail} onSuccess={() => setVerifiedEmail(true)} />
                ) : (
                    <>
                        <Typography variant="h6">Email Verified</Typography>
                        <TextField
                            disabled
                            value={email}
                            fullWidth
                            variant="outlined"
                        />
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={handleChangeEmail}
                            sx={{ my: 1 }}
                        >
                            Change Email
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            disabled={isLoading}
                            onClick={finishCheckout}
                            fullWidth
                        >
                            {isLoading ? <CircularProgress size={24} /> : "Finish Checkout"}
                        </Button>
                    </>
                )}
            </Box>
        </Modal>
    );
}
