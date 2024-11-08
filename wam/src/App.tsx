import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css'
import CalendarPage from './pages/CalendarPage'
import { AppProvider } from '@channel.io/bezier-react'
import { MantineProvider } from '@mantine/core'

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <div>루트 페이지에서 보여야 하는 것</div>,
    },
    {
      path: '/calendar',
      element: <CalendarPage />,
    },
  ])
  return (
    <AppProvider>
      <MantineProvider>
        <RouterProvider router={router} />
      </MantineProvider>
    </AppProvider>
  )
}

export default App
