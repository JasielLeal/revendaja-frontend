import { useDomain } from "@/context/DomainContext"


export function Home() {

    const { storeData } = useDomain();

    return (
        <>
            <h1>Home Store {storeData?.name}</h1>
        </>
    )
}