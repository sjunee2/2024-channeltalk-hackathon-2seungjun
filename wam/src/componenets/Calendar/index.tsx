import { Role, Task, User } from '../../types/task'

interface CalendarProps {
  taskData: Task[]
  roleData: Role[]
  userData: User[]
  myData: User
}

const Calendar = ({ taskData, roleData, userData, myData }: CalendarProps) => {
  return (
    <div>
    <h2>Task Calendar</h2>
    <ul>
      {taskData.map((task) => (
        <li key={task.id}>
          <div>
            {task.status} * {task.assignUser.join(', ')}
          </div>
          <div>
            {task.role}
          </div>
          <div>
            {task.startDate} ~ {task.endDate}
          </div>
          <div>
            {task.title}
          </div>
          <div>
            {task.contents}
          </div>
        </li>
      ))}
      <div>
        {roleData.map((role) => (
          <div key={role.id}>
            {role.name}
          </div>
        ))}
      </div>
      <div>
        {userData.map((user) => (
          <div key={user.id}>
            {user.nickname}
          </div>
        ))}
      </div>
      <div>
        {myData.nickname}
      </div>
    </ul>
  </div>
  )
}

export default Calendar
