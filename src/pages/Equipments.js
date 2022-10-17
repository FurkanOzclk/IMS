import React, { useEffect, useState, useRef } from 'react';
import { filter } from 'lodash';
import { useNavigate, Link as RouterLink } from 'react-router-dom';

// material
import {
    Box,
    Card,
    Grid,
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
import { UserListHead, UserListToolbar, UserMoreMenu } from '../sections/@dashboard/user';
import EquipmenMoreMenu from '../sections/@dashboard/equipment/EquipmentMoreMenu';
import Label from '../components/Label';

import { AppWidgetSummary, } from '../sections/@dashboard/app';

import { axiosInstance } from "../axios/Axios";
// mock




const TABLE_HEAD_EQUİPMENTS = [
    { id: 'equipmenttype', label: 'Equipment type', alignRight: false },
    { id: 'warehouse', label: 'Warehouse', alignRight: false },
    { id: 'status', label: 'Status', alignRight: false },
    { id: '' },
];

const TABLE_HEAD_TYPES = [
    { id: 'brand', label: 'Brand', alignRight: false },
    { id: 'name', label: 'Name', alignRight: false },
    { id: 'description', label: 'Description', alignRight: false },
    { id: '' },
];

const TABLE_HEAD_TEAMS = [
    { id: 'serailnumber', label: 'Serialnumber', alignRight: false },
    { id: 'team', label: 'Team', alignRight: false },
    { id: 'assignedDate', label: 'Assigned Date', alignRight: false },
    { id: 'unassignedDate', label: 'Unassigned Date', alignRight: false },
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




function useForceUpdate() {
    const [value, setValue] = useState(0);
    return () => setValue((value) => value + 1);
}



const Equipments = () => {
    const [data, setData] = useState([]);
    const [users, setUsers] = useState([1, 2, 3, 4, 5]);
    const [dataType, setDataType] = useState("");
    const [title, setTitle] = useState("Equipment");
    const [buttonTitle, setButtonTitle] = useState("New Equipment");

    function applySortFilter(array, comparator, query) {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });
        if (query) {
            if (dataType === "equipments") {
                return filter(array, (_data) => _data.equipmenttype.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
            }
            if (dataType === "equipmentType") {
                return filter(array, (_data) => _data.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
            }
            if (dataType === "equipmentTeam") {
                return filter(array, (_data) => _data.team.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
            }
            // 
        }
        return stabilizedThis.map((el) => el[0]);
    }

    async function getDataFromEquipments() {
        try {

            const { data } = await axiosInstance.get('/equipment/')
            setDataType("equipments");
            setTitle("Equipment");
            setButtonTitle("New Equipment");
            console.log(data);

            setData(data);
        } catch (error) {
            toast.error("Get Data Failed");
            console.log(error);
        }
    }

    async function getDataFromEquipmentTypes() {
        try {

            const { data } = await axiosInstance.get('/equipment/type/all')
            setDataType("equipmentType");
            setTitle("Equipment Type");
            setButtonTitle("New Equipment Type");
            console.log(data);

            setData(data);
        } catch (error) {
            toast.error("Get Data Failed");
            console.log(error);
        }
    }

    async function getDataFromEquipmentTeams() {
        try {
            const { data } = await axiosInstance.get('/equipment/team')
            setDataType("equipmentTeam");
            setTitle("Equipment Team");
            setButtonTitle("Assign")
            console.log(data);

            setData(data);
        } catch (error) {
            toast.error("Get Data Failed");
            console.log(error);
        }
    }



    let userData;
    useEffect(() => {
        getDataFromEquipments()
    }, [])



    const navigate = useNavigate();
    const setEquipment = async () => {
        if (dataType === "equipments") {
            navigate('/dashboard/equipments/setequipment');
        } else if (dataType === "equipmentType") {
            navigate('/dashboard/equipments/setequipmenttype');
        } else if (dataType === "equipmentTeam") {
            navigate('/dashboard/equipments/setequipmentteam');
        }
    };

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

    const forceUpdate = useForceUpdate();
    const refex = useRef(null);


    const updateGetDataTypes = {
        func: getDataFromEquipmentTypes
    }

    const updateGetData = {
        func: getDataFromEquipments
    }


    const updateGetDataTeam = {
        func: getDataFromEquipmentTeams
    }

    const exportExcel = () => {
        if (dataType === "equipments") {
            const _equipments = data;
            _equipments.forEach(data => {
                data.equipmenttype = `${data.equipmenttype.name} - ${data.equipmenttype.brand}`
            });
            const _warehouse = data;
            _warehouse.forEach(data => {
                data.warehouse = data.warehouse.name
            })

            const workSheet = XLSX.utils.json_to_sheet(data)
            const workBook = XLSX.utils.book_new()
            XLSX.utils.book_append_sheet(workBook, workSheet, "equipments")
            // Download
            XLSX.writeFile(workBook, "EquipmentData.xlsx")
        }
        if (dataType === "equipmentType") {
            const workSheet = XLSX.utils.json_to_sheet(data)
            const workBook = XLSX.utils.book_new()
            XLSX.utils.book_append_sheet(workBook, workSheet, "equipmentTypes")
            // Download
            XLSX.writeFile(workBook, "EquipmentTypesData.xlsx")
        }
        if(dataType === "equipmentTeam") {
            const _equipment = data;
            _equipment.forEach(data => {
                data.equipment = data.equipment.serialnumber
            })
            const _team = data;
            _team.forEach(data => {
                data.team = data.team.name;
            })

            const workSheet = XLSX.utils.json_to_sheet(data)
            const workBook = XLSX.utils.book_new()
            XLSX.utils.book_append_sheet(workBook, workSheet, "equipmentTypes")
            // Download
            XLSX.writeFile(workBook, "EquipmentTeamsData.xlsx")
        }

    }



    const TableReturner = () => {
        if (dataType === "equipments") {
            return (
                <Table >
                    <UserListHead
                        order={order}
                        orderBy={orderBy}
                        headLabel={TABLE_HEAD_EQUİPMENTS}
                        rowCount={data.length}
                        numSelected={selected.length}
                        onRequestSort={handleRequestSort}
                        onSelectAllClick={handleSelectAllClick}
                    />
                    <TableBody>
                        {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                            const { _id,  serialnumber, status } = row;
                            let { warehouse, equipmenttype } = row;
                                        if (warehouse === null) {
                                            warehouse = { name: "Deleted Item" }
                                        }
                                        if (equipmenttype === null) {
                                            equipmenttype = { brand: "Deleted" , name: "Item" }
                                        }
                            const isItemSelected = selected.indexOf(equipmenttype) !== -1;

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
                                                {`${equipmenttype.brand}  ${equipmenttype.name}`}
                                            </Typography>
                                        </Stack>
                                    </TableCell>
                                    <TableCell align="left">{warehouse.name}</TableCell>
                                    <TableCell align="left">{status}</TableCell>



                                    <TableCell align="right">
                                        <EquipmenMoreMenu id={_id} type="eq" name={equipmenttype.name} eq={equipmenttype} warehouse={warehouse} data={row} funcs={updateGetData} />
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
            )
        }
        if (dataType === "equipmentType") {
            return (
                <Table >
                    <UserListHead
                        order={order}
                        orderBy={orderBy}
                        headLabel={TABLE_HEAD_TYPES}
                        rowCount={data.length}
                        numSelected={selected.length}
                        onRequestSort={handleRequestSort}
                        onSelectAllClick={handleSelectAllClick}
                    />
                    <TableBody>
                        {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                            const { _id, name, brand, description } = row;
                            const isItemSelected = selected.indexOf(name) !== -1;

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
                                                {brand}
                                            </Typography>
                                        </Stack>
                                    </TableCell>
                                    <TableCell align="left">{name}</TableCell>
                                    <TableCell align="left">{description}</TableCell>



                                    <TableCell align="right">
                                        <EquipmenMoreMenu id={_id} type="type" name={name} data={row} funcs={updateGetDataTypes} />
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
            )
        }
        if (dataType === "equipmentTeam") {
            return (
                <Table >
                    <UserListHead
                        order={order}
                        orderBy={orderBy}
                        headLabel={TABLE_HEAD_TEAMS}
                        rowCount={data.length}
                        numSelected={selected.length}
                        onRequestSort={handleRequestSort}
                        onSelectAllClick={handleSelectAllClick}
                    />
                    <TableBody>
                        {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                            const { _id, assignedDate, unassignedDate } = row;
                            let { equipment, team } = row;
                                        if (equipment === null) {
                                            equipment = { serialnumber: "Deleted Item" }
                                        }
                                        if (team === null) {
                                            team = { name: "Deleted Item" }
                                        }
                            const isItemSelected = selected.indexOf(team.name) !== -1;

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
                                        <Typography variant="subtitle2" noWrap>
                                            {equipment.serialnumber}
                                        </Typography>
                                    </TableCell>

                                    <TableCell component="th" scope="row" >
                                        <Stack direction="row" alignItems="center" spacing={2}>
                                            <Typography variant="subtitle2" noWrap>
                                                {team.name}
                                            </Typography>
                                        </Stack>
                                    </TableCell>
                                    <TableCell align="left">{assignedDate}</TableCell>
                                    <TableCell align="left">{unassignedDate}</TableCell>



                                    <TableCell align="right">
                                        <EquipmenMoreMenu id={_id} type="team" name="" data={row} unassignDate={unassignedDate} funcs={updateGetDataTeam} />
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
            );
        }
    }


    return (
        <Page title="Equipments" id="pagem">
            <ToastContainer />
            <Container>
                <Grid container spacing={3} mb={4}>

                    <Grid item xs={12} sm={6} md={4} >
                        <AppWidgetSummary pyx={3} subtitle="Equipment Type" color="info" funcs={updateGetDataTypes} />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <AppWidgetSummary pyx={3} subtitle="Equipment" color="warning" funcs={updateGetData} />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <AppWidgetSummary pyx={3} subtitle="Equipment Team" color="error" funcs={updateGetDataTeam} />
                    </Grid>

                </Grid>



                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        {`${title}s`}
                    </Typography>
                    <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={setEquipment}>
                        {`${buttonTitle}`}
                    </Button>
                </Stack>
                <Card>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" m={1}>

                        <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />
                        <Button variant="contained" startIcon={<Iconify icon="bi:filetype-xlsx" />} onClick={exportExcel}>
                            Export Excel
                        </Button>
                    </Stack>
                    <Scrollbar>
                        <TableContainer ref={refex} sx={{ minWidth: 800 }}>
                            <TableReturner />
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




export default Equipments;