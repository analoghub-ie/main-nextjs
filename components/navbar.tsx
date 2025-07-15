"use client";

import {Navbar as NextUINavbar, NavbarBrand, NavbarContent, NavbarMenu, NavbarMenuToggle} from "@heroui/navbar";
import {Autocomplete, AutocompleteItem, AutocompleteSection, Link} from "@heroui/react";
import NextLink from "next/link";

import {ThemeSwitch} from "@/components/theme-switch";

import {SearchIcon} from "@/svg/search";
import {LogoMain} from "@/svg/logo/logoMain";
import {LogoSmall} from "@/svg/logo/logoSmall";
import {allFilteredArticles} from "@/articles/allArticles";
import {useState} from "react";
import {IoBeer} from "react-icons/io5";


export const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const closeMenu = () => setMenuOpen(false);
    const toggleMenu = () => setMenuOpen((prev) => !prev);

    const searchInput = (
        <Autocomplete<{articleId: string, articleTitle: string, categoryId: string, categoryTitle: string}>
            aria-label="Search"
            labelPlacement="outside"
            placeholder="Search..."
            fullWidth
            startContent={<SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />}
        >
            {allFilteredArticles
                .map(category => (
                    <AutocompleteSection
                        key={category.id}
                        title={category.title} // Название категории
                    >
                        {category.articles
                            .sort((a, b) => a.title.localeCompare(b.title))
                            .map(article => (
                                <AutocompleteItem key={article.id}
                                                  href={`/category/${category.id}/article/${article.id}`}
                                                  onPress={closeMenu}
                                >
                                    {article.title}
                                </AutocompleteItem>
                            ))}
                    </AutocompleteSection>
                ))
            }
        </Autocomplete>
    );

    return (
        <NextUINavbar maxWidth="xl" position="sticky" isMenuOpen={menuOpen} onMenuOpenChange={setMenuOpen}>
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

                <Link href="https://buymeacoffee.com/analoghub"
                      className="flex items-center gap-2"
                      target="_blank"
                      style={{justifyContent: 'center'}}
                >
                    <IoBeer size={24} className="text-text"/>
                    <span className={'hidden xl:block'}>Buy me a beer</span>
                </Link>

                <NavbarMenuToggle className={'sm:hidden'}
                                  onClick={toggleMenu}
                                  isSelected={menuOpen}
                />
            </NavbarContent>

            <NavbarMenu className={'overflow-x-hidden'}>
                {searchInput}
            </NavbarMenu>
        </NextUINavbar>
    );
};
