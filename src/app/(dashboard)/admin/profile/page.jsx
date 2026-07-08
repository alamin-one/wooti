import AppBreadcrumb from '@/components/shared/AppBreadcrumb';
import Profilecard from '@/components/shared/Profilecard';

const AdminProfilePage = () => {
  return (
    <>
      <div className="mb-5 ">
        <AppBreadcrumb
          items={[
            { title: 'Dashboard', href: '/dashboard/' },
            { title: 'Profile' },
          ]}
        />
      </div>
      <Profilecard />
    </>
  );
};

export default AdminProfilePage;
