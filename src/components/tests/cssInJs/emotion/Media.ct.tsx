import facepaint from 'facepaint';

const breakpoints = [576, 768, 992, 1200];
const mq1 = breakpoints.map(
    bp => `@media (min-width: ${bp}px)`
);

const Case1: React.FC = () => {
    return (
        <div>
            <p>改变窗口大小，观察颜色变化</p>
            <div css={{
                color: 'green',
                [mq1[0]]: {
                    color: 'gray',
                },
                [mq1[1]]: {
                    color: 'hotpink',
                },
            }}>
                Some text!
            </div>
            <p css={{
                color: 'green',
                [mq1[0]]: {
                    color: 'gray',
                },
                [mq1[1]]: {
                    color: 'hotpink',
                },
            }}>
                Some other text!
            </p>
        </div>
    )
};

const mq2 = facepaint(breakpoints.map(
    bp => `@media (min-width: ${bp}px)`
));

const Case2: React.FC = () => {
    return (
        <div>
            <h2>使用 facepaint</h2>
            <p>改变窗口大小，观察颜色和字体大小变化</p>
            <div css={mq2({
                color: ['green', 'gray', 'hotpink'],
                fontSize: ['16px', '18px', '20px'],
            })}>
                Some text!
            </div>
        </div>
    )
};

const Test: React.FC = () => {
    return (
        <div>
            <Case1 />
            <Case2 />
        </div>
    )
};

export default Test;
