import { Outlet } from 'react-router-dom';
import ChatNavBarTop from './pages/ChatNavBarTop';

const PageLayout = () => {
  return (
    <>
      <ChatNavBarTop />
      <Outlet />
    </>
  )
}

export default PageLayout