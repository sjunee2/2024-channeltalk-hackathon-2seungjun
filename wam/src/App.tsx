import { isMobile } from './utils/userAgent'

// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css'

import { MantineProvider } from '@mantine/core'
import Calendar from './componenets/Calendar'
import Filter from './componenets/Filter'
import List from './componenets/List'
import { FilterStatusInterface, Role, Task, User } from './types/task'
import { useEffect, useState } from 'react'
import { useFilterStore } from './store/filter'

function App() {
  const [taskData, setTaskData] = useState<Task[]>([])
  const { status, role, assignUser } = useFilterStore()

  useEffect(() => {
    setTaskData([
      {
        id: 1,
        status: 'proposal',
        title: '제안서 작성',
        contents: '제안서 작성하기',
        startDate: '2021-09-01',
        endDate: '2021-09-10',
        role: 'owner',
        assignUser: ['123'],
      },
      {
        id: 2,
        status: 'progress',
        title: '제안서 검토',
        contents: '제안서 검토하기',
        startDate: '2021-09-01',
        endDate: '2021-09-10',
        role: 'owner',
        assignUser: ['123'],
      },
    ])
  }, [])

  const filterTasks = (
    tasks: Task[],
    status: string,
    role: string,
    assignUser: string
  ) => {
    return tasks.filter(
      (task) =>
        (status !== 'none' ? task.status === status : true) &&
        (role !== 'none' ? task.role === role : true) &&
        (assignUser !== 'none' ? task.assignUser.includes(assignUser) : true)
    )
  }

  // const filteredData = useMemo(() => tas)

  const roleData: Role[] = []
  const userData: User[] = []
  const myData: User = { id: '123124', role: '소유자', nickname: '2sj' }

  return (
    // <AppProvider themeName={theme}>
    <MantineProvider>
      <div
        style={{
          width: '800px',
          height: '700px',
          backgroundColor: 'whiteSmoke',
          display: 'flex',
          justifyContent: 'center',
          padding: isMobile() ? '16px' : '0 24px 24px 24px',
        }}
      >
        <Filter />
        <List taskData={filterTasks(taskData, status, role, assignUser)} />
      </div>
    </MantineProvider>
    // </AppProvider>
  )
}

export default App
