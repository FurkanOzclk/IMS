import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText, Box, Typography, Modal, Button } from '@mui/material';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { axiosInstance } from "../../axios/Axios" 

// component
import Iconify from "../../components/Iconify"

// ----------------------------------------------------------------------

export default function WarehouseUserEquipmentMoreMenu(props) {


  const [data, setData] = useState({});
  const type = props.type;

  const navigate = useNavigate();

  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const deleteEquipment = async () => {
    if (type==="eq") {
      try {
        const { data } = await axiosInstance.delete(`warehouseuser/equipment/${props.id}`);
        setData(data);
        toast.success(data.msg);
      } catch (error) {
        toast.error("Delete Failed");
        console.log(error);
      }
      ModalClose();
      window.location.reload();
    }else if(type==="type"){
      try {
        const { data } = await axiosInstance.delete(`warehouseuser/equipmenttype/${props.id}`);
        setData(data);
        toast.success(data.msg);
      } catch (error) {
        toast.error("Delete Failed");
        console.log(error);
      }
      ModalClose();
      window.location.reload();
    }else if(type==="team"){
      try {
        const { data } = await axiosInstance.delete(`warehouseuser/equipmentteam/${props.id}`);
        setData(data);
        toast.success(data.msg);
      } catch (error) {
        toast.error("Delete Failed");
        console.log(error);
      }
      ModalClose();
      window.location.reload();
    }
    
  }

  const editEquipment = () => {
    if (type === "eq") {
      
      navigate(`/warehouse/editequipment?id=${props.id}`, {
        state: {
          id: props.id,
          type: props.type,
          data: props.data,
          eq:props.eq,
          // warehouse:props.warehouse.id
        }
      })
    }else if(type==="type"){
      navigate(`/warehouse/editequipmenttype?id=${props.id}`, {
        // state: {
        //   id: props.id,
        //   type: props.type,
        //   data: props.data
        // }
      })
    }else if(type==="team"){
      navigate(`/warehouse/editequipmentteam?id=${props.id}`, {
        // state: {
        //   id: props.id,
        //   type: props.type,
        //   data: props.data
        // }
      })
    }

  }

  const viewEq = () => {
    navigate(`/warehouse/viewequipment?id=${props.id}`, {
      state: {
        id: props.id,
        type: props.type
      }
    })
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

  const unassignEquipment=async ()=>{
    try {
      const formdata={
        unassignedDate:props.unassignDate
      }
      const { data } = await axiosInstance.post(`/warehouseuser/unassignequipment/${props.id}`,formdata)
      
      
      toast.success(data.message);
      
  } catch (error) {
    toast.error("Unassign Failed");
      console.log(error);
  }
  }
  
  const MenuReturner=()=>{
    if (type==="team"){
      return(
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
          <ListItemText primary="View" primaryTypographyProps={{ variant: 'body2' }} onClick={viewEq} />
        </MenuItem>

        <MenuItem sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Iconify icon="eva:trash-2-outline" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Unassign" primaryTypographyProps={{ variant: 'body2' }} onClick={unassignEquipment} />
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
              <Button variant='contained' color="error" onClick={deleteEquipment}>Delete</Button>
            </Box>
          </Box>
        </Modal>

      </Menu>
      )
    }
    return(
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
          <ListItemText primary="View" primaryTypographyProps={{ variant: 'body2' }} onClick={viewEq} />
        </MenuItem>


        <MenuItem sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Iconify icon="eva:edit-fill" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Edit" primaryTypographyProps={{ variant: 'body2' }} onClick={editEquipment} />
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
              <Button variant='contained' color="error" onClick={deleteEquipment}>Delete</Button>
            </Box>
          </Box>
        </Modal>

      </Menu>
    );
  }


  return (
    <>
      <ToastContainer/>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Iconify icon="eva:more-vertical-fill" width={20} height={20} />
      </IconButton>

      <MenuReturner/>
      
    </>
  );
}
