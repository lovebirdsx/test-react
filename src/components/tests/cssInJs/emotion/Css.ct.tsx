import { css } from '@emotion/react'
import type React from 'react'

const color = 'white';

const Case: React.FC = () => {
    return (
        <button
            css={css({
                padding: '32px',
                backgroundColor: 'hotpink',
                fontSize: '24px',
                borderRadius: '4px',
                '&:hover': {
                    color: color,
                },
            })}
        >
            Hover to change color.
        </button>
    )
};

export default Case;
