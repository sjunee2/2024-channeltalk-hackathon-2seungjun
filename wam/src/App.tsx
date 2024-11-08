// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css'
import CalendarPage from './pages/CalendarPage'
import { AppProvider } from '@channel.io/bezier-react'
import { MantineProvider } from '@mantine/core'
// import { useAppIdStore } from './store/appId'
// import { useMemo, useEffect } from 'react'
// import { getWamData, setSize } from './utils/wam'

function App() {
  // const appId = useMemo(() => getWamData('appId') ?? '', [])
  // const { setAppId } = useAppIdStore()

  // useEffect(() => {
  //   setAppId(appId)
  //   setSize(800, 700)
  // }, [appId, setAppId])

  return (
    <AppProvider>
      <MantineProvider>
        <CalendarPage />
      </MantineProvider>
    </AppProvider>
  )
}

export default App
