import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Button, Typography, Container, Box, Card, CardActionArea, CardContent, CardMedia, CardActions, Stack } from '@mui/material';
// components
import Page from '../components/Page';
import mah from '../components/images/mah.jpg'
import fo from '../components/images/fo.jpg'
import ma from '../components/images/ma.jpeg'



// ----------------------------------------------------------------------

const ContentStyle = styled('div')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------

export default function AboutUs() {
    return (
        <Page title="AboutUs">
                <Typography>About us</Typography>
            <ContentStyle>
                <Stack direction="row" spacing={3} >
                    <CardReturner1 />
                    <CardReturner2 />
                    <CardReturner3 />
                </Stack>
            </ContentStyle>
        </Page>
    );
}

const CardReturner1 = () => {
    return (
        <Card sx={{ minWidth: 345, maxWidth: 345 }}>
            <CardMedia
                component="img"
                alt="Furkan Özçelik"
                height="350"
                image={fo}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    Furkan Özçelik
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    CE Student at KFAU
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" href="https://linkedin.com/in/furkan-%C3%B6z%C3%A7elik-bb8987204">LinkedIn</Button>
                
            </CardActions>
        </Card>
    )

}

const CardReturner2 = () => {
    return (
        <Card sx={{ minWidth: 345, maxWidth: 345 }}>
            <CardMedia
                component="img"
                alt="Muaz Asilkan"
                height="350"
                image={ma}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    Muaz Asilkan
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    CE Student at KFAU
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" href="https://linkedin.com/in/muaz-asilkan-a72624210/">LinkedIn</Button>
            </CardActions>
        </Card>
    )

}

const CardReturner3 = () => {
    return (
        <Card sx={{ minWidth: 350, maxWidth: 350 }}>
            <CardMedia
                component="img"
                alt="Mohamed Abdiaziz Hassan"
                height="350"
                image={mah}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    Mohamed Abdiaziz Hassan
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Software Developer
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" href="https://linkedin.com/in/mohamed-abdiaziz-hassan-783ba1181/">LinkedIn</Button>
            </CardActions>
        </Card>
    )

}