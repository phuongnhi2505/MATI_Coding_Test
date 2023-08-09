import moment from "moment";
import {
  DragDropContext,
  Draggable,
  DraggableLocation,
  DropResult,
  Droppable,
  DroppableProvided,
} from "react-beautiful-dnd";
import CreateClass from "../../Components/CreateClass";
import { useAppDispatch, useAppSelector } from "../../Store/hook";
import { RootState } from "../../Store/store";
import { updateClass } from "./DateOfWeekBoardSlice";
import CreateExercise from "../../Components/CreateExercise";
import ExerciseContainer from "../../Components/ExerciseContainer";
import { Box, Typography } from "@mui/material";
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
    console.log(result);

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
    dispatch(updateClass({ source, dest }));
  };

  const WeekViews = (date: DateOfWeek) => {
    return date.classes.map((item, classIndex) => {
      return (
        <Draggable
          key={`class_${date.id}_${classIndex}`}
          draggableId={`class_${date.id}_${classIndex}`}
          index={classIndex}
        >
          {(provided, snapshot) => {
            return (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                style={{
                  userSelect: "none",
                  padding: 16,
                  margin: "0 0 8px 0",
                  minHeight: "50px",
                  backgroundColor: snapshot.isDragging ? "green" : "olive",
                  color: "white",
                  ...provided.draggableProps.style,
                }}
              >
                {item.title}
                <Droppable
                  droppableId={`exercise_${date.id}_${classIndex}`}
                  isDropDisabled={false}
                  ignoreContainerClipping={false}
                  isCombineEnabled={false}
                  renderClone={undefined}
                >
                  {(exerciseDroppableProvided, exerciseSnapshot) => (
                    <div
                      {...exerciseDroppableProvided.droppableProps}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        paddingBottom: 0,
                        transition:
                          "background-color 0.2s ease, opacity 0.1s ease",
                        userSelect: "none",
                        width: "250px",
                      }}
                    >
                      <div
                        style={{
                          overflowX: "hidden",
                          overflowY: "auto",
                          maxHeight: "250px",
                        }}
                      >
                        <div
                          style={{ minHeight: "100px", paddingBottom: 1 }}
                          ref={exerciseDroppableProvided.innerRef}
                        >
                          {item.exercise.map((exercise, index) => (
                            <ExerciseContainer
                              dateOfWeekId={date.id}
                              classIndex={classIndex}
                              exercise={exercise}
                              exerciseIndex={index}
                            />
                          ))}
                          {exerciseDroppableProvided.placeholder}
                        </div>
                      </div>
                    </div>
                  )}
                </Droppable>
                <CreateExercise
                  dateIndex={date.index}
                  classIndex={classIndex}
                ></CreateExercise>
              </div>
            );
          }}
        </Draggable>
      );
    });
  };
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>MATI</h1>
      <div style={{ display: "flex", height: "100%", width: "100%" }}>
        <DragDropContext onDragEnd={onDragEnd}>
          {datesOfWeekBoardData.dateOfWeek.map((item, index) => {
            return (
              <div
                key={`date_${item.id}`}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "start",
                }}
              >
                <h4 style={{ marginBottom: 0, marginLeft: "8px" }}>
                  {item.title}
                </h4>
                <div style={{ margin: 8 }}>
                  <Droppable
                    type="COLUMN"
                    droppableId={`date_${item.id}`}
                    ignoreContainerClipping={false}
                    isCombineEnabled={false}
                  >
                    {(provided, snapshot) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          background: snapshot.isDraggingOver
                            ? "lightblue"
                            : "lightgrey",
                          padding: 4,
                          width: 250,
                          minHeight: 500,
                        }}
                      >
                        <h4>{item.date.substring(0, 2)}</h4>
                        {WeekViews(item)}
                        {provided.placeholder}
                        <CreateClass {...item}></CreateClass>
                      </div>
                    )}
                  </Droppable>
                </div>
              </div>
            );
          })}
        </DragDropContext>
      </div>
    </div>
  );
};

export default Board;
