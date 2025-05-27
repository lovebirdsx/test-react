import React from 'react';
import styled from 'styled-components';

const Title = styled.h1`
    color: #333;
    font-size: 1.5rem;
`;

const Container = styled.div`
    padding: 2rem;
    background-color: #f8f9fa;
    border-radius: 8px;
    max-width: 800px;
    margin: 0 auto;
`;

const Button = styled.button<{
    $primary?: boolean;
    $size?: 'small' | 'medium' | 'large';
}>`
    background-color: ${({ $primary }) => ($primary ? '#007bff' : '#6c757d')};
    color: white;
    font-size: ${({ $size }) => {
        switch ($size) {
            case 'small':
                return '0.8rem';
            case 'large':
                return '1.25rem';
            default:
                return '1rem';
        }
    }};
    padding: ${({ $size }) => {
        switch ($size) {
            case 'small':
                return '0.25rem 0.5rem';
            case 'large':
                return '0.75rem 1.5rem';
            default:
                return '0.5rem 1rem';
        }
    }};
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        opacity: 0.9;
    }
`;

const Case1: React.FC = () => {
    return (
        <Container>
            <Title>基于 Prop 改变颜色和大小</Title>
            <Button $primary $size="large">Primary Large</Button>
            <Button $size="small">Secondary Small</Button>
        </Container>
    );
};

const StyledInput = styled.input<{ $disabled?: boolean }>`
    padding: 0.5rem;
    border: 1px solid ${({ $disabled }) => ($disabled ? '#ccc' : '#333')};
    background-color: ${({ $disabled }) => ($disabled ? '#eee' : '#fff')};
    color: ${({ $disabled }) => ($disabled ? '#888' : '#000')};

    &:focus {
        border-color: ${({ $disabled }) => ($disabled ? '#ccc' : '#007bff')};
    }
`;

const Case2: React.FC = () => {
    return (
        <Container>
            <Title>条件样式</Title>
            <StyledInput $disabled placeholder="Disabled input" />
            <StyledInput placeholder="Active input" />
        </Container>
    );
};

const Card = styled.div`
    padding: 2rem;
    background: white;
    box-shadow: 0 0 8px rgba(0,0,0,0.1);

    @media (max-width: 600px) {
        padding: 1rem;
    }
`;

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

const Tag = styled.span<{ $color?: string }>`
    display: inline-block;
    padding: 0.25rem 0.5rem;
    border-radius: 12px;
    background-color: ${({ $color }) => $color || '#ddd'};
    color: white;
    font-size: 0.875rem;
`;

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
