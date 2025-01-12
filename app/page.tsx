'use client';


import { Store } from "./(routes)/(storeRoutes)/store/store";
import { useDomain } from "./context/DomainContext";

export default function App() {

  const { isMainDomain } = useDomain();

  return (
    <>
      {isMainDomain ? "Home Revendaja" : <Store />}
    </>
  );
}
