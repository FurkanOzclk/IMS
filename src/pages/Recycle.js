import React, { useEffect, useState } from 'react';
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
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
import RecycleMoreMenu from '../sections/@dashboard/recycle/RecycleMoreMenu';


import { axiosInstance } from "../axios/Axios";
// mock




const TABLE_HEAD = [
    { id: 'name', label: 'Name', alignRight: false },
    { id: 'type', label: 'Type', alignRight: false },
    { id: 'deletedby', label: 'Deleted By', alignRight: false },
    { id: 'deletedat', label: 'Deleted At', alignRight: false },
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
        return filter(array, (_data) => {

            if (_data.data.name === undefined && _data.data.team !== undefined) {
                if (_data.type === "team") {
                    _data.data.name = _data.data.team.name
                } else {
                    _data.data.name = _data.type
                }

            } else if (_data.data.name === undefined) {
                _data.data.name = _data.type
            }
            return (
                _data.data.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
            )


        });
        // 
    }
    return stabilizedThis.map((el) => el[0]);
}





const Recycle = () => {
    const [data, setData] = useState([]);

    const [users, setUsers] = useState([1, 2, 3, 4, 5]);

    async function getData() {
        try {
            const { data } = await axiosInstance.get('/recyclebin/')
            setData(data);
        } catch (error) {
            toast.error("Get Data Failed");
            console.log(error);
        }
    }

    let userData;
    useEffect(() => {
        getData()
    }, [])





    const [page, setPage] = useState(0);

    const [order, setOrder] = useState('asc');

    const [selected, setSelected] = useState([]);

    const [orderBy, setOrderBy] = useState('name');

    const [filterName, setFilterName] = useState('');

    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };




    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = data.map((n) => n.name);
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

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

    const filteredUsers = applySortFilter(data, getComparator(order, orderBy), filterName);

    const isUserNotFound = filteredUsers.length === 0;


    const updateGetData = {
        func: getData
    }

    const exportExcel = () => {
        const _data=data;
        _data.forEach(data => {
            data.data=data.data.name
            data.deletedby=data.deletedby.fullname
        });

        const workSheet = XLSX.utils.json_to_sheet(data)
        const workBook = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(workBook, workSheet, "Recycle")
        // Download
        XLSX.writeFile(workBook, "RecycleData.xlsx")
    }

    return (
        <Page title="Recycle">
            <ToastContainer />
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Recycle Bin
                    </Typography>
                </Stack>
                <Card>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" m={1}>
                        <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />
                        <Button variant="contained" startIcon={<Iconify icon="bi:filetype-xlsx" />} onClick={exportExcel}>
                            Export Excel
                        </Button>
                    </Stack>
                    <Scrollbar>
                        <TableContainer sx={{ minWidth: 800 }}>
                            <Table>
                                <UserListHead
                                    order={order}
                                    orderBy={orderBy}
                                    headLabel={TABLE_HEAD}
                                    rowCount={data.length}
                                    numSelected={selected.length}
                                    onRequestSort={handleRequestSort}
                                    onSelectAllClick={handleSelectAllClick}
                                />
                                <TableBody>
                                    {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                        const { _id, data, type, deletedby, deletedAt } = row;
                                        const isItemSelected = selected.indexOf(_id) !== -1;

                                        if (data.name === undefined) {
                                            data.name = data.fullname;
                                        }

                                        if (type === "team" && data.name === undefined) {

                                            data.name = data.team.name
                                        }
                                        if (type === "member" && data.name === undefined) {

                                            data.name = data.user.fullname
                                        }
                                        if (type === "equipment" && data.name === undefined) {

                                            data.name = data.serialnumber
                                        }
                                        if (type === "equipmentteam" && data.name === undefined) {

                                            data.name = type
                                        }
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
                                                            {data.name}
                                                        </Typography>
                                                    </Stack>
                                                </TableCell>
                                                <TableCell align="left">{type}</TableCell>
                                                <TableCell align="left">{deletedby.fullname}</TableCell>
                                                <TableCell align="left">{deletedAt}</TableCell>


                                                <TableCell align="right">
                                                    <RecycleMoreMenu id={_id} name={data.name} data={row} funcs={updateGetData} />
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
                        count={data.length}
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

export default Recycle;