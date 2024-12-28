import {redirect, RedirectType} from "next/navigation";


export default async function Page({params}: {
    params: Promise<{ categoryId: string }>;
}) {
    const { categoryId } = await params;

    redirect(`/category/${categoryId}`, RedirectType.replace);

    // return (
    //     <div className="flex flex-col gap-4 overflow-auto">
    //
    //     </div>
    // );
}