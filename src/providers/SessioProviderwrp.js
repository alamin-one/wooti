'use client'

import { SessionProvider } from 'next-auth/react';

const SessioProviderwrp = ({ children }) => {
  return <SessionProvider>{children} </SessionProvider>;
};

export default SessioProviderwrp;
