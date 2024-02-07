import React, { useEffect, useState } from "react";
import { Modal, Box, TextField, Button, CircularProgress } from "@mui/material";
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
        setVerifiedEmail(false); // Set verifiedEmail to false to trigger VerifyEmail component again
    };

    const finishCheckout = async () => {
        console.log(basket)

        setIsLoading(true); // Start loading

        const response = await axios.post(`${process.env.REACT_APP_API_URL}/reserve`, {
            basket,
            email
        });
        const { url } = response.data;

        // Redirect to the checkout page
        window.location.href = url;
    }

    return (
        <Box>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    '& .MuiBox-root': { // Target the inner Box component for styling
                        width: '400px', // Set the width to 400px
                        backgroundColor: 'white',
                        border: '2px solid #000',
                        borderRadius: '8px',
                        boxShadow: 24,
                        p: 4,
                    }
                }}
            >
                <div>
                    {!verifiedEmail && (
                        <VerifyEmail setVerifiedEmail={setEmail} onSuccess={() => {
                            setVerifiedEmail(true);
                        }}/>
                    )}

                    {verifiedEmail && (
                        <Box>
                            <TextField disabled={true} value={email} sx={{ width: '100%' }} />
                            <Button onClick={handleChangeEmail}>Change Email</Button>
                            <Button
                                onClick={finishCheckout}
                            >
                                {isLoading ? (
                                    <CircularProgress />
                                ) : (
                                    "Finish Checkout"
                                )}                                
                            </Button>
                        </Box>
                    )}
                </div>
            </Modal>
        </Box>
    );
}
