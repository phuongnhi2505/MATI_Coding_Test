import moment from "moment";
import { useEffect, useState } from "react";
import {
  DragDropContext,
  Draggable,
  DraggableProvided,
  DropResult,
  Droppable,
  DroppableProvided,
} from "react-beautiful-dnd";
import { useAppDispatch, useAppSelector } from "../../Store/hook";
import { RootState } from "../../Store/store";
import groupBy from "../../Util/GroupBy";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import CreateTrainingSession from "../../Components/CreateTrainingSession";

export interface IDate {
  displayDate: string;
  date: string;
  day: string;
}

type ClassInformation = {
  exercise: Array<{
    title: string;
    number: number;
    works: string;
    configuration: {
      column: string;
      id: string;
      createdAt: Date;
      index: number;
    };
  }>;
  title: string;

  configuration: {
    column: string;
    id: string;
    createdAt: Date;
    index: number;
  };
};

type DateOfWeek = {
  title: string;
  date: string;
  classes: Array<ClassInformation>;
  id: string;
  index: number;
};

const TrainingSessions = () => {
  const [dates, setDates] = useState<Array<DateOfWeek>>([]);
  const trainingSessions = useAppSelector(
    (state: RootState) => state.trainingSession
  );
  const [columns, setColumns] = useState(
    groupBy(trainingSessions, "createDate")
  );
  const dispatch = useAppDispatch();
  const DATESOFWEEK = ["MON", "TUE", "WED", "THU", "TRI", "SAT", "SUN"];
  const getDatesOfWeek = (): DateOfWeek[] => {
    const startOfWeek = moment().startOf("week");
    const arr: DateOfWeek[] = [];
    const length = DATESOFWEEK.length;
    for (let i = 0; i < length; i++) {
      const date = startOfWeek.add(1, "days").format("DD/MM/YYYY");
      arr.push({
        classes: [
          {
            title: "Lop 1",
            exercise: [{
              title: 'Bai 1',
              works: '50lbx30',
              number: 2,
              configuration: {
                column: `class_${DATESOFWEEK[i]}_${i}`,
                createdAt: new Date(),
                id: `exercise_${DATESOFWEEK[i]}_${i}`,
                index: 1,
              }
            }],
            configuration: {
              column: DATESOFWEEK[i],
              createdAt: new Date(),
              id: `class_${DATESOFWEEK[i]}_${i}`,
              index: 1,
            },
          },
        ],
        id: DATESOFWEEK[i],
        title: DATESOFWEEK[i],
        index: i,
        date,
      });
    }
    return arr;
  };
  useEffect(() => {
    setDates(getDatesOfWeek());
  }, []);

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

  function onDragEnd(result: DropResult) {}

  const WeekViews = (props: DateOfWeek) => {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "inline-block",
          margin: 1,
          padding: 0.5,
          background: "var(--purple-2)",
          width: "180px",
          marginTop: 0,
        }}
      >
        <Typography variant="subtitle2">
          {props.date.substring(0, 2)}
        </Typography>
        <div>
          {props.classes.map((x, i) => {
            return (
              <Droppable
                droppableId={`${props.id}_${i}`}
                mode="virtual"
                renderClone={() => <>234234</>}
                key={`class_${props.id}_${i}`}
              >
                {(droppableProvided: DroppableProvided) => (
                  <div ref={droppableProvided.innerRef}>
                    <Draggable
                      key={props.id}
                      index={props.index}
                      draggableId={props.index.toString()}
                    >
                      {(draggableProvided, draggableSnapshot) => (
                        <Card
                          sx={{
                            boxShadow: "none",
                          }}
                          variant="outlined"
                          ref={draggableProvided.innerRef}
                          {...draggableProvided.draggableProps}
                          {...draggableProvided.dragHandleProps}
                        >
                          <CardHeader
                            title={x.title}
                            sx={{ color: "var(--purple-6)", whiteSpace: 'nowrap' }}
                          ></CardHeader>
                          <CardContent>
                            {x.exercise.map((item) => (
                              <Card
                                variant="outlined"
                                ref={draggableProvided.innerRef}
                                {...draggableProvided.draggableProps}
                                {...draggableProvided.dragHandleProps}
                              >
                                <CardHeader
                                  sx={{textAlign: 'end'}}
                                  title={item.title}
                                ></CardHeader>
                                <CardContent>
                                  <div style={{position: 'relative'}}>
                                    <span style={{top:0, left: 0, position: 'absolute'}}>
                                      {item.number}
                                    </span>
                                    <span style={{top:0, right: 0, position: 'absolute'}}>
                                      {item.works}
                                    </span>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </CardContent>
                          <CardActions sx={{ justifyContent: "end" }}>
                            <CreateTrainingSession
                              date={props.date}
                            ></CreateTrainingSession>
                          </CardActions>
                        </Card>
                      )}
                    </Draggable>
                  </div>
                )}
              </Droppable>
            );
          })}
        </div>
      </Box>
    );
  };
  return (
    <>
      <div>
        <DragDropContext onDragEnd={onDragEnd}>
          {dates.map((x, i) => {
            return (
              <div style={{ display: "inline-block" }}>
                <Typography
                  variant="subtitle1"
                  sx={{ marginBottom: 0, marginLeft: "8px" }}
                >
                  {x.title}
                </Typography>
                <WeekViews {...x} key={`column_date_of_week_${i}`}></WeekViews>
              </div>
            );
          })}
        </DragDropContext>
      </div>
    </>
  );
};

export default TrainingSessions;
