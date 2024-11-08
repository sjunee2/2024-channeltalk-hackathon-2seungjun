import { Task } from '../../types/task'
import { isSameDate } from './isSameDate'

export const groupDatesByWeek = (
  startDay: Date,
  endDay: Date,
  taskData: Task[]
) => {
  const weeks: { date: Date; tasks: Task[] }[][] = []
  let currentWeek: { date: Date; tasks: Task[] }[] = []
  const currentDate = new Date(startDay)

  while (currentDate <= endDay) {
    currentWeek.push({
      date: new Date(currentDate),
      tasks: taskData.filter((val) =>
        isSameDate(new Date(val.endDate), currentDate)
      ),
    })

    if (currentWeek.length === 7 || currentDate.getDay() === 6) {
      weeks.push(currentWeek)
      currentWeek = []
    }
    currentDate.setDate(currentDate.getDate() + 1)
  }

  if (currentWeek.length > 0) {
    weeks.push(currentWeek)
  }

  return weeks
}
