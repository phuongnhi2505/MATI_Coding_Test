import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import { DateOfWeek } from "../Pages/Board";
import { useState } from "react";
import { useAppDispatch } from "../Store/hook";
import { createClass } from "../Pages/Board/DateOfWeekBoardSlice";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";

const CreateClass: React.FC<DateOfWeek> = ({
  classes,
  date,
  id,
  index,
  title,
}) => {
  const [className, setClassName] = useState<string>("");
  const [openDialog, setOpenDialog] = useState(false);
  const dispatch = useAppDispatch();

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setClassName("");
    setOpenDialog(false);
  };

  const handleChangeClass = (
    event?: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!event) {
      return null;
    }
    setClassName(event.target.value);
  };

  const saveClass = () => {
    const dateOfWeek: DateOfWeek = {
      classes: [...classes,{
        title: className,
        exercise: [],
      }],
      id: id,
      title: title,
      index: index,
      date,
    };

    dispatch(createClass(dateOfWeek));
    handleCloseDialog();
  };

  return (
    <Box sx={{ textAlign: "end" }}>
      <IconButton
        color="secondary"
        aria-label="add training session"
        onClick={handleOpenDialog}
      >
        <AddCircleRoundedIcon />
      </IconButton>
      <Dialog
        open={openDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
      >
        <DialogTitle id="alert-dialog-title" textAlign={"center"}>
          {"Create Training Session"}
        </DialogTitle>
        <DialogContent dividers>
          <TextField
            id="training-session-name"
            label="Training session name"
            variant="outlined"
            placeholder="Training session name"
            fullWidth
            required
            name="trainingSession"
            value={className}
            onChange={(e) => handleChangeClass(e)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            variant="contained"
            autoFocus
            disabled={className ? false : true}
            onClick={saveClass}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CreateClass;
