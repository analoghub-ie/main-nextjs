"use client";

import {BreadcrumbItem as NextUiBreadcrumbItem, Breadcrumbs as NextUiBreadcrumbs} from "@nextui-org/breadcrumbs";
import React, {FC} from "react";

import {Skeleton} from "@nextui-org/skeleton";


type TParams = {
    elements: {title: string, href: string, isSkeleton?: boolean}[]
};

export const Breadcrumbs: FC<TParams> = ({elements}) => {


    return (
        <NextUiBreadcrumbs size={"lg"}>
            {elements.map(({isSkeleton, href, title}) => !isSkeleton ? (
                <NextUiBreadcrumbItem key={href + title} href={href}>{title}</NextUiBreadcrumbItem>
            ) : (
                <NextUiBreadcrumbItem key={href + title}><Skeleton className="h-3 w-16 rounded-lg" /></NextUiBreadcrumbItem>
            ))}
        </NextUiBreadcrumbs>
    )
}