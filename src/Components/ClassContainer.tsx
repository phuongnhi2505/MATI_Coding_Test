import { Draggable, Droppable } from "react-beautiful-dnd";
import { ClassInformation } from "../Pages/Board";
import CreateExercise from "./CreateExercise";
import ExerciseContainer from "./ExerciseContainer";
import { Box, Card, CardContent, CardHeader, Typography } from "@mui/material";

interface ClassContainerProps {
  dateId: string,
  dateIndex: number,
  classIndex: number,
  classData: ClassInformation,
}
const ClassContainer: React.FC<ClassContainerProps> = ({
  dateId,
  dateIndex,
  classIndex,
  classData,
}) => {
  return (
    <Draggable
          key={`date_${dateId}_class_${classIndex}_${classIndex}`}
          draggableId={`class_${dateId}_${classIndex}`}
          index={classIndex}
        >
          {(provided, snapshot) => {
            return (
              <Card
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                variant="outlined"
                sx={{
                  padding: 1,
                  minHeight: "50px",
                  backgroundColor: snapshot.isDragging
                    ? "var(--purple-3)"
                    : null,
                    marginBottom: 1
                }}
              >
                <Typography variant="h6" noWrap sx={{ padding: 0, color: 'var(--purple-5)'}}>
                  {classData.title}
                </Typography>
                <CardContent sx={{ padding: 0 }}>
                  <Droppable
                    droppableId={`date_${dateIndex}_class_${classIndex}`}
                    isDropDisabled={false}
                    ignoreContainerClipping={false}
                    isCombineEnabled={false}
                    renderClone={undefined}
                  >
                    {(exerciseDroppableProvided, exerciseSnapshot) => (
                      <Box
                        {...exerciseDroppableProvided.droppableProps}
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          paddingBottom: 0,
                          transition:
                            "background-color 0.2s ease, opacity 0.1s ease",
                          userSelect: "none",
                          background: exerciseSnapshot.isDraggingOver
                            ? "lightblue"
                            : null,
                        }}
                      >
                        <Box
                          sx={{ minHeight: "100px" }}
                          ref={exerciseDroppableProvided.innerRef}
                        >
                          {classData.exercise.map((exercise, index) => (
                            <ExerciseContainer
                              key={`date_${dateIndex}_class${classIndex}_exercise_${index}`}
                              dateOfWeekId={dateId}
                              classIndex={classIndex}
                              exercise={exercise}
                              exerciseIndex={index}
                            />
                          ))}
                          {exerciseDroppableProvided.placeholder}
                        </Box>
                      </Box>
                    )}
                  </Droppable>
                </CardContent>
                {!snapshot.isDragging ? (
                  <CreateExercise
                    dateIndex={dateIndex}
                    classIndex={classIndex}
                  />
                ) : null}
              </Card>
            );
          }}
        </Draggable>
  );
};

export default ClassContainer;
