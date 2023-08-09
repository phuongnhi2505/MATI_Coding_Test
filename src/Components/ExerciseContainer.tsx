import { Box, Card, CardContent, CardHeader } from "@mui/material";
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
      draggableId={`exercise_${dateOfWeekId}_${classIndex}_${exerciseIndex}`}
      index={exerciseIndex}
    >
      {(dragProvided) => (
        <Card
          ref={dragProvided.innerRef}
          {...dragProvided.draggableProps}
          {...dragProvided.dragHandleProps}
        >
          <CardHeader
            sx={{ textAlign: "end" }}
            title={exercise.name}
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
                {exercise.sets}
              </span>
              <span
                style={{
                  top: 0,
                  right: 0,
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
