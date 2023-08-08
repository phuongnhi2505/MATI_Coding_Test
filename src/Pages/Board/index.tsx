import { Box, Typography } from "@mui/material";
import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import {
  DragDropContext,
  DraggableLocation,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";
import CreateClass from "../../Components/CreateClass";
import TrainingSessionContainer from "../../Components/ClassContainer";
import { useAppDispatch, useAppSelector } from "../../Store/hook";
import { RootState } from "../../Store/store";
import { initData, updateClass } from "./DateOfWeekBoardSlice";
import ClassContainer from "../../Components/ClassContainer";
export type Exercise = {
  title: string;
  number: number;
  works: string;
  configuration: {
    column: string;
    id: string;
    createdAt: Date;
    index: number;
  };
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
  const datesOfWeekBoardData = useAppSelector(
    (state: RootState) => state
  );
  const dispatch = useAppDispatch();
  const isCurrentDate = (date: string) => {
    return moment(new Date()).format("DD/MM/YYYY") === date;
  };
  // const onDragEnd = useCallback(
  //   (result: any, columns: any[], setColumns: any) => {
  //     if (!result.destination) return;
  //     const { source, destination } = result;
  //     if (source.droppableId !== destination.droppableId) {
  //       const sourceItems = columns[source.droppableId];

  //       let destItems = columns[destination.droppableId];
  //       const [removed] = sourceItems.splice(source.index, 1);
  //       destItems.splice(destination.index, 0, {
  //         ...removed,
  //         createDate: destination.droppableId,
  //       });
  //       setColumns({
  //         ...columns,
  //         [source.droppableId]: sourceItems,
  //         [destination.droppableId]: destItems,
  //       });
  //     } else {
  //       const copiedItems = trainingSessionsOfDate(source.droppableId);
  //       const [removed] = copiedItems.splice(source.index, 1);
  //       copiedItems.splice(destination.index, 0, removed);
  //       setColumns({
  //         ...columns,
  //         [source.droppableId]: copiedItems,
  //       });
  //     }
  //     updateTrainingSessions(columns);
  //   },
  //   []
  // );

  // const renderTrainingSession = (date: string) => {
  //   let element: ITrainingSession[] = columns[date];
  //   if (!element) {
  //     return null;
  //   }
  //   return element.map((trainingSession, idx) => {
  //     return (
  //       <Draggable
  //         key={trainingSession.id}
  //         draggableId={trainingSession.id.toString()}
  //         index={idx}
  //       >
  //         {(provided, snapshot) => {
  //           return (
  //             <div
  //               ref={provided.innerRef}
  //               {...provided.draggableProps}
  //               {...provided.dragHandleProps}
  //               style={{
  //                 userSelect: "none",
  //                 padding: 16,
  //                 margin: "0 0 8px 0",
  //                 minHeight: "50px",
  //                 backgroundColor: snapshot.isDragging ? "#263B4A" : "#456C86",
  //                 color: "white",
  //                 ...provided.draggableProps.style,
  //               }}
  //             >
  //               {trainingSession.name}
  //             </div>
  //           );
  //         }}
  //       </Draggable>
  //     );
  //   });
  // };

  // return (
  //   <div>
  //     <h1 style={{ textAlign: "center" }}>MATI</h1>
  //     <div style={{ display: "flex", height: "100%", width: "100%" }}>
  //       <DragDropContext
  //         onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
  //       >
  //         {dates.map((item, index) => {
  //           return (
  //             <div
  //               style={{
  //                 display: "flex",
  //                 flexDirection: "column",
  //                 alignItems: "start",
  //               }}
  //               key={item.date}
  //             >
  //               <h4 style={{ marginBottom: 0, marginLeft: "8px" }}>
  //                 {item.displayDate}
  //               </h4>
  //               <div style={{ margin: 8 }}>
  //                 <Droppable droppableId={item.date} key={item.date}>
  //                   {(provided, snapshot) => {
  //                     return (
  //                       <div
  //                         {...provided.droppableProps}
  //                         ref={provided.innerRef}
  //                         style={{
  //                           background: snapshot.isDraggingOver
  //                             ? "lightblue"
  //                             : "lightgrey",
  //                           padding: 4,
  //                           width: 250,
  //                           minHeight: 500,
  //                         }}
  //                       >
  //                         <h4>{item.day}</h4>
  //                         {renderTrainingSession(item.date)}
  //                         {provided.placeholder}
  //                         <CreateTrainingSession
  //                           date={item.date}
  //                         ></CreateTrainingSession>
  //                       </div>
  //                     );
  //                   }}
  //                 </Droppable>
  //               </div>
  //             </div>
  //           );
  //         })}
  //       </DragDropContext>
  //     </div>
  //   </div>
  // );
  const onDragEnd = (result: DropResult) => {
    const source = result.source;
    const destination = result.destination;
    if (!destination) {
      return;
    }
    if (destination.droppableId !== source.droppableId) {
      moveClasses(source, destination);
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
  };

  const moveClasses = (source: DraggableLocation, dest: DraggableLocation) => {
    dispatch(updateClass({source,dest}));
  };

  const WeekViews = (props: DateOfWeek) => {
    return (
      <Box
        sx={{
          minHeight: "90vh",
          margin: 1,
          padding: 0.5,
          background: "var(--purple-2)",
          minWidth: "240px",
        }}
      >
        <Box sx={{ position: "relative", verticalAlign: "middle" }}>
          <Typography
            variant="h6"
            color={
              isCurrentDate(props.date) ? { color: "var(--purple-6)" } : {}
            }
            sx={{ position: "absolute", top: 0, lineHeight: "40px" }}
          >
            {props.date.substring(0, 2)}
          </Typography>
          <CreateClass {...props}></CreateClass>
        </Box>
        <ClassContainer {...props} />
      </Box>
    );
  };

  const render = useMemo(()=>{
    return (
      datesOfWeekBoardData.dateOfWeek.map((x, i) => {
        return (
          <Box key={`date_of_week_${x.id}`}>
            <Typography
              variant="h6"
              sx={{
                marginBottom: 0,
                marginLeft: "8px",
                display: "inline-flex",
              }}
            >
              {x.title}
            </Typography>
            <WeekViews {...x} key={`column_date_of_week_${i}`}></WeekViews>
          </Box>
        );
      })
    )
  }, [datesOfWeekBoardData]);

  // handle drop and drag Exercise in Class
  const moveExerciseInnerClass = () => {};
  // handle drop and drag Exercise from Class to Class
  const moveExercise = () => {};
  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable 
          droppableId="board"
          direction="horizontal"
        >
           {(provided) =>(
            <Box
              ref={provided.innerRef} {...provided.droppableProps}
              sx={{
                display: "inline-flex",
                padding: 2,
                marginTop: 2,
                marginBottom: 2,
                flexDirection: "row",
              }}
            >
              {render}
            </Box>
           )}
          
        </Droppable> 
      </DragDropContext>
    </>
  );
};

export default Board;
