import Container from "@mui/material/Container";
import { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { ITrainingSession } from "./CreateTrainingSession";
import { Card, CardContent, CardHeader } from "@mui/material";
interface Exercise {
  name: string;
  information: string;
  setOfExercise: number;
}
const TrainingSession: React.FC<ITrainingSession> = ({
  id,
  name,
  createDate
}) => {
  const [exercises, setExercises] = useState<Exercise[]>([
    {
      name: "Tess",
      information: "string",
      setOfExercise: 1,
    },
    {
      name: "Tess212",
      information: "string2",
      setOfExercise: 13,
    },
  ]);
  const getExerciseByTrainingSessionId = (id: number) => {
  };

  useEffect(() => {
    getExerciseByTrainingSessionId(id);
  }, [id]);


  // const renderExercises = () =>{
  //   return exercises.map((item,index) => {
  //     return (
  //       <Draggable draggableId={item.name} index={index}>
  //         {(provided) => (
  //           <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
  //             {item.name}
  //           </li>
  //         )}
  //       </Draggable>
  //     )
  //   });
  // }
  return (
        <Draggable
          key={id}
          draggableId={createDate + id}
          index={id}
        >
          {(provided) => (
            <Container ref={provided.innerRef} {...provided.draggableProps}>
              <Card
                variant="outlined"
                sx={{padding: '0px'}}
                {...provided.dragHandleProps}
              >
                <CardHeader
                  title={name}
                  sx={{ color: "var(--purple-7)" }}
                ></CardHeader>
                <CardContent></CardContent>
                {/* <CardActions>
                  <Button size="small">Learn More</Button>
                </CardActions> */}
              </Card>
            </Container>
          )}
        </Draggable>
  );
};

export default TrainingSession;
