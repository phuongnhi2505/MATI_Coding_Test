import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
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
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "../Store/hook";
import { Exercise } from "../Pages/Board";
import { creatExercise } from "../Pages/Board/DateOfWeekBoardSlice";

interface CreateExerciseProps {
  dateIndex: number,
  classIndex: number
}
const CreateExercise: React.FC<CreateExerciseProps> = ({dateIndex, classIndex}) => {
  const dispatch = useAppDispatch();
  const [openDialog, setOpenDialog] = useState(false);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<Exercise>();
  const resetFormData = () => {
    return reset({
      name: '',
      sets: null,
      setInfomation: ''
    })
  }
  const onSubmit = handleSubmit((data) => {
    dispatch(creatExercise({dateIndex, classIndex, exercise: data}));
    handleCloseDialog();
    resetFormData();
  });

  const cancelSubmit = () => {
    handleCloseDialog();
    resetFormData();
  }
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  return (
      <Box sx={{ textAlign: "end" }}>
        <IconButton
          color="success"
          aria-label="add training session"
          onClick={handleOpenDialog}
          sx={{padding:0}}
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
            {"Create Exercise"}
          </DialogTitle>
          <DialogContent dividers>
            <TextField
              id="training-session-name"
              label="Exercise name"
              variant="outlined"
              placeholder="Exercise name"
              fullWidth
              required
              sx={{marginBottom: 1}}
              {...register("name", { required: true, maxLength: 100 })} 
            />
            <TextField
              id="training-session-sets"
              label="Sets for exercise"
              variant="outlined"
              placeholder="Sets for exercise"
              fullWidth
              required
              type="number"
              sx={{marginBottom: 1}}
              {...register("sets", { required: true, maxLength: 100, min: 1 })} 
            />
            <TextField
              id="Set-information"
              label="Set information"
              variant="outlined"
              placeholder="Set information"
              fullWidth
              required
              {...register("setInfomation", { required: true, maxLength: 100 })} 
            />
            
          </DialogContent>
          <DialogActions>
            <Button type="reset" onClick={cancelSubmit}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              autoFocus
              disabled={Object.keys(errors).length>0}
              onClick={onSubmit}
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
  );
};

export default CreateExercise;
