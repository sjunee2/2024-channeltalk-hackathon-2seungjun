import { useState } from 'react'
import styled from 'styled-components'
import { BASE_URL } from '../../secret'
import { getWamData } from '../../utils/wam'

const AddTaskItem = () => {
  const [task, setTask] = useState({
    id: '',
    status: 'proposal',
    title: '',
    contents: '',
    startDate: '',
    endDate: '',
    role: '',
    assignUser: [],
  })

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target
    setTask({
      ...task,
      [name]:
        type === 'date' ? new Date(value).toISOString().split('T')[0] : value,
    })
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('Submit:', task)

    const channelId = getWamData('channelId') ?? []
    fetch(`${BASE_URL}/functions/task`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: task.id,
        channelId,
        taskStatus: task.status,
        title: task.title,
        contents: task.contents,
        role: task.role,
        startDate: task.startDate,
        endDate: task.endDate,
        userIds: task.assignUser,
        deleteAt: new Date().getTime(),
      }),
    })
    setTask({
      id: '',
      status: 'proposal',
      title: '',
      contents: '',
      startDate: '',
      endDate: '',
      role: '',
      assignUser: [],
    })
  }

  const onStatusClick = () => {
    const oldStatus = task.status
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
  }

  const onStatusRightClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const oldStatus = task.status
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

  return (
    <Wrapper onSubmit={onSubmit}>
      <CustomButton
        type="button"
        name="status"
        onClick={onStatusClick}
        onContextMenu={onStatusRightClick}
      >
        {task.status}
      </CustomButton>
      <CustomButton
        name="assignUser"
        onClick={onAssignUserClick}
        onContextMenu={onAssignUserRightClick}
      >
        {task.assignUser}
      </CustomButton>
      <CustomInput
        name="title"
        value={task.title}
        onChange={onChange}
      />
      <CustomInput
        name="role"
        value={task.role}
        onChange={onChange}
      />
      <CustomInput
        name="contents"
        value={task.contents}
        onChange={onChange}
      />
      <CustomInput
        name="startDate"
        type="date"
        value={task.startDate}
        onChange={onChange}
      />
      <CustomInput
        name="endDate"
        type="date"
        value={task.endDate}
        onChange={onChange}
      />
      <CustomButton type="submit">Submit</CustomButton>
    </Wrapper>
  )
}

const Wrapper = styled.form`
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
  text-align: center;
  font-size: 16px;
  border: none;
  width: 110px;
`

export default AddTaskItem
