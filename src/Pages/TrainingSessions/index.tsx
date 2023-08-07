import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable
} from "react-beautiful-dnd";
import CreateTrainingSession, {
  ITrainingSession,
} from "../../Components/CreateTrainingSession";
import { useAppDispatch, useAppSelector } from "../../Store/hook";
import { RootState } from "../../Store/store";
import groupBy from "../../Util/GroupBy";
import { update } from "./TrainingSessionSlice";

export interface IDate {
  displayDate: string;
  date: string;
  day: string;
}

const TrainingSessions = () => {
  const [dates, setDates] = useState<IDate[]>([]);
  const trainingSessions = useAppSelector(
    (state: RootState) => state.trainingSession
  );
  const [columns, setColumns] = useState(
    groupBy(trainingSessions, "createDate")
  );
  const dispatch = useAppDispatch();
  const DATESOFWEEK = ["MON", "TUE", "WED", "THU", "TRI", "SAT", "SUN"];
  const getDatesOfWeek = (): IDate[] => {
    const startOfWeek = moment().startOf("week");
    const arr: IDate[] = [];
    const length = DATESOFWEEK.length;
    for (let i = 0; i < length; i++) {
      const date = startOfWeek.add(1, "days").format("DD/MM/YYYY");
      arr.push({
        displayDate: DATESOFWEEK[i],
        date: date,
        day: date.substring(0, 2)
      });
    }
    return arr;
  };
  useEffect(() => {
    setDates(getDatesOfWeek());
  }, []);
  useEffect(() => {
    const obj = {}
    if(dates){
      dates.forEach(item => {
        Object.defineProperty(obj,item.date,{
          value: trainingSessionsOfDate(item.date),
          writable: true, 
          configurable: true, 
          enumerable: true 
        })
      })
    }
    setColumns(obj);
  }, [dates])
  const trainingSessionsOfDate = (date: string): ITrainingSession[] =>
    trainingSessions.filter((item) => item.createDate === date);
  const updateTrainingSessions = (list: any) => {
    const arr: ITrainingSession[] = [];
    for (const i in list){
      if(list[i]){
        arr.push(...list[i])
      }
    }
    dispatch(update(arr));
  };

  const onDragEnd = useCallback(
    (result: any, columns: any[], setColumns: any) => {
      if (!result.destination) return;
      const { source, destination } = result;
      if (source.droppableId !== destination.droppableId) {
        const sourceItems = columns[source.droppableId];

        let destItems = columns[destination.droppableId] ;
        const [removed] = sourceItems.splice(source.index, 1);
        destItems.splice(destination.index, 0, {
          ...removed,
          createDate: destination.droppableId,
        });
        setColumns({
          ...columns,
          [source.droppableId]: sourceItems,
          [destination.droppableId]: destItems,
        });
      } else {
        const copiedItems = trainingSessionsOfDate(source.droppableId);
        const [removed] = copiedItems.splice(source.index, 1);
        copiedItems.splice(destination.index, 0, removed);
        setColumns({
          ...columns,
          [source.droppableId]: copiedItems,
        });
      }
      updateTrainingSessions(columns);
    },
    []
  );

  const renderTrainingSession = (date: string) => {
    let element: ITrainingSession[] = columns[date];
    if(!element){
      return null
    }
    return element.map((trainingSession, idx) => {
      return (
        <Draggable
          key={trainingSession.id}
          draggableId={trainingSession.id.toString()}
          index={idx}
        >
          {(provided, snapshot) => {
            return (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                style={{
                  userSelect: "none",
                  padding: 16,
                  margin: "0 0 8px 0",
                  minHeight: "50px",
                  backgroundColor: snapshot.isDragging ? "#263B4A" : "#456C86",
                  color: "white",
                  ...provided.draggableProps.style,
                }}
              >
                {trainingSession.name}
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
        <DragDropContext
          onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
        >
          {dates.map((item, index) => {
            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "start",
                }}
                key={item.date}
              >
                <h4 style={{ marginBottom: 0, marginLeft: "8px" }}>
                  {item.displayDate}
                </h4>
                <div style={{ margin: 8 }}>
                  <Droppable droppableId={item.date} key={item.date}>
                    {(provided, snapshot) => {
                      return (
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
                          <h4>{item.day}</h4> 
                          {renderTrainingSession(item.date)}
                          {provided.placeholder}
                          <CreateTrainingSession
                            date={item.date}
                          ></CreateTrainingSession>
                        </div>
                      );
                    }}
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

export default TrainingSessions;
