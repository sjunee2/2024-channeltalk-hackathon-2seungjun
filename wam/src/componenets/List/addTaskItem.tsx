import { useState } from 'react'

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
      [name]: type === 'date' ? new Date(value).toISOString().split('T')[0] : value,
    })
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('Submit:', task)
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
      oldStatus === 'proposal' ? 'progress' :
        oldStatus === 'progress' ? 'done' :
          'done'

    setTask((prevTask) => ({
      ...prevTask,
      status: newStatus,
    }))
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
  }

  return (
    <form onSubmit={onSubmit}>
      <button type="button" name="status" onClick={onStatusClick} onContextMenu={onStatusRightClick}>
        {task.status}
      </button>
      <input name="title" value={task.title} onChange={onChange} />
      <input name="role" value={task.role} onChange={onChange} />
      <input name="contents" value={task.contents} onChange={onChange} />
      <input name="startDate" type="date" value={task.startDate} onChange={onChange} />
      <input name="endDate" type="date" value={task.endDate} onChange={onChange} />
      <button type="submit">Submit</button>
    </form>
  )
}

export default AddTaskItem
