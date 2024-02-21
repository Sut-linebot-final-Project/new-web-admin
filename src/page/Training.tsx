import * as React from 'react';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';

import axios from 'axios';

import { Button, Grid, ButtonGroup } from '@mui/material';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import TrainingCard from '../components/training/card';
import { url } from '../service/serviceUrl';



import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import TrainingModal from '../components/training/trainModal';


export interface Iword {
    id: number;
    question: string;
    status: string;
}

// const style = {
//     overflow: 'auto',
//     flex: 1,
//     width: '100%',
//     height: '60vh',
//     borderRadius: 2,
//     border: '1px solid',
//     borderColor: 'divider',
//     backgroundColor: 'background.paper',
// };

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


const BodyPaper = styled(Paper)(({ theme }) => ({
    width: '100%',
    // height: "80vh",
    // overflow: 'auto',
    padding: theme.spacing(2),
    ...theme.typography.body2,
}));

export default function Training() {
    const [data, setData] = React.useState<Iword[]>([]);
    const [page, setPage] = React.useState(0);
    const [isDialogOpen, setDialogOpen] = React.useState(false);
    const [word, setWord] = React.useState<string>('');
    const [type,setType] = React.useState<string>('');

    const handleOpenDialog = () => {
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
    };

    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
    };

    React.useEffect(() => {
        const apiUrl = `${url}/pg/questionList`;
        axios.get(apiUrl)
            .then(response => {
                console.log('API Response:', response.data);
                setData(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const notAssign = data.filter(item => item.status == 'not assign');
    const assign = data.filter(item => item.status == 'assign');
    const del = data.filter(item => item.status == 'delete');

    return (
        <Box sx={{ flexGrow: 0, mx: 10, mt: 10, mb: 20 }}>
            <TrainingModal isOpen={isDialogOpen} onClose={handleCloseDialog} word={word} type={type} />
            <Typography sx={{ mt: 4, mb: 2 }} variant="h5" component="div"></Typography>
            <Grid container spacing={2}>
                <Grid item xs={9}>
                    {/* <h2>คำถามที่ตอบไม่ได้</h2> */}
                    <BodyPaper elevation={12}>

                        {/* <List sx={style}>
                            {notAssign.map((data) => (
                                <React.Fragment key={data.id}>
                                    <ListItem
                                        key={data.id}
                                        secondaryAction={<TrianningMenu word={data.word} id={data.id} />}
                                    >
                                        <ListItemText primary={data.word} />
                                    </ListItem>
                                    <Divider component="li" />
                                </React.Fragment>
                            ))}
                        </List> */}
                        <TableContainer sx={{ width: "100%" }} component={Paper}>
                            <Table aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>คำถามที่ตอบไม่ได้</StyledTableCell>
                                        <StyledTableCell align="center"></StyledTableCell>
                                        {/* <StyledTableCell align="center">Delete</StyledTableCell> */}

                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {/* {notAssign.map((row) => (
                                        <StyledTableRow key={row.id}>
                                            <StyledTableCell component="th" scope="row">
                                                {row.question}
                                            </StyledTableCell>
                                            <StyledTableCell align="right">
                                                <Button variant='contained' color='info'>Assign</Button>
                                                <Button variant='contained' color='error'>Delete</Button>
                                            </StyledTableCell>
                                            

                                        </StyledTableRow>
                                    ))} */}
                                    {notAssign
                                        .slice(page * 8, page * 8 + 8)
                                        .map((row) => {
                                            return (
                                                <StyledTableRow hover role="checkbox" tabIndex={-1} key={row.id}>

                                                    <StyledTableCell key={row.id} align="left">
                                                        {row.question}
                                                    </StyledTableCell>
                                                    <StyledTableCell align="right">

                                                        <ButtonGroup variant="contained" aria-label="Basic button group" >
                                                            <Button color='info' onClick={() => { handleOpenDialog(); setType('Assign'); setWord(row.question) }}>เพิ่ม</Button>
                                                            <Button color='error'onClick={() => { handleOpenDialog(); setType('Delete'); setWord(row.question) }}>ลบ</Button>
                                                        </ButtonGroup>
                                                    </StyledTableCell>
                                                </StyledTableRow>
                                            );
                                        })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[8]}
                            component="div"
                            count={data.length}
                            rowsPerPage={8}
                            page={page}
                            onPageChange={handleChangePage}
                        />
                    </BodyPaper>
                </Grid>
                <Grid item xs={3}>
                    <TrainingCard title='คำถามที่ตอบไม่ได้ทั้งหมด' value={data.length} colour={'#2596be'} />
                    <TrainingCard title='คำถามที่ยังไม่ได้เพิ่ม' value={notAssign.length} colour={'#8e04b0'} />
                    <TrainingCard title='คำถามที่เพิ่มแล้ว' value={assign.length} colour={'#2cb004'} />
                    <TrainingCard title='คำถามที่ลบ' value={del.length} colour={'#f21326'} />
                </Grid>
            </Grid>
        </Box>
    );
}
