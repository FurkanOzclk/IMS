// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: 'Home',
    path: '/dashboard/app',
    icon: getIcon('ant-design:home-filled'),
  },
  {
    title: 'Users',
    path: '/dashboard/userconfig',
    icon: getIcon('fa6-solid:user-gear'),
  },
  {
    title: 'Projects',
    path: '/dashboard/projects',
    icon: getIcon('bxs:folder'),
  },
  {
    title: 'Teams',
    path: '/dashboard/team',
    icon: getIcon('fa-solid:users'),
  },
  {
    title: 'Equipments',
    path: '/dashboard/equipments',
    icon: getIcon('fa-solid:tools'),
  },
  // {
  //   title: 'Products',
  //   path: '/dashboard/products',
  //   icon: getIcon('fa-solid:tools'),
  // },
  // {
  //   title: 'Projeler',
  //   path: '/dashboard/blog',
  //   icon: getIcon('bxs:folder'),
  // },

  // {
  //   title: 'logout',
  //   path: '/login',
  //   icon: getIcon('eva:lock-fill'),
  // },
  {
    title: 'Warehouse',
    path: '/dashboard/warehouse',
    icon: getIcon('material-symbols:warehouse-rounded'),
  },
  {
    title: 'Recycle',
    path: '/dashboard/recycle',
    icon: getIcon('mdi:recycle'),
  },
  {
    title: 'Not found',
    path: '/404',
    icon: getIcon('eva:alert-triangle-fill'),
  },
];

export default navConfig;
