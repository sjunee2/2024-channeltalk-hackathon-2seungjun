import { Task } from '../../types/task'
import { useState } from 'react'
import { useDebouncedCallback } from '@mantine/hooks'
import { getWamData } from '../../utils/wam'
import styled from 'styled-components'
import { BASE_URL } from '../../secret'

const TaskItem = ({
  id,
  taskStatus,
  title,
  contents,
  startDate,
  endDate,
  taskUserMaps,
}: Task) => {
  const [task, setTask] = useState<Task>({
    id: id,
    taskStatus: taskStatus,
    title: title,
    contents: contents,
    startDate: startDate,
    endDate: endDate,
    role: 'manager',
    taskUserMaps: taskUserMaps,
  })

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target
    setTask({
      ...task,
      [name]:
        type === 'date' ? new Date(value).toISOString().split('T')[0] : value,
    })
  }

  const debouncedUpdateServer = useDebouncedCallback((task: Task) => {
    const channelId = getWamData('channelId') ?? []
    fetch(`${BASE_URL}/functions/task`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: task.id,
        channelId,
        taskStatus: task.taskStatus,
        title: task.title,
        contents: task.contents,
        role: task.role,
        startDate: task.startDate,
        endDate: task.endDate,
        userIds: task.taskUserMaps,
        deleteAt: new Date().getTime(),
      }),
    })
  }, 1000)

  const onBlur = () => {
    // Server update
    debouncedUpdateServer(task)
  }

  const onStatusClick = () => {
    const oldStatus = task.taskStatus
    const newStatus =
      oldStatus === 'proposal'
        ? 'progress'
        : oldStatus === 'progress'
          ? 'done'
          : 'done'

    setTask((prevTask) => ({
      ...prevTask,
      status: newStatus,
    }))
    console.log('Update server', task)
  }

  const onStatusRightClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const oldStatus = task.taskStatus
    const newStatus =
      oldStatus === 'done'
        ? 'progress'
        : oldStatus === 'progress'
          ? 'proposal'
          : 'proposal'

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
    if (task.taskUserMaps) {
      setTask((prevTask) => ({
        ...prevTask,
        assignUser: [],
      }))
    }
    console.log('Assign user')
  }

  const onDelete = () => {
    const channelId = getWamData('channelId') ?? []
    fetch(`${BASE_URL}/functions/task`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: task.id,
        channelId,
        taskStatus: task.taskStatus,
        title: task.title,
        contents: task.contents,
        role: task.role,
        startDate: task.startDate,
        endDate: task.endDate,
        userIds: task.taskUserMaps,
        deleteAt: null,
      }),
    })
  }

  return (
    <Wrapper key={id}>
      <CustomButton
        name="status"
        onClick={onStatusClick}
        onContextMenu={onStatusRightClick}
      >
        {task.taskStatus}
      </CustomButton>
      <CustomButton
        name="assignUser"
        onClick={onAssignUserClick}
        onContextMenu={onAssignUserRightClick}
      >
        {task.taskUserMaps[0]}
      </CustomButton>
      <CustomInput
        name="role"
        value={task.role}
        onChange={onChange}
        onBlur={onBlur}
      />
      <CustomInput
        name="title"
        value={task.title}
        onChange={onChange}
        onBlur={onBlur}
      />
      <CustomInput
        name="contents"
        value={task.contents}
        onChange={onChange}
        onBlur={onBlur}
      />
      <CustomInput
        name="startDate"
        type="date"
        value={task.startDate}
        onChange={onChange}
        onBlur={onBlur}
      />
      <CustomInput
        name="endDate"
        type="date"
        value={task.endDate}
        onChange={onChange}
        onBlur={onBlur}
      />
      <CustomButton onClick={onDelete}>Delete</CustomButton>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
`

const CustomButton = styled.button`
  border: none;
  font-size: 16px;
  background-color: white;
  width: 80px;
  text-align: center;
`

const CustomInput = styled.input`
  font-size: 16px;
  border: none;
  width: 110px;
  text-align: center;
`

export default TaskItem
