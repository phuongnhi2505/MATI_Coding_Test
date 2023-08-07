import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import moment from "moment";
import { ReactNode } from "react";
import { IDate } from "../Pages/TrainingSessions";
import { useAppSelector } from "../Store/hook";
import { RootState } from "../Store/store";
import CreateTrainingSession, {
  ITrainingSession,
} from "./CreateTrainingSession";
import TrainingSession from "./TrainingSession";
interface TrainingContainerProps {
  dates: IDate[];
  trainingSessions: ITrainingSession[]
}
const TrainingSessionContainer: React.FC<TrainingContainerProps> = ({
  dates,
  trainingSessions
}) => {
  const isCurrentDate = (date: string) => {
    return moment().diff(date) > 0;
  };
  const renderTrainingSessions = (date: string): ReactNode[] => {
    const trainingSessionsOfDate = trainingSessions.filter(item => item.createDate === date)
    const arr: ReactNode[] = [];
    trainingSessionsOfDate.forEach((item, index) => {
      arr.push(
        <TrainingSession
          key={item.id}
          id={item.id}
          name={item.name}
          createDate={item.createDate}
        ></TrainingSession>
      );
    });
    return arr;
  };

  return (
    <>
      {dates.map((item) => (
        <Box
          key={item.displayDate}
          sx={{
            width: 350,
            display: "inline-block",
            padding: 1,
          }}
        >
          <Typography variant="h6">{item.displayDate}</Typography>
          <Card
            sx={{
              backgroundColor: "var(--purple-2)",
              boxShadow: "none",
            }}
          >
            <CardHeader
              title={item.day}
              sx={isCurrentDate(item.date) ? { color: "var(--purple-6)" } : {}}
            ></CardHeader>
            <CardContent>{renderTrainingSessions(item.date)}</CardContent>
            <CardActions sx={{ justifyContent: "end" }}>
              <CreateTrainingSession date={item.date}></CreateTrainingSession>
            </CardActions>
          </Card>
        </Box>
      ))}
    </>
  );
};

export default TrainingSessionContainer;
