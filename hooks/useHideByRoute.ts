import { usePathname, useRouter } from 'next/navigation';

function useHideByRoute(routesArray: string[]): boolean {
    const router = useRouter();
    const pathname = usePathname();

    return routesArray.some((route) => route === pathname);
}

export default useHideByRoute;
