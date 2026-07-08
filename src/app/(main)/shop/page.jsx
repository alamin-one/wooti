import AppBreadcrumb from '@/components/shared/AppBreadcrumb';
import AppPagination from '@/components/shared/Pagination';
import PriceRange from '@/app/(main)/shop/PriceRange';
import ProductCard from '@/components/shared/ProductCard';
import RadioFilter from '@/app/(main)/shop/RadioFilter';
import React from 'react';
import { getProducts } from '@/actions/productAcction';
import { getCategory } from '@/actions/categoryAction';

const ShopPage = async ({ searchParams }) => {
  const params = await searchParams;
  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(
      ([_, value]) =>
        value !== undefined && value !== ' ' && value !== '' && value !== null,
    ),
  );
  const { product, totalPage } = await getProducts(filteredParams);
  const { category } = await getCategory();

  return (
    <>
      <section className="bg-paleGrey pt-15">
        <div className="app-container p-5 flex flex-col justify-start items-start gap-4 ">
          <AppBreadcrumb items={[{ title: 'Shop' }]} />
        </div>
      </section>
      {/* product section*/}
      <section>
        <div className="app-container flex flex-col md:flex-row gap-8">
          {/*  Finlter */}
          <div className="md:-[20%]">
            {/* Category */}
            <div className="">
              

              <RadioFilter className="mt-5" category={category} />

            </div>
            {/* PriceRange */}
            <div className="mt-10">
    

              <PriceRange className="mt-5" />
            </div>
          </div>
          {/* Products */}
          <div className=" ">
            <div className="grid grid-cols-2 sm:grid-cols-3  md:grid-cols-3 lg:grid-cols-4 gap-5">
              {product?.map((item, index) => (
                <ProductCard product={item} key={index} />
              ))}
            </div>
          </div>
        </div>
        <div className="app-container">
          <AppPagination totalPage={totalPage} />
        </div>
      </section>
    </>
  );
};

export default ShopPage;
