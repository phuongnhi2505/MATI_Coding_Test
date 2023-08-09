import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import moment from "moment";
import { DraggableLocation } from "react-beautiful-dnd";
import { DateOfWeek, Exercise } from "./index";


const setLocalStorage = (key: string, value: DateOfWeek[]) => {
    if(!JSON.stringify(value)){
        localStorage.setItem(key, '')
    } else {
        localStorage.setItem(key, JSON.stringify(value))
    }  
}
const getLocalStorage = (key: string): DateOfWeek[] | null => {
    const dateOfWeek = localStorage.getItem(key);
    if(!dateOfWeek || !JSON.parse(dateOfWeek)) return null
    return JSON.parse(dateOfWeek)
}

const generationInitState = (): DateOfWeek[] => {
  const DATESOFWEEK = ["MON", "TUE", "WED", "THU", "TRI", "SAT", "SUN"];
  const startOfWeek = moment().startOf("week");
    const arr: DateOfWeek[] = [];
    const length = DATESOFWEEK.length;
    for (let i = 0; i < length; i++) {
      const date = startOfWeek.add(1, "days").format("DD/MM/YYYY");
      arr.push({
        classes: [],
        id: DATESOFWEEK[i],
        title: DATESOFWEEK[i],
        index: i,
        date: date,
      });
    }
    return arr;
}
/**
 * Init data for slice
 * @returns data from LocalStorage or generate init data
 */
const initDateOfWeek = (): DateOfWeek[] => {
  return getLocalStorage('DateOfWeek') ?? generationInitState()
};
const convertArrayStringToNumber = (arr: string[]): number[] =>{
  const numberArr: number[] = []
  arr.forEach((str) => {
    if(!isNaN(Number(str))){
    numberArr.push(Number(str))
    }
  });
  return numberArr
}
export const dateOfWeekBoardSlice = createSlice({
  name: "dateOfWeek",
  initialState: initDateOfWeek(),
  reducers: {
    createClass: (state, action: PayloadAction<DateOfWeek>) => {
      state[action.payload.index] = action.payload;
      setLocalStorage("DateOfWeek", state);
    },
    updateClass: (
      state,
      action: PayloadAction<{
        source: DraggableLocation;
        dest: DraggableLocation;
      }>
    ) => {
      const {source, dest} = action.payload;
      const sourceDroppableId = Number(source.droppableId.split("_")[1]);
      const destDroppableId = Number(dest.droppableId.split("_")[1]);
      const sourceClassItem = state[sourceDroppableId].classes[source.index];
      state[destDroppableId].classes.splice(dest.index, 0, sourceClassItem);
      state[sourceDroppableId].classes.splice(source.index, 1);
      setLocalStorage("DateOfWeek", state);
    },
    creatExercise: (state, action: PayloadAction<{dateIndex: number, classIndex: number, exercise: Exercise}>)=> {  
      const { dateIndex, classIndex, exercise } = action.payload;
      state[dateIndex].classes[classIndex].exercise.push(exercise);
      setLocalStorage("DateOfWeek", state);
    },
    updateExercise: (
      state,
      action: PayloadAction<{
        source: DraggableLocation;
        dest: DraggableLocation;
      }>
    ) => {
      const { source, dest } = action.payload;
      const [dateOfSoureIndex, sourceClassIndex] = convertArrayStringToNumber(source.droppableId.split("_"))   
      const [dateOfDestIndex, destClassIndex] = convertArrayStringToNumber(dest.droppableId.split("_"))
      const sourceExercise = state[dateOfSoureIndex].classes[sourceClassIndex].exercise[source.index];
      state[dateOfDestIndex].classes[destClassIndex].exercise.splice(dest.index, 0, sourceExercise);
      state[dateOfSoureIndex].classes[sourceClassIndex].exercise.splice(source.index, 1);
      setLocalStorage("DateOfWeek", state);
    },
  },
});

export const { createClass, updateClass, creatExercise, updateExercise } = dateOfWeekBoardSlice.actions;
export default dateOfWeekBoardSlice.reducer;
