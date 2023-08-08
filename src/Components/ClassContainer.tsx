import { Box, Card, CardActions, CardContent, CardHeader, Container } from "@mui/material";
import { Draggable, Droppable, DroppableProvided } from "react-beautiful-dnd";
import { ClassInformation, DateOfWeek } from "../Pages/Board";
import CreateTrainingSession from "./CreateClass";
import { ReactNode } from "react";
const ClassContainer: React.FC<DateOfWeek> = (props) => {
  const getRenderItem =
    (x: any) => (provided: any, snapshot: any, rubric: any) => {
      return (
        <div {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}>
          <Card
            sx={{
              boxShadow: "none",
              backgroundColor: 'var(--purple-3)'
            }}
          >
            <CardHeader
              title={x.title}
              sx={{ color: "var(--purple-6)", whiteSpace: "nowrap" }}
            ></CardHeader>
            <CardContent>
              {x.exercise.map((item: any, idx: number) => (
                <Card
                  variant="outlined"
                  key={idx}
                >
                  <CardHeader
                    sx={{ textAlign: "end" }}
                    title={item.title}
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
                        {item.number}
                      </span>
                      <span
                        style={{
                          top: 0,
                          right: 0,
                          position: "absolute",
                        }}
                      >
                        {item.works}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </div>
      );
    };

  return (
    <Box sx={{minHeight: '100vh'}}>
      {props.classes.map((x, i) => {
        return (
          // <Droppable
          //   droppableId={`${props.id}_${i}`}
          //   mode="standard"
          //   renderClone={getRenderItem(x)}
          //   key={`class_${props.id}_${i}`}
          // >
          //   {(droppableProvided: DroppableProvided) => (
              <Box
                sx={{padding: 1}}
                key={i}
                // ref={droppableProvided.innerRef} {...droppableProvided.droppableProps}
                >
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
                        sx={{ color: "var(--purple-6)" ,whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}
                      ></CardHeader>
                      <CardContent>
                        {x.exercise.map((item, idx) => (
                          <Card
                            variant="outlined"
                            ref={draggableProvided.innerRef}
                            {...draggableProvided.draggableProps}
                            {...draggableProvided.dragHandleProps}
                            key={`class_${props.id}_${i}_${idx}`}
                          >
                            <CardHeader
                              sx={{ textAlign: "end" }}
                              title={item.title}
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
                                  {item.number}
                                </span>
                                <span
                                  style={{
                                    top: 0,
                                    right: 0,
                                    position: "absolute",
                                  }}
                                >
                                  {item.works}
                                </span>
                              </div>
                            </CardContent>
                          </Card>
                          // <ExerciseContainer
                          //   key={`class_${props.id}_${i}_${idx}`}
                          //   dateOfWeekId={props.id} classIndex={i} exercise={item} exerciseIndex={idx}/>
                        ))}
                      </CardContent>
                    </Card>
                  )}
                </Draggable>
              </Box>
            )}
      //     </Droppable>
      //   );
      // }
      )}
    </Box>
  );
};

export default ClassContainer;
