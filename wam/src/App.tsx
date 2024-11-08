import { isMobile } from './utils/userAgent'

// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css'

import { Input, MantineProvider } from '@mantine/core'

function App() {
  // useEffect(() => {
  //   const appearance = getWamData('appearance')
  //   setTheme(appearance === 'dark' ? 'dark' : 'light')
  // }, [])

  return (
    // <AppProvider themeName={theme}>
    <MantineProvider>
      <div style={{ padding: isMobile() ? '16px' : '0 24px 24px 24px' }}>
        <Input />
      </div>
    </MantineProvider>
    // </AppProvider>
  )
}

export default App
