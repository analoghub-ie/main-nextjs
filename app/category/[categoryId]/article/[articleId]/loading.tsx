import {Breadcrumbs} from "@/components/breadcrumbs";
import {Skeleton} from "@nextui-org/skeleton";

export default async function Loading() {
    return (
        <div className="flex flex-col gap-4 overflow-auto">
            <Breadcrumbs
                elements={[
                    { title: 'Home', href: '/' },
                    { title: 'sk1', href: '', isSkeleton: true },
                    { title: 'sk2', href: '', isSkeleton: true },
                ]}
            />

            <div className="flex flex-col gap-2">
                {/* Skeleton for markdown paragraph */}
                <Skeleton className="h-6 w-full"/>
                <Skeleton className="h-4 w-5/6"/>
                <Skeleton className="h-4 w-4/6"/>
                <br/>
                <Skeleton className="h-4 w-3/4"/>
                <br/>
                <Skeleton className="rounded-lg" style={{marginInline: 'auto', width: 'min(50rem, 80%)'}}>
                    <div className="h-48 rounded-lg bg-default-300"/>
                </Skeleton>
                <br/>
                <Skeleton className="h-4 w-2/3"/>
                <Skeleton className="h-5 w-2/2"/>
                <br/>
                <br/>
                <Skeleton className="h-4 w-2/3"/>
                <Skeleton className="h-5 w-1/3"/>
                <Skeleton className="h-5 w-1/3"/>

            </div>
        </div>
    );
}
