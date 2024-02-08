import React, { useState, useEffect } from 'react';
import { Button, Typography, Box, TextField, CircularProgress } from '@mui/material';
import axios from 'axios';

export default function VerifyEmail({ setVerifiedEmail, onSuccess }) {
    const [email, setEmail] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [message, setMessage] = useState('');
    const [codeSent, setCodeSent] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!codeSent) {
            document.getElementById('emailInput').focus();
        } else {
            document.getElementById('verificationCodeInput').focus();
        }
    }, [codeSent]);

    const handleSubmitEmail = async () => {
        setIsLoading(true);
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/${email}/verify-email`);
            if (response.status === 200) {
                setMessage('Email submitted successfully. Please check your inbox for the verification code.');
                setCodeSent(true);
            }
        } catch (error) {
            console.error('Error submitting email:', error);
            setMessage('Error submitting email. Please try again later.');
        }
        setIsLoading(false);
    };

    const handleSubmitVerificationCode = async () => {
        setIsLoading(true);
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/${email}/verify-email/${verificationCode}`);
            if (response.status === 200) {
                localStorage.setItem('email', email);
                setVerifiedEmail(email);
                onSuccess();
            }
        } catch (error) {
            console.error('Error submitting verification code:', error);
            setMessage('Error submitting verification code. Please check the code and try again.');
        }
        setIsLoading(false);
    };

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            p: 4,
            gap: 2,
            maxWidth: 400,
            margin: 'auto'
        }}>
            <Typography variant="h5" gutterBottom>Verify Email</Typography>
            {isLoading ? (
                <CircularProgress />
            ) : (
                <>
                    {!codeSent ? (
                        <>
                            <TextField
                                id="emailInput"
                                label="Email"
                                variant="outlined"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                fullWidth
                                margin="normal"
                                autoFocus
                            />
                            <Button variant="contained" color="primary" onClick={handleSubmitEmail} disabled={isLoading}>Submit Email</Button>
                        </>
                    ) : (
                        <>
                            {message && <Typography variant="body1" sx={{ color: 'success.main' }}>{message}</Typography>}
                            <TextField
                                id="verificationCodeInput"
                                label="Verification Code"
                                variant="outlined"
                                value={verificationCode}
                                onChange={(e) => setVerificationCode(e.target.value)}
                                fullWidth
                                margin="normal"
                                autoFocus
                            />
                            <Button variant="contained" color="primary" onClick={handleSubmitVerificationCode} disabled={isLoading}>Submit Verification Code</Button>
                        </>
                    )}
                </>
            )}
        </Box>
    );
}
