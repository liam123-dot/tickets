import React from "react";
import { Box, Typography, Button, Paper, Stack, Link } from "@mui/material";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

export default function Success() {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            bgcolor: 'background.default',
            p: 4,
        }}>
            <Paper elevation={3} sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                <CheckCircleOutlineIcon sx={{ fontSize: 60, color: 'success.main' }} />
                <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
                    Success!
                </Typography>
                <Typography variant="body1">
                    Your order has been successfully processed. Check your emails for your ticket details.
                </Typography>
                <Typography variant="body1">
                    If you have any issues, contact us at <Link href="mailto:tickets.exeter123@gmail.com" underline="hover">
                    tickets.exeter123@gmail.com
                </Link>
                </Typography>
                <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 2 }}>
                    <Button variant="contained" color="primary" href="/">
                        Return to homepage
                    </Button>
                    {/* Add more buttons or links as needed */}
                </Stack>
            </Paper>
        </Box>
    );
}
