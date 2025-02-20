'use client';

import { Site } from "./(routes)/(Site)/site";
import { Store } from "./(routes)/(storeRoutes)/store/store";
import { useDomain } from "./context/DomainContext";

export default function App() {

  const { isMainDomain } = useDomain();

  return (
    <>
      {isMainDomain ? <Site /> : <Store />}
    </>
  );
}
