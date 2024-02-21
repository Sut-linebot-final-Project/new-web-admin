import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import axios from 'axios';

import { url } from '../../service/serviceUrl';

import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  word: string;
  type: string;

  // Add more props as needed
}
interface IIntentlist {
  id: string;
  displayName: string;
}





const TrainingModal: React.FC<DialogProps> = ({ isOpen, onClose, word, type }) => {
  const [intent, setIntent] = useState<string>('');
  const [intentlsit, setIntentList] = React.useState<IIntentlist[]>([]);
  const [openSnack, setOpenSnack] = React.useState(false);



  function timeout(delay: number) {
    return new Promise(res => setTimeout(res, delay));
  }

  const handleIntent = (event: SelectChangeEvent<typeof intent>) => {
    console.log(event.target.value);
    setIntent(
      event.target.value,
    );
  };
  const HandleForDelete = async () => {
    const dataDel = {
      word: word
    }
    try {
      const response = await axios.post(`${url}/pg/deleteQuestion`, dataDel, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Data sent successfully', response.data);
      setOpenSnack(true);
      await timeout(1000); //for 1 sec delay
      window.location.reload();
    } catch (error) {
      console.error('Failed to send data', error);

    }
  }
  const HandleApplyForADD = async () => {
    const dataAdd = {
      intentName: intent,
      word: word
    }
    try {
      const response = await axios.post(`${url}/dialogflow/addTrainingPhrases`, dataAdd, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Data sent successfully', response.data);

      // Handle successful response
    } catch (error) {
      console.error('Failed to send data', error);
      // Handle error response
    }

    try {
      const response2 = await axios.post(`${url}/pg/updateQuestion`, dataAdd, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Data sent successfully', response2.data);
      setOpenSnack(true);
      await timeout(1000); //for 1 sec delay
      window.location.reload();
      // window.location.reload();
    } catch (error) {
      console.error('Failed to send data', error);
    }

  }


  React.useEffect(() => {
    const apiUrl = `${url}/dialogflow/listIntent`;
    axios.get(apiUrl)
      .then(response => {
        setIntentList(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
  const filteredList = intentlsit.filter(intent => intent.displayName != 'Default Fallback Intent');

  if (type == 'Assign') {
    return (
      <>

        <Dialog open={isOpen} onClose={onClose}  >
          <Snackbar open={openSnack} autoHideDuration={1000} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>

            <Alert
              severity="success"
              variant="filled"
              sx={{ width: '100%' }}
            >
              บันทึกสำเร็จ
            </Alert>
          </Snackbar>

          <DialogTitle>Assign {word} to Intent</DialogTitle>
          <DialogContent>
            <DialogContentText>

              <FormControl sx={{ mt: 2, minWidth: 500 }}>
                <InputLabel htmlFor="max-width">Intent</InputLabel>
                <Select
                  autoFocus
                  value={intent}
                  onChange={handleIntent}
                  label="intent"
                >
                  {filteredList.map((intent) => (<MenuItem value={intent.id}>{intent.displayName}</MenuItem>))}
                </Select>
              </FormControl>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Button onClick={onClose} color="primary">
                Close
              </Button>
              <Button onClick={HandleApplyForADD} color="primary">
                Apply
              </Button>
            </Grid>
          </DialogActions>
        </Dialog>
      </>
    );
  } else {
    return (
      <>

        <Dialog open={isOpen} onClose={onClose}  >
          <Snackbar open={openSnack} autoHideDuration={1000} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} sx={{ zIndex: 1000 }}>
            <Alert

              severity="success"
              variant="filled"
              sx={{ width: '100%' }}
            >
              ลบสำเร็จ
            </Alert>
          </Snackbar>
          <DialogTitle> Delete Word</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you would like to delete word "{word}"?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Button onClick={onClose} color="primary">
                Close
              </Button>
              <Button onClick={HandleForDelete} color="primary">
                Delete
              </Button>
            </Grid>
          </DialogActions>
        </Dialog>
      </>
    )
  }

};




export default TrainingModal;


