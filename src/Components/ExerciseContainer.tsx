import { Box, Card, CardContent, CardHeader, Typography } from "@mui/material";
import { Draggable, Droppable, DroppableProvided } from "react-beautiful-dnd";
import { Exercise } from "../Pages/Board";

interface ExerciseContainerProps {
  dateOfWeekId: string;
  classIndex: number;
  exercise: Exercise;
  exerciseIndex: number;
}

const ExerciseContainer: React.FC<ExerciseContainerProps> = ({
  dateOfWeekId,
  classIndex,
  exercise,
  exerciseIndex,
}) => {
  return (
    <Draggable
      draggableId={`date_${dateOfWeekId}_${classIndex}_${exerciseIndex}`}
      index={exerciseIndex}
    >
      {(dragProvided, snapshot) => (
        <Card
          ref={dragProvided.innerRef}
          {...dragProvided.draggableProps}
          {...dragProvided.dragHandleProps}
          variant="outlined"
          sx={{
            backgroundColor: snapshot.isDragging ? "var(--purple-1)" : null,
            marginBottom: 1
          }}
        >
          <Typography align="right" variant="subtitle1" noWrap sx={{padding: 1}}>{exercise.name}</Typography>
          <CardContent>
            <div style={{ position: "relative", color:'gray' }}>
              <span
                style={{
                  top: 0,
                  left: -1,
                  position: "absolute",
                }}
              >
                {exercise.sets}
              </span>
              <span
                style={{
                  top: 0,
                  right: -1,
                  position: "absolute",
                }}
              >
                {exercise.setInfomation}
              </span>
            </div>
          </CardContent>
        </Card>
      )}
    </Draggable>
  );
};

export default ExerciseContainer;
