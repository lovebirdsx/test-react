import { css } from '@emotion/react';
import type React from 'react';

const base = css({
    color: 'hotpink',
});

const Composition: React.FC = () => {
    return (
        <div css={css([base], { backgroundColor: 'lightgray', padding: '10px', borderRadius: '8px' })}>
            <h1>Emotion Composition Example</h1>
            <p>This is a simple example of using Emotion's CSS-in-JS with composition.</p>
        </div>
    )
};

export default Composition;
