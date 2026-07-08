import React from 'react';
import StatusBar from './StatusBar';

const AddressCard = ({
  status = '',
  name = '',
  email = '',
  phone = '',
  city = '',
  zip = '',
  country = '',
  address = '',
}) => {
  return (
    <div className="border border-gray-200 rounded-[8px] overflow-hidden ">
      <StatusBar status={status} />
      <div className="px-5 py-4 flex flex-col gap-1">
        <p className="text-sm font-medium text-deefBlack">{name}</p>
        <p className="text-xs text-grey">{email}</p>
        <p className="text-xs text-grey">{phone}</p>
        <div className="flex gap-1">
          <p className="text-xs text-grey">{city}</p>
          <p className="text-xs text-grey">{country}</p>
        </div>
        <div className="flex gap-1">
          <p className="text-xs text-grey">{address}</p>
          <p className="text-xs text-grey">{zip}</p>
        </div>
      </div>
    </div>
  );
};

export default AddressCard;
