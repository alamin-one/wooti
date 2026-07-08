import { LogOut, X } from 'lucide-react';
import UserAvatar from '../shared/Avatar';
import { Button } from '../ui/button';
import DashboardMenu from './DashboardMenu';
import { signOut } from 'next-auth/react';

const DashboardSidebar = ({ session, setOpen }) => {
  const user = session?.user;
  const role = session?.token?.user?.role;

  return (
    <div className="h-full flex flex-col justify-between ">
      <div className="">
        <div className="flex justify-start items-center gap-2 px-5 py-3 border-b border-gray-700">
          <UserAvatar
            className={'w-10 h-10'}
            className2={'bg-gray-800 text-white '}
          />
          <div className="">
            <p className="text-[16px] font-bold text-white"> {user?.name}</p>
            <p className="leading-[0.5em] text-xs text-gray-500">
              {' '}
              {role === 'admin' ? 'Admin' : 'Customer'}
            </p>
          </div>
          <div className="absolute top-2 right-3 w-fit h-fit  md:hidden">
            <X onClick={() => setOpen(prev => !prev)} className="text-yellow" />
          </div>
        </div>
        <DashboardMenu setOpen={setOpen} />
      </div>
      <Button
        onClick={() => signOut()}
        className={'w-full rounded-none bg-white/10 hover:bg-white/20'}
      >
        <LogOut />
        Logout
      </Button>
    </div>
  );
};

export default DashboardSidebar;
