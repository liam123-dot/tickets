import React, { useState, useEffect } from 'react';
import { Button, Typography, Box, TextField, CircularProgress, Alert } from '@mui/material';
import axios from 'axios';

export default function VerifyEmail({ setVerifiedEmail, onSuccess }) {
    const [email, setEmail] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [message, setMessage] = useState('');
    const [codeSent, setCodeSent] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false); // New state for error handling

    useEffect(() => {
        if (!codeSent) {
            document.getElementById('emailInput').focus();
        } else {
            document.getElementById('verificationCodeInput').focus();
        }
    }, [codeSent]);

    const handleSubmitEmail = async () => {
        setIsLoading(true);
        setError(false); // Reset error state
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/${email}/verify-email`);
            if (response.status === 200) {
                setMessage(`Email submitted successfully to ${email}. Please check your inbox and spam for the verification code.`);
                setCodeSent(true);
            }
        } catch (error) {
            console.error('Error submitting email:', error);
            setMessage('Error submitting email. Please try again later.');
            setError(true);
        }
        setIsLoading(false);
    };

    const handleSubmitVerificationCode = async () => {
        setIsLoading(true);
        setError(false); // Reset error state
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
            setError(true);
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
            margin: 'auto',
            '& .MuiTextField-root': { margin: '8px 0' }, // Adjust spacing for all text fields
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
                                error={error && !email} // Show error state if needed
                                helperText={error && !email ? "Please enter a valid email." : ""}
                            />
                            <Button variant="contained" onClick={handleSubmitEmail} disabled={isLoading || !email}>Send Verification Code</Button>
                        </>
                    ) : (
                        <>
                            {message && (error ? <Alert severity="error">{message}</Alert> : <Alert severity="success">{message}</Alert>)}
                            <TextField
                                id="verificationCodeInput"
                                label="Verification Code"
                                variant="outlined"
                                value={verificationCode}
                                onChange={(e) => setVerificationCode(e.target.value)}
                                fullWidth
                                error={error && !verificationCode}
                                helperText={error && !verificationCode ? "Please enter the verification code." : ""}
                            />
                            <Button variant="contained" onClick={handleSubmitVerificationCode} disabled={isLoading || !verificationCode}>Verify Email</Button>
                        </>
                    )}
                </>
            )}
        </Box>
    );
}
