import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText, Box, Typography, Modal, Button } from '@mui/material';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import axios, { post } from 'axios';
import { axiosInstance } from '../../../axios/Axios';
// component
import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------

export default function ReportMoreMenu(props) {
    const navigate = useNavigate();

    const ref = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const [data, setData] = useState({});
    

    const accessToken = localStorage.getItem("access_token");
    const urlLocal = "http://localhost:8000/api/project/report/"

    const deleteReport = async () => {        
        const formData = new FormData();
        formData.append("id", props.id);
        formData.append("location", props.location);
        axios({
            url: urlLocal,
            method: "DELETE",
            headers: {
                authorization: `Bearer ${accessToken}`,
                'content-type': 'multipart/form-data'
            },
            data: formData
        }).then((res) => {
            console.log(res.data.msg);
            setTimeout(
                () => window.location.reload(), 
                700
              );
            
        })
        ModalClose();
    }
    
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper', 
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const [open, setOpen] = React.useState(false);
    const ModalOpen = () => {
        setOpen(true);
    };
    const ModalClose = () => {
        setOpen(false);
    };


    return (
        <>
            <ToastContainer/>
            <IconButton ref={ref} onClick={() => setIsOpen(true)}>
                <Iconify icon="eva:more-vertical-fill" width={20} height={20} />
            </IconButton>

            <Menu
                open={isOpen}
                anchorEl={ref.current}
                onClose={() => setIsOpen(false)}
                PaperProps={{
                    sx: { width: 200, maxWidth: '100%' },
                }}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >

                <MenuItem sx={{ color: 'text.secondary' }}>
                    <ListItemIcon>
                        <Iconify icon="eva:trash-2-outline" width={24} height={24} />
                    </ListItemIcon>
                    <ListItemText primary="Delete" primaryTypographyProps={{ variant: 'body2' }} onClick={ModalOpen} />
                </MenuItem>

                <Modal
                    open={open}
                    onClose={ModalClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Are you sure ?
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2, mb: 5 }}>
                            Are you sure to delete {props.name} ?
                        </Typography>
                        <Box display="flex" justifyContent="space-between" alignItems="flex-end"  >
                            <Button variant='text' color='inherit' onClick={ModalClose}>Cancel</Button>
                            <Button variant='contained' color="error" onClick={deleteReport}>Delete</Button>
                        </Box>
                    </Box>
                </Modal>

            </Menu>
        </>
    );
}
