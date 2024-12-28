import {redirect, RedirectType} from "next/navigation";


export default async function Page() {

    redirect(`/`, RedirectType.replace);

    // return (
    //     <div className="flex flex-col gap-4 overflow-auto">
    //
    //     </div>
    // );
}