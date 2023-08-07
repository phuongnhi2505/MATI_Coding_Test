import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import Button from "@mui/material/Button/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions/DialogActions";
import DialogContent from "@mui/material/DialogContent/DialogContent";
import DialogTitle from "@mui/material/DialogTitle/DialogTitle";
import IconButton from "@mui/material/IconButton/IconButton";
import TextField from "@mui/material/TextField/TextField";
import { useState } from "react";
import { create } from "../Pages/TrainingSessions/TrainingSessionSlice";
import { useAppDispatch, useAppSelector } from "../Store/hook";
import { RootState } from "../Store/store";


export interface ITrainingSession {
  id: number,
  name: string;
  createDate: string;
}

export interface CreateTrainingSessionProps {
  date: string;
}


const CreateTrainingSession: React.FC<CreateTrainingSessionProps> = ({
  date,
}) => {
  const trainingSessions = useAppSelector((state: RootState)=> state.trainingSession);
  const [trainingSessionName, setTrainingSessionName] = useState<string>('');
  const [openDialog, setOpenDialog] = useState(false);
  const dispatch = useAppDispatch();

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setTrainingSessionName('');
    setOpenDialog(false);
  };

  const handleChangeTrainingSession = (event?: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if(!event){
      return null
    }
    setTrainingSessionName(event.target.value);
  }

  const saveTrainingSession = () => {
    const trainingSessionData: ITrainingSession = {
      id: trainingSessions.length,
      name: trainingSessionName,
      createDate: date
    }
    dispatch(create(trainingSessionData));
    handleCloseDialog();
  }

  return (
    <>
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
        <DialogTitle id="alert-dialog-title" textAlign={'center'}>
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
            value={trainingSessionName}
            onChange={(e) => handleChangeTrainingSession(e)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button 
            variant="contained" autoFocus 
            disabled={trainingSessionName ? false : true}
            onClick={saveTrainingSession} >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CreateTrainingSession;
