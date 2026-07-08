import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
 
const SuccessPage = () => {
  return (
    <>
      <section className="min-h-[80vh] flex items-center justify-center">
        <div className="w-full max-w-md border border-gray-200 rounded-xl overflow-hidden">
          <div className="bg-green-50 p-8 flex flex-col items-center gap-3">
            <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center">
              <CheckCircle size={28} className="text-white" />
            </div>
            <h5>Order Confirmed!</h5>
          </div>

          <div className="p-5 flex gap-3">
            <Button asChild variant="outline" className="flex-1 ">
              <Link href="/dashboard">Go To Dashboard</Link>
            </Button>
            <Button asChild className="flex-1 bg-yellow">
              <Link href="/dashboard/orders">View Order</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default SuccessPage;
