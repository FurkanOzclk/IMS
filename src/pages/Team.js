import React, { useEffect, useState, useRef } from 'react';
import { filter } from 'lodash';
import { useNavigate } from 'react-router-dom';
// material
import {
    Card,
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
} from '@mui/material';
// components
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import * as XLSX from 'xlsx/xlsx.mjs';
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import { UserListToolbar } from '../sections/@dashboard/user';
import TeamListHead from '../sections/@dashboard/team/TeamListHead'
import { axiosInstance } from "../axios/Axios";

// mock
import TeamMoreMenu from '../sections/@dashboard/team/TeamMoreMenu';



const TABLE_HEAD = [
    { id: 'teamName', label: 'Team Name', alignCenter: true },
    { id: 'projectName', label: 'ProjectName', alignCenter: true },
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
        return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    }
    return stabilizedThis.map((el) => el[0]);
}


const Team = () => {

    const tableRef = useRef(null);
    const [data, setData] = useState({});
    const [teams, setTeams] = useState([{ sayı: 1, project: { name: "" } }, { sayı: 2, project: { name: "" } }]);
    const [project, setProject] = useState();
    async function getData() {
        try {
            const { data } = await axiosInstance.get('/team/')
            setData(data);
            setTeams(data.teams);
            setProject(teams.project);
        } catch (error) {
            toast.error("Get Data Failed");
            console.log(error);
        }
    }


    useEffect(() => {
        getData()
    }, [])

    const navigate = useNavigate();
    const setTeam = async () => {
        navigate('/dashboard/team/setteam');
    };

    const [page, setPage] = useState(0);

    const [order, setOrder] = useState('asc');

    const [orderBy, setOrderBy] = useState('name');

    const [filterName, setFilterName] = useState('');

    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
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

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - teams.length) : 0;

    const filteredUsers = applySortFilter(teams, getComparator(order, orderBy), filterName);

    const isUserNotFound = filteredUsers.length === 0;

    const updateGetData = {
        func: getData
    }


    const exportExcel = () => {
        const _teams = teams;
        _teams.forEach(team => {
            team.project = team.project.name
        });

        const workSheet = XLSX.utils.json_to_sheet(_teams)
        const workBook = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(workBook, workSheet, "teams")
        // Download
        XLSX.writeFile(workBook, "TeamData.xlsx")
    }
    

    return (
        <Page title="Team">
            <ToastContainer />
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Teams
                    </Typography>
                    <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={setTeam}>
                        New Team
                    </Button>
                </Stack>
                <Card>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" m={1}>
                        <UserListToolbar filterName={filterName} onFilterName={handleFilterByName} />

                        <Button variant="contained" startIcon={<Iconify icon="bi:filetype-xlsx" />} onClick={exportExcel}>
                            Export Excel
                        </Button>
                    </Stack>
                    <Scrollbar>
                        <TableContainer sx={{ minWidth: 800 }}>
                            <Table ref={tableRef}>
                                <TeamListHead
                                    order={order}
                                    orderBy={orderBy}
                                    headLabel={TABLE_HEAD}
                                    rowCount={teams.length}
                                    onRequestSort={handleRequestSort}
                                /> 
                                <TableBody>
                                    {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                        const { _id, name } = row;
                                        let { project } = row;
                                        if (project === null) {
                                            project = { name: "Deleted Item" }
                                        }

                                        return (
                                            <TableRow
                                                hover
                                                key={_id}
                                                tabIndex={-1}
                                                role="checkbox"
                                            >
                                                <TableCell align="center" >{name}</TableCell>
                                                <TableCell align="center">{project.name}</TableCell>
                                                <TableCell align="right">
                                                    <TeamMoreMenu id={_id} teamName={name} projectName={project.name} funcs={updateGetData} />
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
                        count={teams.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Card>
            </Container>
        </Page>

    )
}


export default Team;