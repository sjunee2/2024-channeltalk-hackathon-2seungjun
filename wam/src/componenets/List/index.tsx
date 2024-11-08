import { Role, Task, User } from '../../types/task'

interface ListProps {
  taskData: Task[]
  roleData: Role[]
  userData: User[]
  myData: User
}

const List = ({ taskData, roleData, userData, myData }: ListProps) => {
  return (
    <div>
      <h2>Task List</h2>
      <ul>
        {taskData.map((task) => (
          <li key={task.id}>
            {task.title} - {task.contents}
          </li>
        ))}
      </ul>
    </div>
  )
};

export default List
