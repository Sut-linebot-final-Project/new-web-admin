import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Alert, Box, Button, ButtonGroup, Snackbar } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { url } from '../../service/serviceUrl';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

interface intent {
    id: string,
    displayName: string,
}

function timeout(delay: number) {
    return new Promise(res => setTimeout(res, delay));
}
interface Icountres {
    intent: string,
    response: string
}

const IntentTable: React.FC<{ intentData: intent[] }> = ({ intentData }) => {
    const [openSnack, setOpenSnack] = React.useState(false);

    const [countRes, setCountRes] = React.useState<Icountres[]>([])


    async function getCountRes() {
        const apiUrl = `${url}/pg/countRes`;
        axios.get(apiUrl)
            .then(response => {
                console.log('API Response:', response.data);
                setCountRes(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });

    }

    const hadleDelete = (intentId: string) => {
        const data = {
            intentId
        }
        const apiUrl = `${url}/deleteIntent`;
        axios.post(apiUrl, data)
            .then(async response => {
                console.log('Response:', response.data);
                setOpenSnack(true);
                await timeout(1000);
                location.reload();
            })
            .catch(error => {
                console.error('Error:', error);
            });


    }
    const filterdata = (intent: string) => {
        console.log(intent);
        console.log(countRes);
        const result = countRes.filter(item => item.intent == intent)
        // console.log(result);
        if (result.length > 0) {
            return result[0].response
        } 
        return 0
    }
    React.useEffect(() => {
        getCountRes();
    }, []);
    return (
        <Box sx={{ height: '70vh' }}>
            <TableContainer sx={{ maxHeight: '70vh ' }}>
                <Snackbar open={openSnack} autoHideDuration={100} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                    <Alert
                        severity="success"
                        variant="filled"
                        color='error'
                        sx={{ width: '100%' }}
                    >
                        ลบสำเร็จ
                    </Alert>
                </Snackbar>
                <Table stickyHeader sx={{ maxWidth: '100%' }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>หัวข้อ</StyledTableCell>
                            <StyledTableCell align="center">จำนวนการตอบกลับ</StyledTableCell>
                            <StyledTableCell align="center">Action</StyledTableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {intentData.map((intent) => (
                            <StyledTableRow key={intent.id}>
                                <StyledTableCell component="th" scope="row">
                                    {intent.displayName}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    {filterdata(intent.displayName)}
                                </StyledTableCell>
                                <StyledTableCell align="center">

                                    <ButtonGroup variant="contained" aria-label="Basic button group" >
                                        <Link to={`/Detail/${intent.displayName}`} >
                                            <Button color='secondary'>แก้ไข</Button>
                                        </Link>
                                        <Button color='error' onClick={() => hadleDelete(intent.id)}>ลบ</Button>
                                    </ButtonGroup>

                                </StyledTableCell>

                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

export default IntentTable;