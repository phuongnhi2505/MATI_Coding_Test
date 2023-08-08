import {
    Card,
    CardContent,
    CardHeader
} from "@mui/material";
import { Draggable, Droppable, DroppableProvided } from "react-beautiful-dnd";
import { Exercise } from "../Pages/Board";

  interface ExerciseContainerProps {
    dateOfWeekId: string,
    classIndex: number,
    exercise: Exercise,
    exerciseIndex: number
  }

  const ExerciseContainer: React.FC<ExerciseContainerProps> = ({
    dateOfWeekId,classIndex, exercise, exerciseIndex
  }) => {
    // const isCurrentDate = (date: string) => {
    //   return moment().diff(date) > 0;
    // };
    return (
        <Droppable
          droppableId={`${dateOfWeekId}_${classIndex}`}
          mode="virtual"
          renderClone={() => <>234234</>}
          key={`exercise_${dateOfWeekId}_${classIndex}_${exerciseIndex}`}
        >
          {(droppableProvided: DroppableProvided) => (
            <div ref={droppableProvided.innerRef}>
              <Draggable
                key={dateOfWeekId}
                index={exerciseIndex}
                draggableId={exerciseIndex.toString()}
              >
                {(draggableProvided, draggableSnapshot) => (
                  <Card
                  variant="outlined"
                  ref={draggableProvided.innerRef}
                  {...draggableProvided.draggableProps}
                  {...draggableProvided.dragHandleProps}
                  key={`exercise_${dateOfWeekId}_${classIndex}_${exerciseIndex}`}
                >
                  <CardHeader
                    sx={{ textAlign: "end" }}
                    title={exercise.title}
                  ></CardHeader>
                  <CardContent>
                    <div style={{ position: "relative" }}>
                      <span
                        style={{
                          top: 0,
                          left: 0,
                          position: "absolute",
                        }}
                      >
                        {exercise.number}
                      </span>
                      <span
                        style={{
                          top: 0,
                          right: 0,
                          position: "absolute",
                        }}
                      >
                        {exercise.works}
                      </span>
                    </div>
                  </CardContent>
                </Card>
                )}
              </Draggable>
            </div>
          )}
        </Droppable>
      );
  };
  
  export default ExerciseContainer;
  