// app/page.tsx

import {redirect, RedirectType} from "next/navigation";

export default function Home() {

    redirect(`/category`, RedirectType.replace);

}
