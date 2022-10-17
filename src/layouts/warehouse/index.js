import React,{ useState } from 'react';
import { Outlet,useNavigate } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
//
import DashboardNavbar from './DashboardNavbar';
import DashboardSidebar from './DashboardSidebar';

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const RootStyle = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden'
});

const MainStyle = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  }
}));

// ----------------------------------------------------------------------

export default function WarehouseLayout() {
  const [open, setOpen] = useState(false);
  const navigate=useNavigate();

  const Controller = () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      navigate('/login');
    }
    const role = localStorage.getItem("role");
    
    if (role === "superadmin") {
      navigate('/dashboard/app', { replace: true });
    }else if (role === "warehouseuser") {
      navigate('/warehouse/equipment', { replace: true });
    }else if (role === "TeamAdmin") {
      navigate('/team/teamadmin', { replace: true });
    } else if (role === "TeamMember") {
      navigate('/team/teammember', { replace: true });
    }
  }

  React.useEffect(()=>{
    Controller()
  },[])

  return (
    <RootStyle>
      <DashboardNavbar onOpenSidebar={() => setOpen(true)} />
      {/* <DashboardSidebar isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} /> */}
      <MainStyle>
        <Outlet />
      </MainStyle>
    </RootStyle>
  );
}
