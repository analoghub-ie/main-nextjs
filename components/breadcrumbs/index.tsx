"use client";

import {BreadcrumbItem as NextUiBreadcrumbItem, Breadcrumbs as NextUiBreadcrumbs} from "@nextui-org/breadcrumbs";
import React, {FC} from "react";


type TParams = {
    elements: {title: string, href: string}[]
};

export const Breadcrumbs: FC<TParams> = ({elements}) => {


    return (
        <NextUiBreadcrumbs size={"lg"}>
            {elements.map((element, index) => (
                <NextUiBreadcrumbItem href={element.href} key={element.href}>{element.title}</NextUiBreadcrumbItem>
            ))}
        </NextUiBreadcrumbs>
    )
}