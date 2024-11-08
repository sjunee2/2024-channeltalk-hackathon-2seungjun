import { FilterStatusInterface, Role, Task, User } from '../../types/task'

interface CalendarProps {
  taskData: Task[]
  filterState: FilterStatusInterface
  roleData: Role[]
  userData: User[]
  myData: User
}

const Calendar = ({ taskData }: CalendarProps) => {
  return (
    <div>
      <h2>
        {taskData.map(() => (
          <div></div>
        ))}
      </h2>
    </div>
  )
}

export default Calendar
