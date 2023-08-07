import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ITrainingSession } from "../../Components/CreateTrainingSession";

const initTrainingSession = (): ITrainingSession[] => {
  return getLocalStorage('TrainingSession')
};
const setLocalStorage = (key: string, value: ITrainingSession[]) => {
    if(!JSON.stringify(value)){
        localStorage.setItem(key, '')
    } else {
        localStorage.setItem(key, JSON.stringify(value))
    }  
}
const getLocalStorage = (key: string): ITrainingSession[] => {
    const trainingSession = localStorage.getItem(key);
    if(!trainingSession || !JSON.parse(trainingSession)) return []
    return JSON.parse(trainingSession)
}
export const trainingSessionSlice = createSlice({
  name: "trainingSession",
  initialState: initTrainingSession(),
  reducers: {
    create: (
      state,
      action: PayloadAction<ITrainingSession>
    ) => {
      state.push({ ...action.payload });
      setLocalStorage('TrainingSession', state)
    },
    update: (
      state,
      action: PayloadAction<ITrainingSession[]>
    ) => {
      state = action.payload;
      setLocalStorage('TrainingSession', state)
    },
  },
});

export const { create, update } = trainingSessionSlice.actions;
export default trainingSessionSlice.reducer;
