'use client'

import { MenuLink } from '../MenuLink'
import * as Styled from './styles'

import { signIn, signOut } from 'next-auth/react'

import { useEffect, useState } from 'react'
import { Menu as MenuIcon } from '@styled-icons/evaicons-solid/Menu'
import { Close } from '@styled-icons/evaicons-solid/Close'
import { Button } from '../ExpenseForm/styles'
import { Heading } from '../Heading'
export type menuLink = {
    name: string
    to: string
    target?: '_self' | '_blank'
}
export type MenuProps = {
    menuLink?: menuLink[]
    isLogged: boolean
    logo: string
}

export const Menu = ({ menuLink = [], isLogged, logo }: MenuProps) => {
    const [openMenu, setOpenMenu] = useState(false)
    const [isFixed, setIsFixed] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY
            if (scrollPosition > 0) {
                setIsFixed(true)
            } else {
                setIsFixed(false)
            }
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const handleClickMenuIcon = () => {
        setOpenMenu((opened) => !opened)
    }
    const handleClickMenuLink = () => {
        setOpenMenu(false)
    }
    const handleCloseMenuNav = () => {
        setOpenMenu(false)
    }

    return (
        <Styled.Wrapper $isFixed={isFixed}>
            <Heading as="h1">{logo}</Heading>
            <Styled.ContainerSmallWindow>
                {isLogged ? (
                    <>
                        <Button
                            onClick={() => {
                                signOut()
                            }}
                        >
                            Deslogar
                        </Button>
                    </>
                ) : (
                    <Button
                        onClick={() => {
                            signIn()
                        }}
                    >
                        Logar
                    </Button>
                )}

                <Styled.Hamburguer onClick={handleClickMenuIcon}>
                    <MenuIcon fontSize="inherit" />
                </Styled.Hamburguer>

                <Styled.MenuNav $clicked={openMenu}>
                    <Styled.CloseMenuSmallWindow onClick={handleCloseMenuNav}>
                        <Close fontSize="inherit" />
                    </Styled.CloseMenuSmallWindow>
                    {menuLink &&
                        menuLink.map((link, index) => (
                            <MenuLink
                                href={link.to}
                                key={index}
                                onClick={handleClickMenuLink}
                                target={link.target && link.target}
                            >
                                {link.name}
                            </MenuLink>
                        ))}
                </Styled.MenuNav>
            </Styled.ContainerSmallWindow>
        </Styled.Wrapper>
    )
}
