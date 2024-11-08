import { Task } from '../../types/task'
import TaskItem from './taskItem'
import AddTaskItem from './addTaskItem'

interface ListProps {
  taskData: Task[]
}

const List = ({ taskData }: ListProps) => {
  return (
    <div>
      <h2>Task List</h2>
      <div>
        {taskData.map((task) => (
          <TaskItem
            key={task.id}
            id={task.id}
            status={task.status}
            title={task.title}
            contents={task.contents}
            startDate={task.startDate}
            endDate={task.endDate}
            role={task.role}
            assignUser={task.assignUser}
          />
        ))}
        <AddTaskItem />
      </div>
    </div>
  )
};

export default List
