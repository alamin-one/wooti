const useOrderCalculate = localCart => {
  const totalPrice = localCart?.reduce((acc, curr) => {
    return acc + curr.price * curr.quantity;
  }, 0);

  const totalDiscountPrice = localCart?.reduce((acc, curr) => {
    return acc + curr.discountPrice * curr.quantity;
  }, 0);

  const proderPrice = {
    itemsPrice: totalPrice,
    discountPrice: totalPrice - totalDiscountPrice,
    totalPrice: totalDiscountPrice,
  };

  return proderPrice;
};

export default useOrderCalculate;
