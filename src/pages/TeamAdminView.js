import React, { useEffect, useState } from 'react';
import { eq, filter, size } from 'lodash';
import { useNavigate } from 'react-router-dom';
// material
import {
    Card,
    CardHeader,
    CardContent,
    Table,
    Stack,
    Button,
    TableRow,
    TableBody,
    TableCell,
    Container,
    Typography,
    TableContainer,
    TablePagination,
    ListItem,
    ListItemText,
    ListItemIcon,
    Divider,
    Box,
} from '@mui/material';
// components
import S3FileUpload from 'react-s3';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
// import {Buffer} from 'buffer';
import * as buffer from "buffer"

import { Person2, Groups, Folder, Construction, Circle, ExpandMore } from '@mui/icons-material/';
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../sections/@dashboard/user';
import TeamAdminMoreMenu from '../sections/@dashboard/teamadmin/TeamAdminMoreMenu';

import { axiosInstance } from "../axios/Axios";
import Login from './Login';

// mock

// Buffer.from('anything','base64');
window.Buffer = buffer.Buffer;

const config = {
    bucketName: 'kgtuprojects', 
    region: 'eu-east-1',
    accessKeyId: 'AKIAZFOEP2CNIVI6G47N' ,
    secretAccessKey: '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',
}


const TABLE_HEAD = [
    { id: 'fullname', label: 'Fullname', alignRight: false },
    { id: 'role', label: 'Role', alignRight: false },
    { id: 'email', label: 'Email', alignRight: false },
    { id: '' },
];



function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    if (query) {
        return filter(array, (_user) => _user.user.fullname.toLowerCase().indexOf(query.toLowerCase()) !== -1);
        // 
    }
    return stabilizedThis.map((el) => el[0]);
}



function useForceUpdate() {
    const [value, setValue] = useState(0);
    return () => setValue((value) => value + 1);
}

const TeamAdminView = () => {
    const [data, setData] = useState({});
    const [members, setMembers] = useState([]);
    const [team, setTeam] = useState([]);
    const [project, setProject] = useState([]);
    const [equipment, setEquipment] = useState([]);
    const [equipmentType, setEquipmentType] = useState([]);

    const forceUpdate = useForceUpdate();

    async function getData() {
        try {
            const { data } = await axiosInstance.get('/teamadmin/')
            console.log(data);
            setData(data)
            setTeam(data.team)
            setMembers(data.members);
            setProject(data.team.project)
            setEquipment(data.equipments)
            setEquipmentType(data.equipmenttypes)

        } catch (error) {
            toast.error("Get Data Failed");
            console.log(error);
        }

    }

    async function getData2() {
        try {
            const { data } = await axiosInstance.get('/teamadmin/member/')
        } catch (error) {
            toast.error("Get Data Failed");
            console.log(error);
        }
    }


    useEffect(() => {
        getData()
        getData2()
    }, [])




    const navigate = useNavigate();
    const setUser = async () => {
        navigate('/team/teamadmin/setteammember');
    };

    const addReport = async (e) => {
        console.log(e.target.files[0]);
        S3FileUpload.uploadFile(e.target.files[0], config)
        .then(data=> console.log(data.location))
        .catch(err => console.log(err))
    }

    const [page, setPage] = useState(0);

    const [order, setOrder] = useState('asc');

    const [selected, setSelected] = useState([]);

    const [orderBy, setOrderBy] = useState('fullname');

    const [filterName, setFilterName] = useState('');

    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };




    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = members.map((n) => n.fullname);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
        }
        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleFilterByName = (event) => {
        setFilterName(event.target.value);

    };

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - members.length) : 0;

    const filteredUsers = applySortFilter(members, getComparator(order, orderBy), filterName);

    const isUserNotFound = filteredUsers.length === 0;

    const updateGetData = {
        func: getData
    }



    return (
        <Page title="Team Admin">
            <ToastContainer />
            <Container maxWidth="lg" >
                <Card sx={{ top: +10, }}>
                    <CardHeader title="About Team" />
                    <CardContent>
                        <Cardinfo text={`Team Name: ${team.name}`} icon={<Groups />} />
                        <Cardinfo text={`Project Name: ${project.name}`} icon={<Folder />} />
                    </CardContent>
                </Card>
            </Container>
            <Container sx={{ mt: 2 }}>

                <Card>
                    <Stack direction="row" alignItems="baseline" justifyContent="space-between" m={2}>
                        <CardHeader sx={{ ml: -2 }} title="Team Members" />
                        <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={setUser}>
                            New Member
                        </Button>
                    </Stack>

                    <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

                    <Scrollbar>
                        <TableContainer sx={{ minWidth: 800 }}>
                            <Table>
                                <UserListHead
                                    order={order}
                                    orderBy={orderBy}
                                    headLabel={TABLE_HEAD}
                                    rowCount={members.length}
                                    numSelected={selected.length}
                                    onRequestSort={handleRequestSort}
                                    onSelectAllClick={handleSelectAllClick}
                                />
                                <TableBody>
                                    {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                        const { _id, email, fullname, role, user } = row;
                                        const isItemSelected = selected.indexOf(fullname) !== -1;

                                        return (
                                            <TableRow
                                                hover
                                                key={_id}
                                                tabIndex={-1}
                                                role="checkbox"
                                                selected={isItemSelected}
                                                aria-checked={isItemSelected}
                                            >

                                                <TableCell component="th" scope="row" >
                                                    <Stack direction="row" alignItems="center" spacing={2}>
                                                        <Typography variant="subtitle2" noWrap>
                                                            {user.fullname}
                                                        </Typography>
                                                    </Stack>
                                                </TableCell>
                                                <TableCell align="left">{user.role}</TableCell>
                                                <TableCell align="left">{user.email}</TableCell>



                                                <TableCell align="right">
                                                    <TeamAdminMoreMenu id={_id} fullname={user.fullname} email={user.email} funcs={updateGetData} phone={user.Phone} />
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                    {emptyRows > 0 && (
                                        <TableRow style={{ height: 53 * emptyRows }}>
                                            <TableCell colSpan={6} />
                                        </TableRow>
                                    )}
                                </TableBody>

                                {isUserNotFound && (
                                    <TableBody>
                                        <TableRow>
                                            <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                                                <SearchNotFound searchQuery={filterName} />
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                )}
                            </Table>
                        </TableContainer>
                    </Scrollbar>

                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={members.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Card>
            </Container>
            <Container maxWidth="lg" sx={{ mt: 2 }} >
                <Card sx={{ top: +10, }}>
                    <Stack direction="row" alignItems="baseline" justifyContent="space-between">
                        <CardHeader title="Reports" />
                        <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} sx={{ mr: 2 }} component="label" onClick={addReport}>
                            New Report
                            <input hidden accept="pdf/*" multiple type="file" />
                        </Button>
                    </Stack>
                    <CardContent>
                        <Typography>Selam</Typography>
                    </CardContent>
                </Card>
            </Container>
            <Container sx={{ mt: 2 }}>
                <Card sx={{ top: +10, }}>
                    <CardHeader title="Equipment Details" />
                    <CardContent>
                        {equipment.map(({ equipment }) =>
                            <div>
                                <Cardinfo text={`Equipment : ${equipment.equipmenttype.name}`} icon={<Construction />} />
                                <Container>
                                    <Cardinfo text={`Equipment Brand: ${equipment.equipmenttype.brand}`} icon={<ExpandMore />} />
                                    <Cardinfo text={`Serial Number: ${equipment.serialnumber}`} icon={<ExpandMore />} />
                                    <Cardinfo text={`Description: ${equipment.equipmenttype.description}`} icon={<ExpandMore />} />
                                </Container>

                            </div>
                        )}
                    </CardContent>
                </Card>



            </Container>
        </Page>

    )

}


const Cardinfo = ({ icon, text }) => {
    return (
        <ListItem>
            <ListItemIcon>
                {icon}
            </ListItemIcon>
            <ListItemText primary={text} />
        </ListItem>
    )
}



export default TeamAdminView;