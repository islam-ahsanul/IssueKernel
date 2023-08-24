import ConsumerLeftSidebar from '@/components/ConsumerLeftSidebar';
import ConsumerTopBar from '@/components/ConsumerTopBar';

export const metadata = {
  title: 'Explore',
  description: 'Explore Projects and Post Issues',
};

const ConsumerLayout = ({ children }) => {
  return (
    <main className="flex flex-row">
      <ConsumerTopBar />
      <ConsumerLeftSidebar />
      <section className="main-container">
        <div className="w-full max-w-5xl">{children}</div>
      </section>
    </main>
  );
};

export default ConsumerLayout;
