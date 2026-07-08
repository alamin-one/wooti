'use client';

import { MinusIcon, PlusIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';

import { useCart } from '@/contexts/CartProvider';
import { handleActionAlert } from '@/libs/handleAlert';
import { useSession } from 'next-auth/react';

const QuantityCounter = ({ cartProduct }) => {
  const { status } = useSession();
  const { increment, decrement, localCart } = useCart();

  const currentProduct = localCart?.find(
    item => item.product.toString() === cartProduct.product,
  );
  const quintiry = currentProduct?.quantity || 1;

  return (
    <ButtonGroup aria-label="Quantity" className="h-fit">
      <Button
        variant="outline"
        size="icon"
        onClick={async () => {
          if (status === 'unauthenticated') {
            handleActionAlert(false, 'Please login first');
            return;
          }
          const res = await decrement(cartProduct);
          handleActionAlert(res.success, res.message);
        }}
        className={'px-4 py-4 cursor-pointer'}
      >
        <MinusIcon />
      </Button>

      <span className="px-4 flex items-center justify-center text-sm font-medium border-y border-r border-input">
        {quintiry}
      </span>

      <Button
        variant="outline"
        size="icon"
        onClick={async () => {
          if (status === 'unauthenticated') {
            handleActionAlert(false, 'Please login first');
            return;
          }
          const res = await increment(cartProduct);
          handleActionAlert(res.success, res.message);
        }}
        className={'px-4 py-4 cursor-pointer'}
      >
        <PlusIcon />
      </Button>
    </ButtonGroup>
  );
};

export default QuantityCounter;
