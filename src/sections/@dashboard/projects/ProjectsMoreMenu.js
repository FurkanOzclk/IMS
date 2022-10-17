import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';


// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText, Box, Typography, Modal, Button } from '@mui/material';
// component
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { axiosInstance } from '../../../axios/Axios';
import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------

export default function UserMoreMenu(props) {

    const navigate = useNavigate();



    const ref = useRef(null);
    const [isOpen, setIsOpen] = useState(false);

    const deleteProject = async () => {
        try {
            const { data } = await axiosInstance.delete(`/project/${props.id}`);
            toast.success(data.message);
          } catch (error) {
            toast.error("Delete Project Failed");
            console.log(error);
          }
          ModalClose();
        //   window.location.reload();
        getData();
    }

    const editProject = () => {
        navigate(`/dashboard/projects/editproject?id=${props.id}`,{state:{
            name:props.name,
            endDate:props.endDate,
            startDate:props.startingDate
        }})
    }

    const viewProject = () => {
        navigate(`/dashboard/projects/viewproject?id=${props.id}`,{state:{
            name:props.name,
            endDate:props.endDate,
            startDate:props.startingDate
        }})
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
 
    const getData=props.funcs.func;

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
                        <Iconify icon="carbon:view-filled" width={24} height={24} />
                    </ListItemIcon>
                    <ListItemText primary="View" primaryTypographyProps={{ variant: 'body2' }} onClick={viewProject} />
                </MenuItem>

                <MenuItem sx={{ color: 'text.secondary' }}>
                    <ListItemIcon>
                        <Iconify icon="eva:edit-fill" width={24} height={24} />
                    </ListItemIcon>
                    <ListItemText primary="Edit" primaryTypographyProps={{ variant: 'body2' }} onClick={editProject} />
                </MenuItem>

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
                            <Button variant='contained' color="error" onClick={deleteProject}>Delete</Button>
                        </Box>
                    </Box>
                </Modal>

            </Menu>
        </>
    );
}
