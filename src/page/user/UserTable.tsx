import { Box, Stack } from "@mui/material";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { useUser } from "./hooks";
import { useState } from "react";
import UserModal from "./UserMoal";

type UserTableProps = {
  columns: GridColDef[];
  rows: object[];
};

const UserTable = ({ columns, rows }: UserTableProps) => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | undefined>(0);
  const { user, form, onSubmit } = useUser(selectedUserId);

  const handleCloseModal = () => {
    setOpenModal(false);
    // Reset form when closing the modal
    form.reset();
  };

  const handleDelete = (id: number) => {
    //delete
    console.log(id + "has been deleted!");
  };
  const handleEdit = (id: number) => {
    setSelectedUserId(id);
    setOpenModal(true);

    console.log(user);

    //edit
    console.log(id + " has been edited!");
  };

  const actionColumn: GridColDef = {
    field: "action",
    headerName: "Action",
    renderCell: (params) => {
      return (
        <Stack direction={"row"} spacing={2}>
          <div className="edit" onClick={() => handleEdit(params.row.id)}>
            <img src="/view.svg" alt="" />
          </div>
          <div className="delete" onClick={() => handleDelete(params.row.id)}>
            <img src="/delete.svg" alt="" />
          </div>
        </Stack>
      );
    },
  };

  return (
    <Box sx={{ width: "100%" }}>
      <DataGrid
        className="dataGrid"
        rows={rows}
        columns={[...columns, actionColumn]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        slots={{ toolbar: GridToolbar }}
        pageSizeOptions={[5]}
        checkboxSelection={false}
        disableRowSelectionOnClick
        disableColumnFilter
        disableDensitySelector
        disableColumnSelector
      />
      <UserModal
        header={"Edit User"}
        open={openModal}
        form={form}
        onSubmit={onSubmit}
        onClose={handleCloseModal}
      />
    </Box>
  );
};

export default UserTable;
