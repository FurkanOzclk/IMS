import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Button, Typography, Container, Box, Grid, Link } from '@mui/material';
// components

// ----------------------------------------------------------------------


// ----------------------------------------------------------------------

export default function Footer() {
    return (
        <>
            <Grid justifyContent="center" alignItems="center" flexDirection="row" >
                <Container maxWidth="lg">
                    <Grid container justifyContent="center">
                        <Grid item xs={12} sm={4}>
                            <Box>
                                <Link href="aboutus" color="inherit">
                                    About Us
                                </Link>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={4} justifyContent="center">

                            <Box>
                                <Link href="https://gidatarim.edu.tr/" color="inherit">
                                    KFAU
                                </Link>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Grid>
        </>

    )
}
