import {
  Box,
  Button,
  InputLabel,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import { TextFieldElement, UseFormReturn } from "react-hook-form-mui";
import { IUser } from "./interface";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

type UserModalProps = {
  header: string;
  open: boolean;
  form: UseFormReturn<IUser, any>;
  onSubmit: (data: IUser) => Promise<void>;
  onClose: () => void;
};

const UserModal = ({
  header,
  open,
  form,
  onSubmit,
  onClose,
}: UserModalProps) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Button
          size="large"
          onClick={onClose}
          sx={{ position: "absolute", top: 0, right: -4 }}
        >
          X
        </Button>
        <Typography variant="h5" color="white" align="center">
          {header}
        </Typography>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Stack marginY={4} gap={3}>
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <InputLabel>Email</InputLabel>
              <TextFieldElement
                sx={{ width: "80%" }}
                id="email"
                name="email"
                placeholder={`Type your email...`}
                type={"text"}
                control={form.control}
              />
            </Stack>
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <InputLabel>Name</InputLabel>
              <TextFieldElement
                sx={{ width: "80%" }}
                id="name"
                name="name"
                placeholder={`Type your email...`}
                type={"text"}
                control={form.control}
              />
            </Stack>
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <InputLabel>Password</InputLabel>
              <TextFieldElement
                sx={{ width: "80%" }}
                id="password"
                name="password"
                placeholder={`Type your password...`}
                type={"text"}
                control={form.control}
              />
            </Stack>

            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <InputLabel htmlFor="level">Level</InputLabel>
              <TextFieldElement
                sx={{ width: "80%" }}
                id="level"
                name="level"
                placeholder={`Type your level...`}
                type={"text"}
                control={form.control}
              />
            </Stack>
          </Stack>

          {/* button */}
          <Stack width="100%" alignItems={"end"}>
            <Button
              variant="contained"
              size="large"
              type="submit"
              sx={{ width: "80%" }}
            >
              {header === "Add New User" ? "Add" : "Edit"}
            </Button>
          </Stack>
        </form>
      </Box>
    </Modal>
  );
};

export default UserModal;
