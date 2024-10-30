'use client'

import * as Styled from './styles'

export type MenuLinkProps = {
    children: string
    href: string
    onClick: () => void
    target?: '_self' | '_blank'
}

export const MenuLink = ({
    children,
    href,
    onClick,
    target = '_self',
}: MenuLinkProps) => {
    return (
        <Styled.Wrapper href={href} target={target} onClick={onClick} > 
            {children}
        </Styled.Wrapper>
    )
}
