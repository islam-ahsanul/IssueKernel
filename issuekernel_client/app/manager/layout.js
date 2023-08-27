import ManagerTopBar from '@/components/ManagerTopBar';
import ManagerLeftSidebar from '@/components/ManagerLeftSidebar';

export const metadata = {
  title: 'Manager Panel',
  description: 'An issue tracker app!',
};

const AdminLayout = ({ children }) => {
  return (
    <main className="flex flex-row">
      <ManagerTopBar />
      <ManagerLeftSidebar />
      <section className="main-container">
        <div className="w-full max-w-5xl">{children}</div>
      </section>
    </main>
  );
};

export default AdminLayout;
