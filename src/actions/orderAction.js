  'use server';

  import authOptions from '@/libs/authOptions';
  import connectdb from '@/libs/connectdb';
  import { Order } from '@/models/orderShema';
  import { getServerSession } from 'next-auth';
  import { redirect } from 'next/navigation';

  // order
  export const submitOrder = async (select, form, proderPrice, cartItems) => {
    const { token } = await getServerSession(authOptions);

    const user = token?.user;
    const userId = user?._id;
    const method = select === 'cod' ? 'COD' : 'Stripe';

    let data;
    try {
      if (method === 'COD') {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/order`, {
          method: 'POST',
          body: JSON.stringify({ method, form, proderPrice, userId }),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        data = await res.json();
        return data;
      }

      if (method === 'Stripe') {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API}/api/stripe/session`,
          {
            method: 'POST',
            body: JSON.stringify({ method, form, proderPrice, cartItems, user }),
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
        data = await res.json();
      }
    } catch (err) {
      return {
        success: false,
        message: err.message || 'Something went wrong! Please try again later. ',
      };
    }

    if (method === 'Stripe') {
      if (data.success) {
        redirect(data?.data?.url);
      }
      return data;
    }
  };

  // order
  export const getOrder = async () => {
    const { token } = await getServerSession(authOptions);
    const user = token?.user;

    try {
      await connectdb();
      const order = await Order.find({ user: user._id });

      return {
        success: true,
        message: 'Order get successfully',
        order: JSON.parse(JSON.stringify(order)),
      };
    } catch (err) {
      return {
        success: false,
        message: 'Something went wrong! Please try again later',
      };
    }
  };
  // order
  export const getAllOrder = async () => {
    try {
      await connectdb();
      const order = await Order.find();

      return {
        success: true,
        message: 'Order get successfully',
        order: JSON.parse(JSON.stringify(order)),
      };
    } catch (err) {
      return {
        success: false,
        message: 'Something went wrong! Please try again later',
      };
    }
  };
  export const getSingleOrder = async id => {
    try {
      await connectdb();
      const order = await Order.findById(id);

      return {
        success: true,
        message: 'Order get successfully',
        order: JSON.parse(JSON.stringify(order)),
      };
    } catch (err) {
      return {
        success: false,
        message: 'Something went wrong! Please try again later',
      };
    }
  };
