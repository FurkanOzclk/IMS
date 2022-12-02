import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Blog from './pages/Blog';
import Login from './pages/Login';
import Password from './pages/Password';
import ChangePassword from './pages/ChangePassword';
import ForgotPassword from './pages/ForgotPassword';
import Verify from './pages/Verify';
import NotFound from './pages/Page404';
import Register from './pages/Register';
import Products from './pages/Products';
import DashboardApp from './pages/DashboardApp';

import GetUser from './pages/GetUser';
import SetUser from './pages/SetUser';
import EditUser from './pages/EditUser';

import Profile from './pages/Profile';

import Project from './pages/Project';
import SetProject from './pages/SetProject';
import ViewProject from './pages/ViewProject';
import EditProject from './pages/EditProject';

import Team from './pages/Team';
import SetTeam from './pages/SetTeam';
import EditTeam from './pages/EditTeam';
import ViewTeam from './pages/ViewTeam';

import Recycle from './pages/Recycle';
import ViewRecycle from './pages/ViewRecycle';

import Equipments from './pages/Equipments';
import ViewEquipment from './pages/ViewEquipment'
import EditEquipment from './pages/EditEquipment';
import EditEquipmentTeam from './pages/EditEquipmentTeam';
import EditEquipmentType from './pages/EditEquipmentType';
import SetEquipment from './pages/SetEquipment';
import SetEquipmentType from './pages/SetEquipmentType';
import SetEquipmentTeam from './pages/SetEquipmentTeam';

import Warehouse from './pages/Warehouse';
import ViewWarehouse from './pages/ViewWarehouse';
import SetWarehouse from './pages/SetWarehouse';
import EditWarehouse from './pages/EditWarehouse';

import SetMember from './pages/SetMember';
import EditMember from './pages/EditMember';
import ViewMember from './pages/ViewMember';
// ----------------------------------------------------------------------
import WarehouseLayout from './layouts/warehouse';
import WarehouseUserEquipment from './pages/warehouseuser/WarehouseUserEquipment';
import WarehouseUserSetEquipment from './pages/warehouseuser/WarehouseUserSetEquipment';
import WarehouseUserSetEquipmentType from './pages/warehouseuser/WarehouseUserSetEquipmentType';
import WarehouseUserSetEquipmentTeam from './pages/warehouseuser/WarehouseUserSetEquipmentTeam';
import WarehouseUserViewEquipment from './pages/warehouseuser/WarehouseUserViewEquipment';
import WarehouseUserEditEquipmentType from './pages/warehouseuser/WarehouseUserEditEquipmentType';
import WarehouseUserEditEquipment from './pages/warehouseuser/WarehouseUserEditEquipment';
// ----------------------------------------------------------------------
import TeamAdminView from './pages/TeamAdminView';
import TAeditTeamMember from './pages/TAeditTeamMember';
import TAsetTeamMember from './pages/TAsetTeamMember';
import TAviewTeamMember from './pages/TAviewTeamMember';
import TeamMemberView from './pages/TeamMemberView';
 


export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: 'app', element: <DashboardApp /> },
        { path: 'products', element: <Products /> },

        { path: 'projects', element: <Project /> },
        { path: 'projects/setproject', element: <SetProject /> },
        { path: 'projects/viewproject', element: <ViewProject /> },
        { path: 'projects/editproject', element: <EditProject /> },

        { path: 'blog', element: <Blog /> },

        { path: 'userconfig', element: <GetUser /> },
        { path: 'userconfig/setuser', element: <SetUser /> },
        { path: 'userconfig/edituser', element: <EditUser /> },


        { path: 'profile', element: <Profile /> },

        { path: 'team', element: <Team /> },
        { path: 'team/setteam', element: <SetTeam /> },
        { path: 'team/editteam', element: <EditTeam /> },
        { path: 'team/viewteam', element: <ViewTeam /> },

        { path: 'team/member/setmember', element: <SetMember /> },
        { path: 'team/member/editmember', element: <EditMember /> },
        { path: 'team/member/viewmember', element: <ViewMember /> },

        { path: 'recycle', element: <Recycle /> },
        { path: 'recycle/view', element: <ViewRecycle /> },


        { path: 'equipments', element: <Equipments /> },
        { path: 'equipments/viewequipment', element: <ViewEquipment /> },
        { path: 'equipments/editequipment', element: <EditEquipment /> },
        { path: 'equipments/editequipmenttype', element: <EditEquipmentType /> },
        { path: 'equipments/editequipmentteam', element: <EditEquipmentTeam /> },
        { path: 'equipments/setequipment', element: <SetEquipment /> },
        { path: 'equipments/setequipmenttype', element: <SetEquipmentType /> },
        { path: 'equipments/setequipmentteam', element: <SetEquipmentTeam /> },

        { path: 'warehouse', element: <Warehouse /> },
        { path: 'warehouse/setwarehouse', element: <SetWarehouse /> },
        { path: 'warehouse/viewwarehouse', element: <ViewWarehouse /> },
        { path: 'warehouse/editwarehouse', element: <EditWarehouse /> }
      ],
    },



    
    {
      path: '/warehouse',element: <WarehouseLayout />,
      children: [
        { path: 'equipment', element: <WarehouseUserEquipment /> },
        { path: 'setequipment', element: <WarehouseUserSetEquipment /> },
        { path: 'setequipmentteam', element: <WarehouseUserSetEquipmentTeam /> },
        { path: 'setequipmenttype', element: <WarehouseUserSetEquipmentType /> },
        { path: 'viewequipment', element: <WarehouseUserViewEquipment /> },
        { path: 'editequipmenttype', element: <WarehouseUserEditEquipmentType /> },
        { path: 'editequipment', element: <WarehouseUserEditEquipment /> },
        { path: 'profile', element: <Profile /> },
      ]
    },

    {
      path:'/team',element: <WarehouseLayout />,
      children: [
        { path: 'teamadmin', element: <TeamAdminView /> },
        { path: 'teamadmin/setteammember', element: <TAsetTeamMember /> },
        { path: 'teamadmin/editteammember', element: <TAeditTeamMember /> },
        { path: 'teamadmin/viewteammember', element: <TAviewTeamMember /> },
        { path: 'teammember', element: <TeamMemberView /> },
        { path: 'profile', element: <Profile /> },
      ]
    },

    {
      path: 'login',
      element: <Login />,
    },
    {
      path: 'forgotpassword',
      element: <ForgotPassword />,
    },

    {
      path: 'password',
      element: <Password />,
    },
    {
      path: 'changepassword',
      element: < ChangePassword/>
    },

    {
      path: 'register',
      element: <Register />,
    },
    {
      path: 'verify',
      element: <Verify />,
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/dashboard/app" /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);
}
