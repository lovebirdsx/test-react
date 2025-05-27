import React from 'react';
import styled from '@emotion/styled';

const Title = styled.h1({
    color: '#333',
    fontSize: '1.5rem',
});

const Container = styled.div({
    padding: '2rem',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    maxWidth: '800px',
    margin: '0 auto',
});

const Button = styled.button<{
    $primary?: boolean;
    $size?: 'small' | 'medium' | 'large';
}>((props) => ({
    backgroundColor: props.$primary ? '#007bff' : '#6c757d',
    color: 'white',
    fontSize:
        props.$size === 'small'
            ? '0.8rem'
            : props.$size === 'large'
            ? '1.25rem'
            : '1rem',
    padding:
        props.$size === 'small'
            ? '0.25rem 0.5rem'
            : props.$size === 'large'
            ? '0.75rem 1.5rem'
            : '0.5rem 1rem',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    ':hover': {
        opacity: 0.9,
    },
}));

const Case1: React.FC = () => {
    return (
        <Container>
            <Title>基于 Prop 改变颜色和大小</Title>
            <Button $primary $size="large">Primary Large</Button>
            <Button $size="small">Secondary Small</Button>
        </Container>
    );
};

const StyledInput = styled.input<{ $disabled?: boolean }>((props) => ({
    padding: '0.5rem',
    border: `1px solid ${props.$disabled ? '#ccc' : '#333'}`,
    backgroundColor: props.$disabled ? '#eee' : '#fff',
    color: props.$disabled ? '#888' : '#000',
    ':focus': {
        borderColor: props.$disabled ? '#ccc' : '#007bff',
    },
}));

const Case2: React.FC = () => {
    return (
        <Container>
            <Title>条件样式</Title>
            <StyledInput $disabled placeholder="Disabled input" />
            <StyledInput placeholder="Active input" />
        </Container>
    );
};

const Card = styled.div(() => ({
    padding: '2rem',
    background: 'white',
    boxShadow: '0 0 8px rgba(0,0,0,0.1)',
    '@media (max-width: 600px)': {
        padding: '1rem',
    },
}));

const Case3: React.FC = () => {
    return (
        <Container>
            <Title>响应式样式</Title>
            <Card>
                <p>在小屏幕上，卡片的内边距会减少。</p>
            </Card>
        </Container>
    );
};

const Tag = styled.span<{ $color?: string }>((props) => ({
    display: 'inline-block',
    padding: '0.25rem 0.5rem',
    borderRadius: '12px',
    backgroundColor: props.$color || '#ddd',
    color: 'white',
    fontSize: '0.875rem',
}));

const Case4: React.FC = () => {
    return (
        <Container>
            <Title>传入颜色变量</Title>
            <Tag $color="#28a745">Success</Tag>
            <Tag $color="#dc3545">Error</Tag>
        </Container>
    );
};

const Tab = styled.div<{ $active?: boolean }>`
    padding: 1rem;
    cursor: pointer;
    border-bottom: 2px solid ${({ $active }) => ($active ? '#007bff' : 'transparent')};
    color: ${({ $active }) => ($active ? '#007bff' : '#333')};
    font-weight: ${({ $active }) => ($active ? 'bold' : 'normal')};

    &:hover {
        background-color: #f8f9fa;
    }
`;

const Case5: React.FC = () => {
    return (
        <Container>
            <Title>自定义组件状态样式</Title>
            <Tab $active>Active Tab</Tab>
            <Tab>Inactive Tab</Tab>
        </Container>
    );
};

const CssInJs: React.FC = () => {
    return (
        <div>
            <Case1 />
            <Case2 />
            <Case3 />
            <Case4 />
            <Case5 />
        </div>
    );
};

export default CssInJs;
