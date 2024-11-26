'use client'

import React, { useEffect, useRef, useState } from 'react'
import { marked } from 'marked'
import * as Styled from './styles'

import DOMPurify from 'dompurify'

export const Markdown = ({ markdownText }: { markdownText: string }) => {
    const [htmlContent, setHtmlContent] = useState<string>('')
    const markdownRef = useRef<HTMLDivElement | null>(null)
    useEffect(() => {
        const convertMarkdownToHtml = async () => {
            const html = await marked(markdownText)
            const cleanHtml = DOMPurify.sanitize(html)
            setHtmlContent(cleanHtml)
        }

        convertMarkdownToHtml()
    }, [markdownText])

    return (
        <Styled.Wrapper>
            <Styled.Main
                dangerouslySetInnerHTML={{ __html: htmlContent }}
                ref={markdownRef}
            />
        </Styled.Wrapper>
    )
}
