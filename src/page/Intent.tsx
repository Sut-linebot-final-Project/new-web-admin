// import { GridColDef } from "@mui/x-data-grid";
import * as React from 'react';
// import { styled } from '@mui/material/styles';
import axios from 'axios';

import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
// import { Filter } from '@mui/icons-material';
import { url } from '../service/serviceUrl';

import IntentTable from '../components/intent/datatable';
import { Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';






async function getIntent() {
  let res = await axios.get(`${url}/dialogflow/listIntent`);
  // let data = res.data;
  console.log(res);
  return res

}
const BodyPaper = styled(Paper)(({ theme }) => ({
  width: '100%',
  // height: '80vh',
  marginTop: '80px',
  overflow: 'true',
  justifySelf: 'center',
  padding: theme.spacing(2),
  ...theme.typography.body2,
}));

const Intent = () => {
  // const [open, setOpen] = React.useState(false);
  const [intent, setIntent] = React.useState([]);

  const listIntent = async () => {
    let res = await getIntent();
    if (res) {
      setIntent(res.data);
      console.log(res.data);
    }
  };
  React.useEffect(() => {
    listIntent();
  }, []);
  return (
    <Box sx={{ flexGrow: 0, mx: 10, mb:10, mt: 10, maxHeight: "80vh"}}>
      <BodyPaper elevation={12}>
        {/* <h1>หัวข้อ</h1> */}
        <Box sx={{ textAlign: 'end' }}>
          <Link to={'/newintent'} >
            <Button variant='contained' sx={{ mb: 2 }}>
              เพิ่ม
            </Button>
          </Link>
        </Box>

        <IntentTable intentData={intent} />
        {/* <button onClick={()=>setOpen(true)}>Add New</button> */}
      </BodyPaper>
    </Box>
  );
};

export default Intent;
