import { Task } from '../../types/task'
import TaskItem from './taskItem'
import AddTaskItem from './addTaskItem'
import styled from 'styled-components'

interface ListProps {
  taskData: Task[]
}

const List = ({ taskData }: ListProps) => {
  const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
  `
  
  return (
    <div>
      <h2>Task List</h2>
      <Wrapper>
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
      </Wrapper>
    </div>
  )
};

export default List
