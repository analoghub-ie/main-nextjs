'use client';

import {ReactNode} from 'react';
import {usePathname} from 'next/navigation';
import clsx from 'clsx';
import {MainCategories} from '@/components/mainCategories';

export default function CategoryLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname();

    const isArticle = /^\/category\/[^/]+\/article\//.test(pathname);
    const isSplit   = !isArticle && /^\/category\/[^/]+\/?$/.test(pathname);

    if (isArticle) return <>{children}</>;

    return (
        <div className={clsx(
            "flex h-full overflow-hidden",
            isSplit ? 'gap-1' : 'gap-0',
        )}>
            {/* left – categories (pure HTML from SSG) */}
            <div
                className={clsx(
                    'p-1',
                    'min-w-[320px] transition-[flex-basis] duration-300',
                    isSplit ? 'basis-1/2' : 'basis-full'
                )}
            >
                <MainCategories small />
            </div>

            <div
                className={clsx(
                    'transition-[flex-basis,opacity,transform] duration-300 ease-out',
                    '',
                    isSplit
                        ? 'basis-1/2 opacity-100 translate-x-0'
                        : 'basis-0  opacity-0  translate-x-full pointer-events-none'
                )}
            >
                <div className={clsx(
                    isSplit
                        ? 'p-1'
                        : 'p-0'
                )}>{children}</div>
            </div>
        </div>
    );
}
