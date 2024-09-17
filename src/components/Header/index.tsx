'use client'

import * as Styled from './styles'

export type HeaderProps = {
    name: string
}

export const Header = ({ name }: HeaderProps) => {
    return <Styled.Wrapper>{name}</Styled.Wrapper>
}
