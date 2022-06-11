import { useState } from "react";
import {
    Container,
    Card,
    CardContent,
    createTheme,
    ThemeProvider,
    Paper,
    CssBaseline,
    Typography,
    TextField,
    Button,
} from "@mui/material";
import QRCode from "qrcode";

import CloudDownloadIcon from '@mui/icons-material/CloudDownload';

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: "#3f51b5",
        }
    },
    title: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3f51b5',
        color: '#fff',
        padding: '20px',
    },
    btnGeneral: {
        margin: '10px',
    },
    contentDowload: {
        display: 'flex',
        flexDirection: 'column',
    },
    linkDownload: {
        textDecoration: 'none',
    },
    btnDownload: {
        margin: '10px',
        color: '#fff',
        borderColor: '#fff',
        '&:hover': {
            backgroundColor: '#fff',
            color: '#3f51b5',
            borderColor: '#fff',
        }
    }
});


function GeneralQR() {
    const [text, setText] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const generateQRCode = async () => {
        try {
            const response = await  QRCode.toDataURL(text);
            setImageUrl(response);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Paper>
                <Container  sx={{marginTop:'10px'}}>
                    <Card>
                        <Typography variant="h3" sx={theme.title}>General QR</Typography>
                        <CardContent>
                            <div>
                                <TextField
                                    label="Enter Text Here"
                                    variant="standard"
                                    onChange={(e) => setText(e.target.value)}
                                />
                                <Button
                                    variant='contained'
                                    color='primary'
                                    sx={theme.btnGeneral}
                                    onClick={() => generateQRCode()}
                                >
                                    Generate QR
                                </Button>
                                <br/>
                                <br/>
                                <br/>
                                {
                                    imageUrl ?
                                        (
                                            <div className={theme.contentDowload}>
                                                <div>
                                                    <img src={imageUrl} alt="QR Code" />
                                                </div>
                                                <div>
                                                    <a href={imageUrl} download style={theme.linkDownload}>
                                                        <Button
                                                            variant='outlined'
                                                            color='primary'
                                                            type="submit"
                                                            startIcon={<CloudDownloadIcon />}
                                                            sx={theme.btnDownload}
                                                        >
                                                            Download QR
                                                        </Button>
                                                    </a>
                                                </div>
                                            </div>
                                        ) : null
                                }
                            </div>
                        </CardContent>
                    </Card>
                </Container>
            </Paper>
        </ThemeProvider>
    );
}

export default GeneralQR;