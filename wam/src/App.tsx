import { isMobile } from './utils/userAgent'

// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css'

import { MantineProvider } from '@mantine/core'
import Calendar from './componenets/Calendar'
import {
  FilterStatusInterface,
  FilterType,
  Role,
  Task,
  User,
} from './types/task'
import { useMemo, useState } from 'react'

function App() {
  const [taskData, setTaskData] = useState<Task[]>([])
  const [filterState, setFilterState] = useState<FilterStatusInterface>({
    status: [],
    assignUser: [],
    role: [],
  })
  // const filteredData = useMemo(() => tas)

  const roleData: Role[] = []
  const userData: User[] = []
  const myData: User = { id: '123124', role: '소유자', nickname: '2sj' }

  return (
    // <AppProvider themeName={theme}>
    <MantineProvider>
      <div style={{ padding: isMobile() ? '16px' : '0 24px 24px 24px' }}>
        <Calendar taskData={taskData} />
      </div>
    </MantineProvider>
    // </AppProvider>
  )
}

export default App
