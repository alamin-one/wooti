'use client';

import { useState } from 'react';
import { Switch } from '../ui/switch';

const Notification = () => {
  const [orderUpdates, setOrderUpdates] = useState(true);
  const [promotions, setPromotions] = useState(false);
  return (
    <div className="bg-whiteCustom border border-gray-200 rounded-xl p-5">
      <p className="text-sm font-semibold text-deefBlack mb-4">Notifications</p>

      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-deefBlack">Order updates</p>
            <p className="text-xs">Email when order status changes</p>
          </div>
          <Switch checked={orderUpdates} onCheckedChange={setOrderUpdates} />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-deefBlack">Promotions</p>
            <p className="text-xs">Deals and discount alerts</p>
          </div>
          <Switch checked={promotions} onCheckedChange={setPromotions} />
        </div>
      </div>
    </div>
  );
};

export default Notification;
