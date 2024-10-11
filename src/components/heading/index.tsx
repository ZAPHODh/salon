import * as Styled from './styles'
type HeadingType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
export type HeadingProps = {
    children: React.ReactNode | string
    as?: HeadingType
    padding?: string
}

export const Heading = ({ children, as = 'h1', padding }: HeadingProps) => {
    return (
        <Styled.Title as={as} $padding={padding}>
            {children}
        </Styled.Title>
    )
}
