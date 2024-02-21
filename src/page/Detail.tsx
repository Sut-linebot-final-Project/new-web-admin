import React from 'react'
import { Card, Paper, TextField, styled, Button, Grid, ButtonGroup, CardMedia, CardActions } from '@mui/material'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { red } from '@mui/material/colors';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { url } from '../service/serviceUrl';
import { useParams } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
// import Typography from '@mui/material/Typography';

// const CustomDialog = styled(Dialog)(({ theme }) => ({
//   '& .MuiDialogContent-root': {
//     padding: theme.spacing(2),
//   },
//   '& .MuiDialogActions-root': {
//     padding: theme.spacing(1),
//   },
// }));

interface Answers {
  text?: string | null;
  img?: string | null;
}
interface IData {
  responses: string;
  trainingPhraseText: string;
}



const BodyPaper = styled(Paper)(({ theme }) => ({
  // width: '100%',
  // height: '80vh',
  marginLeft: '100px',
  marginRight: '100px',
  marginTop: '20px',
  overflow: 'true',
  padding: theme.spacing(2),
  ...theme.typography.body2,

}));
function isURL(str: string) {
  const pattern = /^(?:\w+:)?\/\/([^\s.]+\.\S{2}|localhost[:?\d]*)\S*$/;
  return pattern.test(str);
}
export default function Detail() {
  const { id } = useParams();
  const [questions, setQuestions] = React.useState<string[]>([]); // State to store questions
  const [intentName, setIntentName] = React.useState<string>();
  const [answers, setAnswers] = React.useState<Answers[]>([]);
  const [imgUrl, setImgUrl] = React.useState<string>();
  const [data, setData] = React.useState<IData>();
  const [openSnack, setOpenSnack] = React.useState(false);
  function timeout(delay: number) {
    return new Promise(res => setTimeout(res, delay));
  }

  const handleAddAnswer = () => {
    setAnswers(prevAnswers => [...prevAnswers, { text: '', img: null }]);
  };

  const handleTextChange = (index: number, text: string) => {
    const newAnswers = [...answers];
    newAnswers[index].text = text;
    setAnswers(newAnswers);
  };

  const handleNameChange = (name: string) => {
    setIntentName(name);
  };

  const deleteAnswer = (index: number) => {
    setAnswers(prevAnswers => prevAnswers.filter((_, i) => i !== index));
  };



  /////////////////For Modal//////////////////////////////
  const [open, setOpen] = React.useState(false);
  const [modalTitle, setModalTitle] = React.useState<string>();
  const handleClickSetTitle = (title: string) => {
    setModalTitle(title);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  /////////////////For quetion//////////////////////////////
  const addQuestion = () => {
    setQuestions(prevQuestions => [...prevQuestions, '']);
    console.log(questions);
  };

  const deleteQuestion = (index: number) => {
    setQuestions(prevQuestions => prevQuestions.filter((_, i) => i !== index));
    console.log(questions);
  };
  const handleQuestionChange = (index: number, value: string) => {
    const newQuestions = [...questions];
    newQuestions[index] = value;
    setQuestions(newQuestions);
    console.log(newQuestions);

  };

  const handleApply = () => {
    const value = imgUrl;
    console.log('Value from TextField:', value);
    setAnswers(prevAnswers => [...prevAnswers, { text: null, img: `${value}` }]);
    console.log(questions);
    handleClose();
  };
  const handleSave = () => {
    if (id) {
      const data = {
        id: id,
        intentName: intentName,
        trainingPhrases: questions,
        messages: answers,

      }
      console.log('data:', data);
      const apiUrl = `${url}/dialogflow/editIntent`;
      axios.post(apiUrl, data)
        .then(async response => {
          console.log('Response:', response.data);
          setOpenSnack(true);
          await timeout(1000);
          location.replace(`/Detail/${intentName}`);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    } else {
      const data = {
        intentName: intentName,
        trainingPhrases: questions,
        messages: answers,

      }
      console.log('data:', data);
      const apiUrl = `${url}/dialogflow/createIntent`;
      axios.post(apiUrl, data)
        .then(async response => {
          console.log('Response:', response.data);
          setOpenSnack(true);
          await timeout(1000);
          location.replace(`/Detail/${intentName}`);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  };

  const fetchData = async () => {
    const apiUrl = `${url}/dialogflow/getintent`;
    const params = {
      intentName: id,
    };

    try {
      const response = await axios.post(apiUrl, { params });
      console.log('API Response:', response.data);
      setData(response.data);
      console.log(response.data.trainingPhraseText, response.data.responses);
      setQuestions(response.data.trainingPhraseText);
      setAnswers([]);
      response.data.responses.forEach((item: string) => {
        if (isURL(item)) {
          setAnswers(prevAnswers => [...prevAnswers, { text: null, img: item }]);
        } else {
          setAnswers(prevAnswers => [...prevAnswers, { text: item, img: null }]);
        }
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  React.useEffect(() => {
    if (id) {
      fetchData();
      setIntentName(id);
      console.log(data)

    }


  }, []);


  return (

    <>
      <React.Fragment>
        <Snackbar open={openSnack} autoHideDuration={100} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
          <Alert
            severity="success"
            variant="filled"
            sx={{ width: '100%' }}
          >
            บันทึกสำเร็จ
          </Alert>
        </Snackbar>
        <Dialog
          maxWidth={'md'}
          fullWidth
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            {modalTitle}
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>

          <DialogContent dividers>
            <TextField fullWidth

              variant="filled"
              label="Enter image URL"
              color='secondary'
              onChange={(e) => setImgUrl(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleApply}>
              Apply
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
      <Grid container spacing={2} sx={{ mt: 10, px: 10 }}>
        <Grid item xs={12} textAlign={'end'}> <Button variant='contained' color='primary' size='large' onClick={handleSave}>บันทึก</Button></Grid>
      </Grid>

      <BodyPaper elevation={12}>
        <Grid container spacing={0}>
          <Grid item xs={8}>
            <h2>ชื่อหัวข้อ</h2>
          </Grid>
          <Grid item xs={4} textAlign={'end'}>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id={'intentName'}
              label="ชื่อหัวข้อ"
              value={intentName}
              onChange={(e) => handleNameChange(e.target.value)} />
          </Grid>
        </Grid>

      </BodyPaper>
      <BodyPaper elevation={12}>
        <Grid container spacing={1}>
          <Grid item xs={8}>
            <h2>คำถาม</h2>
          </Grid>
          <Grid item xs={4} textAlign={'end'}>
            <Button variant='contained' color='secondary' onClick={addQuestion}>เพิ่ม</Button>
          </Grid>
          {questions.map((question, index) => (
            <>
              <Grid item xs={11} key={index}>
                <TextField
                  key={index}
                  fullWidth
                  id={`question-${index}`}
                  label="คำถาม"
                  value={question}
                  onChange={(e) => handleQuestionChange(index, e.target.value)} />

              </Grid>
              <Grid item xs={1} alignItems={'end'}>
                <Button sx={{ mt: 1 }} size='large' onClick={() => deleteQuestion(index)} ><DeleteForeverIcon sx={{ color: red[500] }} /></Button>
              </Grid>
            </>

          ))}

        </Grid>
      </BodyPaper>

      <BodyPaper elevation={12}>
        <Grid container spacing={1}>
          <Grid item xs={8}>
            <h2>คำตอบ</h2>
          </Grid>
          <Grid item xs={4} textAlign={'end'}>
            <ButtonGroup variant="contained" aria-label="Basic button group" >
              <Button color='warning' onClick={handleAddAnswer}>ข้อความ</Button>
              <Button color='info' onClick={() => { handleClickSetTitle('เพิ่มรูปภาพ'), handleClickOpen() }}>รูปภาพ</Button>
              {/* <Button color='warning' onClick={() => { handleClickSetTitle('เพิ่มวิดีโอ'), handleClickOpen() }}>วิดีโอ</Button> */}
            </ButtonGroup>
          </Grid>
          {answers.map((answer, index) => (
            <>
              {answer.text !== null ? (
                <><Grid item xs={11} key={index}>
                  <TextField
                    key={index}
                    fullWidth
                    multiline
                    id={`ans-${index}`}
                    label="คำตอบ"
                    value={answer.text}
                    onChange={(e) => handleTextChange(index, e.target.value)} />
                </Grid><Grid item xs={1} alignItems={'end'}>
                    <Button sx={{ mt: 1 }} size='large' onClick={() => deleteAnswer(index)}><DeleteForeverIcon sx={{ color: red[500] }} /></Button>
                  </Grid></>
              ) : (
                <Grid item xs={12}>
                  <Card sx={{ maxWidth: 400 }}>
                    <CardMedia
                      id={`img-${index}`}
                      sx={{ height: 250 }}
                      image={`${answer.img}`}
                    />
                    <CardActions>
                      <Button size="small" color='primary' onClick={() => { handleClickSetTitle('แก้ไขรูปภาพ'), handleClickOpen() }}>Edit URL</Button>
                      <Button size="small" color='error' onClick={() => deleteAnswer(index)}>Delete</Button>
                    </CardActions>
                  </Card>
                </Grid>
              )}
            </>

          ))}
        </Grid>
      </BodyPaper>
    </>
  )
}

