import TopBar from '@/components/TopBar';
import LeftSidebar from '@/components/LeftSidebar';

export const metadata = {
  title: 'Admin Panel',
  description: 'An issue tracker app!',
};

const AdminLayout = ({ children }) => {
  return (
    <main className="flex flex-row">
      <TopBar />
      <LeftSidebar />
      <section className="main-container">
        <div className="w-full max-w-5xl">{children}</div>
      </section>
    </main>
  );
};

export default AdminLayout;
