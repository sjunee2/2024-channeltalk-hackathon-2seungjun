import { Task } from '../../types/task'
import { useState } from 'react'
import { useDebouncedCallback } from '@mantine/hooks'
import { callFunction } from '../../utils/wam'
import { useAppIdStore } from '../../store/appId'

const TaskItem = ({ id, status, title, contents, startDate, endDate, role, assignUser }: Task) => {
  const [task, setTask] = useState({
    id: id,
    status: status,
    title: title,
    contents: contents,
    startDate: startDate,
    endDate: endDate,
    role: role,
    assignUser: assignUser,
  })

  const { appId } = useAppIdStore()

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target
    setTask({
      ...task,
      [name]: type === 'date' ? new Date(value).toISOString().split('T')[0] : value,
    })
  }

  const debouncedUpdateServer = useDebouncedCallback((task: Task) => {
    console.log('Update server', task)
  }, 1000)

  const onBlur = () => {
    // Server update
    debouncedUpdateServer(task)
  }

  const onStatusClick = () => {
    const oldStatus = task.status
    const newStatus =
      oldStatus === 'proposal' ? 'progress' :
        oldStatus === 'progress' ? 'done' :
          'done'

    setTask((prevTask) => ({
      ...prevTask,
      status: newStatus,
    }))
    console.log('Update server', task)
  }

  const onStatusRightClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const oldStatus = task.status
    const newStatus =
      oldStatus === 'done' ? 'progress' :
        oldStatus === 'progress' ? 'proposal' :
          'proposal'

    setTask((prevTask) => ({
      ...prevTask,
      status: newStatus,
    }))
    console.log('Update server', task)
  }

  const onAssignUserClick = () => {
    console.log('Assign user')
  }

  const onAssignUserRightClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (task.assignUser) {
      setTask((prevTask) => ({
        ...prevTask,
        assignUser: [],
      }))
    }
    console.log('Assign user')
  }

  const onDelete = () => {
    async function deleteTask(task: Task) {
      await callFunction(appId, 'PUT', {
        input: {
          task: task,
        },
      })
    }
    deleteTask(task)
    console.log('Delete task', task)
  }

  return (
    <div key={id}>
      <button name="status" onClick={onStatusClick} onContextMenu={onStatusRightClick}>{task.status}</button>
      <button name="assignUser" onClick={onAssignUserClick} onContextMenu={onAssignUserRightClick}>{task.assignUser}</button>
      <input name="role" value={task.role} onChange={onChange} onBlur={onBlur} />
      <input name="title" value={task.title} onChange={onChange} onBlur={onBlur} />
      <input name="contents" value={task.contents} onChange={onChange} onBlur={onBlur} />
      <input name="startDate" type="date" value={task.startDate} onChange={onChange} onBlur={onBlur} />
      <input name="endDate" type="date" value={task.endDate} onChange={onChange} onBlur={onBlur} />
      <button onClick={onDelete}>Delete</button>
    </div>
  )
}

export default TaskItem
