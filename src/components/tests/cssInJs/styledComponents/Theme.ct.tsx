import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';

// 定义主题类型
interface ThemeType {
    colors: {
        primary: string;
        secondary: string;
        background: string;
        text: string;
        border: string;
        success: string;
        error: string;
        warning: string;
    };
    fonts: {
        main: string;
        code: string;
        sizes: {
            small: string;
            medium: string;
            large: string;
            xlarge: string;
        };
    };
    spacing: {
        xs: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
    };
    borderRadius: {
        small: string;
        medium: string;
        large: string;
    };
    shadows: {
        small: string;
        medium: string;
        large: string;
    };
}

// 浅色主题
const lightTheme: ThemeType = {
    colors: {
        primary: '#007bff',
        secondary: '#6c757d',
        background: '#ffffff',
        text: '#333333',
        border: '#dee2e6',
        success: '#28a745',
        error: '#dc3545',
        warning: '#ffc107',
    },
    fonts: {
        main: 'Arial, sans-serif',
        code: 'Monaco, monospace',
        sizes: {
            small: '0.875rem',
            medium: '1rem',
            large: '1.25rem',
            xlarge: '1.5rem',
        },
    },
    spacing: {
        xs: '0.25rem',
        sm: '0.5rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '2rem',
    },
    borderRadius: {
        small: '4px',
        medium: '8px',
        large: '12px',
    },
    shadows: {
        small: '0 1px 3px rgba(0,0,0,0.1)',
        medium: '0 4px 6px rgba(0,0,0,0.1)',
        large: '0 10px 25px rgba(0,0,0,0.15)',
    },
};

// 深色主题
const darkTheme: ThemeType = {
    colors: {
        primary: '#0d6efd',
        secondary: '#6c757d',
        background: '#212529',
        text: '#ffffff',
        border: '#495057',
        success: '#198754',
        error: '#dc3545',
        warning: '#ffc107',
    },
    fonts: {
        main: 'Arial, sans-serif',
        code: 'Monaco, monospace',
        sizes: {
            small: '0.875rem',
            medium: '1rem',
            large: '1.25rem',
            xlarge: '1.5rem',
        },
    },
    spacing: {
        xs: '0.25rem',
        sm: '0.5rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '2rem',
    },
    borderRadius: {
        small: '4px',
        medium: '8px',
        large: '12px',
    },
    shadows: {
        small: '0 1px 3px rgba(0,0,0,0.3)',
        medium: '0 4px 6px rgba(0,0,0,0.3)',
        large: '0 10px 25px rgba(0,0,0,0.4)',
    },
};

// 扩展 DefaultTheme
declare module 'styled-components' {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface DefaultTheme extends ThemeType {}
}

// 通用容器
const Container = styled.div`
    padding: ${props => props.theme.spacing.xl};
    background-color: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
    border-radius: ${props => props.theme.borderRadius.medium};
    margin-bottom: ${props => props.theme.spacing.lg};
    border: 1px solid ${props => props.theme.colors.border};
    transition: all 0.3s ease;
`;

const Title = styled.h2`
    color: ${props => props.theme.colors.primary};
    font-size: ${props => props.theme.fonts.sizes.xlarge};
    font-family: ${props => props.theme.fonts.main};
    margin-bottom: ${props => props.theme.spacing.lg};
`;

// Case1: 基本主题使用
const ThemeButton = styled.button<{ $variant?: 'primary' | 'secondary' | 'success' | 'error' }>`
    background-color: ${props => {
        switch (props.$variant) {
            case 'primary':
                return props.theme.colors.primary;
            case 'secondary':
                return props.theme.colors.secondary;
            case 'success':
                return props.theme.colors.success;
            case 'error':
                return props.theme.colors.error;
            default:
                return props.theme.colors.primary;
        }
    }};
    color: white;
    border: none;
    border-radius: ${props => props.theme.borderRadius.small};
    padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
    margin: ${props => props.theme.spacing.xs};
    font-size: ${props => props.theme.fonts.sizes.medium};
    cursor: pointer;
    box-shadow: ${props => props.theme.shadows.small};
    transition: all 0.2s ease;

    &:hover {
        transform: translateY(-1px);
        box-shadow: ${props => props.theme.shadows.medium};
    }
`;

const Case1: React.FC = () => {
    return (
        <Container>
            <Title>基本主题颜色使用</Title>
            <ThemeButton $variant="primary">Primary Button</ThemeButton>
            <ThemeButton $variant="secondary">Secondary Button</ThemeButton>
            <ThemeButton $variant="success">Success Button</ThemeButton>
            <ThemeButton $variant="error">Error Button</ThemeButton>
        </Container>
    );
};

// Case2: 主题间距和字体
const SpacingCard = styled.div`
    background-color: ${props => props.theme.colors.background};
    border: 1px solid ${props => props.theme.colors.border};
    border-radius: ${props => props.theme.borderRadius.large};
    padding: ${props => props.theme.spacing.lg};
    margin: ${props => props.theme.spacing.md} 0;
    box-shadow: ${props => props.theme.shadows.medium};
`;

const CodeBlock = styled.pre`
    background-color: ${props => props.theme.colors.border};
    color: ${props => props.theme.colors.text};
    font-family: ${props => props.theme.fonts.code};
    font-size: ${props => props.theme.fonts.sizes.small};
    padding: ${props => props.theme.spacing.md};
    border-radius: ${props => props.theme.borderRadius.small};
    overflow-x: auto;
    margin: ${props => props.theme.spacing.sm} 0;
`;

const Case2: React.FC = () => {
    return (
        <Container>
            <Title>主题间距和字体</Title>
            <SpacingCard>
                <h3 style={{ margin: '0 0 1rem 0' }}>卡片标题</h3>
                <p>这个卡片使用了主题中定义的间距和边框半径。</p>
                <CodeBlock>{`font-family: ${lightTheme.fonts.code}`}</CodeBlock>
            </SpacingCard>
        </Container>
    );
};

// Case3: 主题阴影效果
const ShadowBox = styled.div<{ $shadowLevel?: 'small' | 'medium' | 'large' }>`
    width: 200px;
    height: 100px;
    background-color: ${props => props.theme.colors.background};
    border: 1px solid ${props => props.theme.colors.border};
    border-radius: ${props => props.theme.borderRadius.medium};
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin: ${props => props.theme.spacing.md};
    box-shadow: ${props => {
        switch (props.$shadowLevel) {
            case 'small':
                return props.theme.shadows.small;
            case 'medium':
                return props.theme.shadows.medium;
            case 'large':
                return props.theme.shadows.large;
            default:
                return props.theme.shadows.small;
        }
    }};
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-2px);
    }
`;

const Case3: React.FC = () => {
    return (
        <Container>
            <Title>主题阴影效果</Title>
            <div>
                <ShadowBox $shadowLevel="small">Small Shadow</ShadowBox>
                <ShadowBox $shadowLevel="medium">Medium Shadow</ShadowBox>
                <ShadowBox $shadowLevel="large">Large Shadow</ShadowBox>
            </div>
        </Container>
    );
};

// Case4: 主题切换按钮
const ThemeToggleButton = styled.button`
    background-color: ${props => props.theme.colors.primary};
    color: white;
    border: none;
    border-radius: ${props => props.theme.borderRadius.medium};
    padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
    font-size: ${props => props.theme.fonts.sizes.medium};
    cursor: pointer;
    box-shadow: ${props => props.theme.shadows.small};
    transition: all 0.3s ease;

    &:hover {
        opacity: 0.9;
        transform: scale(1.05);
    }
`;

interface Case4Props {
    isDark: boolean;
    toggleTheme: () => void;
}

const Case4: React.FC<Case4Props> = ({ isDark, toggleTheme }) => {
    return (
        <Container>
            <Title>主题切换</Title>
            <p>当前主题: {isDark ? '深色模式' : '浅色模式'}</p>
            <ThemeToggleButton onClick={toggleTheme}>
                切换到 {isDark ? '浅色' : '深色'} 主题
            </ThemeToggleButton>
        </Container>
    );
};

// Case5: 复杂的主题应用
const StatusBadge = styled.span<{ $status: 'success' | 'error' | 'warning' }>`
    display: inline-block;
    padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
    border-radius: ${props => props.theme.borderRadius.large};
    font-size: ${props => props.theme.fonts.sizes.small};
    font-weight: bold;
    color: white;
    background-color: ${props => {
        switch (props.$status) {
            case 'success':
                return props.theme.colors.success;
            case 'error':
                return props.theme.colors.error;
            case 'warning':
                return props.theme.colors.warning;
            default:
                return props.theme.colors.secondary;
        }
    }};
    margin: ${props => props.theme.spacing.xs};
`;

const ProgressBar = styled.div<{ $progress: number }>`
    width: 100%;
    height: 20px;
    background-color: ${props => props.theme.colors.border};
    border-radius: ${props => props.theme.borderRadius.large};
    overflow: hidden;
    margin: ${props => props.theme.spacing.md} 0;

    &::after {
        content: '';
        display: block;
        width: ${props => props.$progress}%;
        height: 100%;
        background-color: ${props => props.theme.colors.success};
        transition: width 0.3s ease;
    }
`;

const Case5: React.FC = () => {
    return (
        <Container>
            <Title>复杂主题应用</Title>
            <div>
                <h4>状态徽章:</h4>
                <StatusBadge $status="success">成功</StatusBadge>
                <StatusBadge $status="error">错误</StatusBadge>
                <StatusBadge $status="warning">警告</StatusBadge>
            </div>
            <div>
                <h4>进度条:</h4>
                <ProgressBar $progress={75} />
                <small>进度: 75%</small>
            </div>
        </Container>
    );
};

// 主组件
const ThemeTest: React.FC = () => {
    const [isDarkTheme, setIsDarkTheme] = useState(false);

    const toggleTheme = () => {
        setIsDarkTheme(!isDarkTheme);
    };

    const currentTheme = isDarkTheme ? darkTheme : lightTheme;

    return (
        <ThemeProvider theme={currentTheme}>
            <div style={{ 
                minHeight: '100vh', 
                backgroundColor: currentTheme.colors.background,
                padding: '20px',
                transition: 'background-color 0.3s ease'
            }}>
                <Case1 />
                <Case2 />
                <Case3 />
                <Case4 isDark={isDarkTheme} toggleTheme={toggleTheme} />
                <Case5 />
            </div>
        </ThemeProvider>
    );
};

export default ThemeTest;