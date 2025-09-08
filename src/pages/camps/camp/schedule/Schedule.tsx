import { Box, Grid, Typography } from "@mui/material";
import type { Dayjs } from "dayjs";
import { useEffect, useState } from "react";

interface Props {
  startDate: Dayjs;
  endDate: Dayjs;
}

const DAYS_IN_WEEK = 7;

export default function Schedule(props: Props) {
  const [currentWeekIndex, setCurrentWeekIndex] = useState<number>(0);
  const [weeks, setWeeks] = useState<Dayjs[][]>([]);

  function calcWeeks(): Dayjs[][] {
    const days = props.endDate.diff(props.startDate, "day") + 1;
    const weeks = [];
    let week = [];

    let currentDay = props.startDate.clone();

    for (let i = 0; i < days * DAYS_IN_WEEK; i++) {
      week.push(currentDay);
      if (week.length === DAYS_IN_WEEK) {
        weeks.push(week);
        week = [];
      }
      currentDay = currentDay.add(1, "day");
    }
    return weeks;
  }

  useEffect(() => {
    const weeks = calcWeeks();
    setWeeks(weeks);
  }, []);

  return (
    <>
      {weeks.length > 0 && (
        <>
          <Typography variant="h6">
            {weeks[currentWeekIndex][0].format("DD.MM.YYYY")} -{" "}
            {weeks[currentWeekIndex][weeks[currentWeekIndex].length - 1].format(
              "DD.MM.YYYY",
            )}
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
            }}
          >
            <Box
              sx={{
                alignSelf: "stretch",
                display: "grid",
                gridTemplateColumns: "repeat(7, 1fr)",
                width: "100%",
                height: "100%",
                maxHeight: "100vh",
                border: "1px solid red",
              }}
            >
              {weeks[currentWeekIndex].map((item, i) => (
                <Box
                  key={item.toISOString()}
                  sx={{
                    border: "1px solid #000",
                  }}
                >
                  <Typography variant="h6">
                    {item.format("DD.MM.YYYY")}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </>
      )}
    </>
  );
}
