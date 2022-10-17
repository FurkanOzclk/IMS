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
import { UserListToolbar } from '../sections/@dashboard/user';
import TeamListHead from '../sections/@dashboard/team/TeamListHead'
import { axiosInstance } from "../axios/Axios";

// mock
import WarehouseMoreMenu from '../sections/@dashboard/warehouse/WarehouseMoreMenu';



const TABLE_HEAD = [
    { id: 'warehouseName', label: 'Warehouse Name', alignCenter: true },
    { id: 'warehouseUser', label: 'Warehouse User', alignCenter: true },
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


const Warehouse = () => {

    const [data, setData] = useState({});
    const [warehouses, setWarehouses] = useState([]);

    async function getData() {
        try {
            const { data } = await axiosInstance.get('/warehouse/')
            setData(data);
            setWarehouses(data.warehouses);
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
        navigate('/dashboard/warehouse/setwarehouse');
    };

    const updataGetData = {
        func: getData
    }

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

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - warehouses.length) : 0;

    const filteredUsers = applySortFilter(warehouses, getComparator(order, orderBy), filterName);

    const isUserNotFound = filteredUsers.length === 0;

    const exportExcel = () => {
        const _warehouses=warehouses;
        _warehouses.forEach(warehouses => {
        warehouses.user=warehouses.user.fullname
        });
        const workSheet = XLSX.utils.json_to_sheet(warehouses)
        const workBook = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(workBook, workSheet, "warehouses")
        // Download
        XLSX.writeFile(workBook, "WarehouseData.xlsx")
    }

    return (
        <Page title="Warehouse">
            <ToastContainer />
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Warehouses
                    </Typography>
                    <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={setTeam}>
                        New Warehouse
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
                            <Table>
                                <TeamListHead
                                    order={order}
                                    orderBy={orderBy}
                                    headLabel={TABLE_HEAD}
                                    rowCount={warehouses.length}
                                    onRequestSort={handleRequestSort}
                                />
                                <TableBody>
                                    {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                        const { _id, name } = row;
                                        let { user } = row;
                                        if (user === null) {
                                            user = { fullname: "Deleted Item" }
                                        }


                                        return (
                                            <TableRow
                                                hover
                                                key={_id}
                                                tabIndex={-1}
                                                role="checkbox"
                                            >
                                                <TableCell align="center" >{name}</TableCell>
                                                <TableCell align="center">{user.fullname}</TableCell>
                                                <TableCell align="right">
                                                    <WarehouseMoreMenu id={_id} warehouseName={name} user={user} funcs={updataGetData} />
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
                        count={warehouses.length}
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


export default Warehouse;