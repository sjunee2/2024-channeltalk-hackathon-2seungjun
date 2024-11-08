import { isMobile } from './utils/userAgent'

// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css'

import { MantineProvider } from '@mantine/core'
import Calendar from './componenets/Calendar'
import { Role, Task, User } from './types/task'

function App() {
  // useEffect(() => {
  //   const appearance = getWamData('appearance')
  //   setTheme(appearance === 'dark' ? 'dark' : 'light')
  // }, [])

  const taskData: Task[] = []
  const roleData: Role[] = []
  const userData: User[] = []
  const myData: User = { id: '123124', role: '소유자', nickname: '2sj' }

  return (
    // <AppProvider themeName={theme}>
    <MantineProvider>
      <div style={{ padding: isMobile() ? '16px' : '0 24px 24px 24px' }}>
        <Calendar
          taskData={taskData}
          roleData={roleData}
          userData={userData}
          myData={myData}
        />
      </div>
    </MantineProvider>
    // </AppProvider>
  )
}

export default App
