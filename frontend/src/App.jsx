import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import Inbox from './components/Inbox'
import Navbar from './components/NavBar'
import Sidebar from './components/Sidebar'
import Body from './components/Body'
import Mail from './components/Mail'
import SendEmail from './components/SendEmail'
import Login from './components/Login'
import Signup from './components/Signup'
import { Toaster } from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'


const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Body />,
    children: [
      {
        path: '/',
        element: <Inbox />
      },
      {
        path: '/mail/:id',
        element: <Mail />
      },
    ]
  },
  {
    path: '/login',
    element: <Login/>
  },
  {
    path: '/signup',
    element: <Signup/>
  },
])


function App() {
  const {user} = useSelector(store => store.app);
  return (
    <div className='bg-[#F6F8FC] h-screen'>
      {user && <Navbar/>}
      
      <RouterProvider router={appRouter} />
      {
        user && <div className='absolute w-[30%] bottom-0 right-20 z-10'>
          <SendEmail />
        </div>
      }
      <Toaster/>
    </div>
  )
}

export default App
