import { isMobile } from './utils/userAgent'

// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css'

import { MantineProvider } from '@mantine/core'
import Calendar from './componenets/Calendar'
import { FilterStatusInterface, Role, Task, User } from './types/task'
import { useEffect, useState } from 'react'

function App() {
  const [taskData, setTaskData] = useState<Task[]>([
    {
      id: 123,
      assignUser: ['halion'],
      contents: '해커톤',
      role: 'FE',
      title: '해커톤',
      status: 'done',
      startDate: '2024-11-7',
      endDate: '2024-11-9',
    },
    {
      id: 123,
      assignUser: ['halion'],
      contents: '다른거',
      role: 'FE',
      title: '다른거',
      status: 'done',
      startDate: '2024-11-5',
      endDate: '2024-11-8',
    },
  ])
  const [filterState, setFilterState] = useState<FilterStatusInterface>({
    status: [],
    assignUser: [],
    role: [],
  })
  // const filteredData = useMemo(() => tas)
  useEffect(() => {
    setFilterState({
      status: [],
      assignUser: [],
      role: [],
    })
  }, [])

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
        <Calendar taskData={taskData} />
      </div>
    </MantineProvider>
    // </AppProvider>
  )
}

export default App
