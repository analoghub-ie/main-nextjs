"use client";

import {Navbar as NextUINavbar, NavbarBrand, NavbarContent, NavbarMenu, NavbarMenuToggle,} from "@nextui-org/navbar";
import {Autocomplete, AutocompleteItem, AutocompleteSection} from "@nextui-org/react";
import NextLink from "next/link";

import {ThemeSwitch} from "@/components/theme-switch";

import {SearchIcon} from "@/svg/search";
import {LogoMain} from "@/svg/logo/logoMain";
import {LogoSmall} from "@/svg/logo/logoSmall";
import {articles} from "@/articles/allArticles";
import {siteConfig} from "@/config/site";


export const Navbar = () => {
    const searchInput = (
        <Autocomplete<{articleId: string, articleTitle: string, categoryId: string, categoryTitle: string}>
            aria-label="Search"
            labelPlacement="outside"
            placeholder="Search..."
            fullWidth
            startContent={<SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />}
        >
            {articles
                .filter(e => !e.onlyDev || siteConfig.env.dev)
                .filter(e => e.articles.length)
                .sort((a, b) => a.title.localeCompare(b.title))
                .map(category => (
                    <AutocompleteSection
                        key={category.id}
                        title={category.title} // Название категории
                    >
                        {category.articles
                            .sort((a, b) => a.title.localeCompare(b.title))
                            .map(article => (
                                <AutocompleteItem key={article.id} href={`/category/${category.id}/article/${article.id}`}>
                                    {article.title}
                                </AutocompleteItem>
                            ))}
                    </AutocompleteSection>
                ))
            }
        </Autocomplete>
    );

    return (
        <NextUINavbar maxWidth="xl" position="sticky">
            <NavbarContent className="basis-1/5" justify="start">
                <NavbarBrand as="li" className="gap-3 max-w-fit">
                    <NextLink className="flex justify-start items-center gap-1" href="/">
                        <LogoMain className={'hidden sm:flex'}/>
                        <LogoSmall className={'sm:hidden'}/>
                    </NextLink>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex basis-3/5" justify="center">
                {searchInput}
            </NavbarContent>

            <NavbarContent className="basis-1/5" justify="end">
                <ThemeSwitch />
                <NavbarMenuToggle className={'sm:hidden'} />
            </NavbarContent>

            <NavbarMenu>
                {searchInput}
            </NavbarMenu>
        </NextUINavbar>
    );
};
