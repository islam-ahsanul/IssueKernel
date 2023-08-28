import DevTopBar from '@/components/DevTopBar';
import DevLeftSidebar from '@/components/DevLeftSidebar';

export const metadata = {
  title: 'Developer Panel',
  description: 'An issue tracker app!',
};

const AdminLayout = ({ children }) => {
  return (
    <main className="flex flex-row">
      <DevTopBar />
      <DevLeftSidebar />
      <section className="main-container">
        <div className="w-full max-w-5xl">{children}</div>
      </section>
    </main>
  );
};

export default AdminLayout;
