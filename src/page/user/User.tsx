import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import UserModal from "./UserMoal";
import UserTable from "./UserTable";
import { useUser } from "./hooks";
import "./user.scss";
import { Box, Paper, styled } from "@mui/material";
import axios from "axios";
import { url } from "../../service/serviceUrl";


interface IUser {
  email: string,
  password: string,
  level: string,
  name:string,
}
const columns: GridColDef[] = [
  { field: "email", headerName: "Email", minWidth: 350, maxWidth: 400 },
  { field: "name", headerName: "Name", width: 300 },

  {
    field: "level",
    headerName: "Level",
    width: 100,
    editable: true,
  },
];
const BodyPaper = styled(Paper)(({ theme }) => ({
  width: '100%',
  // height: '80vh',
  marginTop: '80px',
  overflow: 'true',
  justifySelf: 'center',
  padding: theme.spacing(2),
  ...theme.typography.body2,
}));

const User = () => {
  const [level, setLevel] = useState<String>("");
  const [openModal, setOpenModal] = useState(false);
  const { form, onSubmit } = useUser();
  const [data, setData] = useState<IUser[]>([]);

  const handleCloseModal = () => {
    setOpenModal(false);
    form.reset();
  };
  useEffect(() => {
    const level = localStorage.getItem("level");
    if (level) {
      setLevel(level);
      axios.get(`${url}/user/getUser`)
        .then(response => {
          console.log(response.data)
          // Handle successful response
          setData(response.data);

        })
        .catch(error => {
          // Handle error
          console.error('Error:', error);
        });
    }





  }, []);


  if (level != 'root') {
    return (
      <Box sx={{ mt: 20, textAlign: 'center' }}>
        <h1>คุณไม่มีสิทธิเข้าถึง!!!!!</h1>
      </Box>

    );
  } else {
    return (
      <Box sx={{ mx: 20 }}>
        <BodyPaper elevation={12}>
          <div>
            <div className="b">
              <h2>จัดการผู้ใช้</h2>
              <button onClick={() => setOpenModal(true)} >Add New</button>
            </div>
            <UserTable columns={columns} rows={data} />

            <UserModal
              form={form}
              onSubmit={onSubmit}
              header="Add New User"
              open={openModal}
              onClose={handleCloseModal}
            />
          </div>
        </BodyPaper>
      </Box>
    );
  }
};

export default User;
