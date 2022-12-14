import React, { useEffect, useState } from 'react';
import { eq, filter } from 'lodash';
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
    Link,
    Accordion,
    AccordionDetails,
    AccordionSummary,
} from '@mui/material';
// components
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

import { Person2, Groups, Folder, Construction, ExpandMore, FileCopy } from '@mui/icons-material/';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../sections/@dashboard/user';
import TeamAdminMoreMenu from '../sections/@dashboard/teamadmin/TeamAdminMoreMenu';


import { axiosInstance } from "../axios/Axios";
import Login from './Login';
// mock




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

const TeamMemberView = () => {
    const [data, setData] = useState({});
    const [members, setMembers] = useState([]);
    const [team, setTeam] = useState([]);
    const [project, setProject] = useState([]);
    const [equipment, setEquipment] = useState([]);
    const [equipmentType, setEquipmentType] = useState([]);
    const [report, setReport] = useState([])

    const forceUpdate = useForceUpdate();

    async function getData() {
        try {
            const { data } = await axiosInstance.get('/team/member/info')
            setData(data)
            setTeam(data.team)
            setMembers(data.members);
            setProject(data.team.project)
            setEquipment(data.equipments)
            setEquipmentType(data.equipmenttypes)
            setReport(data.team.project.reports)
        } catch (error) {
            toast.error("Get Data Failed");
            console.log(error);
        }
    }


    useEffect(() => {
        getData()
    }, [])



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
        <Page title="Team Member">
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
            <Container sx={{ mt: 5 }}>
                <Card >
                    <CardHeader title="Team Members" />
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
            <Container maxWidth="lg" sx={{ mt: 4 }} >
                <Card sx={{ top: +4, }}>
                    <CardHeader title="Reports" />

                    <CardContent>
                        {report.map(r => {
                            return (
                                <Cardinfo2 link={r.name} icon={<FileCopy />} href={r.location} />
                            )
                        })}
                    </CardContent>
                </Card>
            </Container>
            <Container maxWidth="lg" sx={{ mt: 4 }} >
                <Card sx={{ top: +4, }}>
                    <CardHeader title="Equipments" />
                    <CardContent>
                        {equipment.map(({ equipment }) =>
                            <div>
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                        sx={{mb:-2}}
                                    >
                                        <Cardinfo text={`Equipment : ${equipment.equipmenttype.name}`} icon={<Construction />} />
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Container>
                                            <Cardinfo text={`Equipment Brand: ${equipment.equipmenttype.brand}`} icon={<ExpandMore />} />
                                            <Cardinfo text={`Serial Number: ${equipment.serialnumber}`} icon={<ExpandMore />} />
                                            <Cardinfo text={`Description: ${equipment.equipmenttype.description}`} icon={<ExpandMore />} />
                                        </Container>
                                    </AccordionDetails>
                                </Accordion>
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
const Cardinfo2 = ({ icon, link, href }) => {
    return (
        <ListItem>
            <ListItemIcon>
                {icon}
            </ListItemIcon>
            <Link href={href} underline="hover">
                {link}
            </Link>

        </ListItem>
    )

}

export default TeamMemberView;