import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import moment from "moment";
import {
  DragDropContext,
  DraggableLocation,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";
import ClassContainer from "../../Components/ClassContainer";
import CreateClass from "../../Components/CreateClass";
import { useAppDispatch, useAppSelector } from "../../Store/hook";
import { RootState } from "../../Store/store";
import { updateClass, updateExercise } from "./DateOfWeekBoardSlice";
import { Link, redirect } from "react-router-dom";
import { useState } from "react";
export type Exercise = {
  name: string;
  sets: number | null;
  setInfomation: string;
};
export type ClassInformation = {
  exercise: Array<Exercise>;
  title: string;
  configuration?: {
    column: string;
    id: string;
    createdAt: Date;
    index: number;
  };
};

export type DateOfWeek = {
  title: string;
  date: string;
  classes: Array<ClassInformation>;
  id: string;
  index: number;
};

const Board = () => {
  const datesOfWeekBoardData = useAppSelector((state: RootState) => state);
  const dispatch = useAppDispatch();
  const isCurrentDate = (date: string) => {
    return moment(new Date()).format("DD/MM/YYYY") === date;
  };
  const onDragEnd = (result: DropResult) => {
    const source = result.source;
    const destination = result.destination;
    if (!destination) {
      return;
    }
    switch (result.type) {
      case "COLUMN":
        handleClassDragEnd(source, destination);
        break;

      default:
        handleExerciseDragEnd(source, destination);
        break;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }
    return
  };
  const handleClassDragEnd = (
    source: DraggableLocation,
    dest: DraggableLocation
  ) => {
      dispatch(updateClass({ source, dest }));
  };
  const handleExerciseDragEnd = (
    source: DraggableLocation,
    dest: DraggableLocation
  ) => {
      dispatch(updateExercise({ source, dest }));
  };

  return (
    <>
      <Box sx={{ flexGrow: 1, marginBottom: 2 }}>
        <AppBar position="static" color="primary">
          <Toolbar>
          

            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Training Session Board
            </Typography>
            <Typography variant="h6" component="div" sx={{ flexGrow: -1 }}>
              Phan Thi Huynh Nhu
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <Box sx={{ display: "flex", height: "calc(100vh-70px)", width: "100%" }}>
        <DragDropContext onDragEnd={onDragEnd}>
          {datesOfWeekBoardData.dateOfWeek.map((dateItem, dateIndex) => {
            return (
              <Box
                key={`date_${dateItem.id}`}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ marginBottom: 0, marginLeft: "8px", color: 'gray', fontWeight: 'bold'}}
                >
                  {dateItem.title}
                </Typography>
                <Box sx={{ margin: 1 }}>
                  <Droppable
                    type="COLUMN"
                    droppableId={`${dateItem.id}_${dateIndex}`}
                    ignoreContainerClipping={false}
                    isCombineEnabled={false}
                  >
                    {(provided, snapshot) => (
                      <Box
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        sx={{
                          background: snapshot.isDraggingOver
                            ? "lightblue"
                            : "var(--bg-default)",
                          padding: 1,
                          width: "235px",
                          height: "calc(100vh - 170px)",
                        }}
                      >
                        <Box sx={{ position: "relative", marginBottom: 2 }}>
                          <Typography
                            variant="h6"
                            sx={{ 
                              position: "absolute", left: 0 ,
                              fontWeight: 'bold',
                              color: isCurrentDate(dateItem.date) ? 'var(--purple-5)': 'gray'
                            }}
                          >
                            {dateItem.date.substring(0, 2)}
                          </Typography>
                          <CreateClass {...dateItem}></CreateClass>
                        </Box>
                        <Box
                          sx={{
                            maxHeight: "calc(100vh - 250px)",
                            overflowY: "auto",
                          }}
                        >
                          {dateItem.classes.map((classItem, classIndex) => (
                            <ClassContainer
                              key={`date_${dateIndex}_class_${classIndex}`}
                              dateId={dateItem.id}
                              dateIndex={dateIndex}
                              classIndex={classIndex}
                              classData={classItem}
                            />
                          ))}
                          {provided.placeholder}
                        </Box>
                      </Box>
                    )}
                  </Droppable>
                </Box>
              </Box>
            );
          })}
        </DragDropContext>
      </Box>
    </>
  );
};

export default Board;
