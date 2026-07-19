export const dynamic = 'force-static';
import AppBreadcrumb from '@/components/shared/AppBreadcrumb';
import { getCategory } from '@/actions/categoryAction';
import ShopClient from './shopClient';

const ShopPage = async () => {
  const { category } = await getCategory();

  return (
    <>
      <section className="bg-paleGrey pt-15">
        <div className="app-container p-5 flex flex-col justify-start items-start gap-4 ">
          <AppBreadcrumb items={[{ title: 'Shop' }]} />
        </div>
      </section>
      {/* product section*/}
      <ShopClient category={category} />
    </>
  );
};

export default ShopPage;
