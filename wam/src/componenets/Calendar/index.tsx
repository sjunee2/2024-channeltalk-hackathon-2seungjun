import { Role, Task } from '../../types/task'

interface CalendarProps {
  taskData: Task[]
  roleData: Role[]
  userData: User[]
  myData: User
}

const Calendar = ({ taskData, roleData }: CalendarProps) => {
  return <div>캘린더 입니다</div>
}

export default Calendar