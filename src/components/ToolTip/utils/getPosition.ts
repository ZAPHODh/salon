import { css } from 'styled-components'

export const getPosition = (position: 'top' | 'right' | 'bottom' | 'left') => {
    switch (position) {
        case 'top':
            return css`
                bottom: 100%;
                left: 50%;
                transform: translateX(-50%);
                margin-bottom: 8px;

                &::after {
                    content: '';
                    position: absolute;
                    top: 100%;
                    left: 50%;
                    transform: translateX(-50%);
                    border-width: 5px;
                    border-style: solid;
                    border-color: #333 transparent transparent transparent;
                }
            `
        case 'right':
            return css`
                top: 50%;
                left: 100%;
                transform: translateY(-50%);
                margin-left: 8px;

                &::after {
                    content: '';
                    position: absolute;
                    top: 50%;
                    left: -5px;
                    transform: translateY(-50%);
                    border-width: 5px;
                    border-style: solid;
                    border-color: transparent #333 transparent transparent;
                }
            `
        case 'bottom':
            return css`
                top: 100%;
                left: 50%;
                transform: translateX(-50%);
                margin-top: 8px;

                &::after {
                    content: '';
                    position: absolute;
                    bottom: 100%;
                    left: 50%;
                    transform: translateX(-50%);
                    border-width: 5px;
                    border-style: solid;
                    border-color: transparent transparent #333 transparent;
                }
            `
        case 'left':
            return css`
                top: 50%;
                right: 100%;
                transform: translateY(-50%);
                margin-right: 8px;

                &::after {
                    content: '';
                    position: absolute;
                    top: 50%;
                    right: -5px;
                    transform: translateY(-50%);
                    border-width: 5px;
                    border-style: solid;
                    border-color: transparent transparent transparent #333;
                }
            `
        default:
            return ''
    }
}
