import React, { useState, useEffect, lazy, Suspense, useMemo } from 'react';
import styles from './TestManager.module.css';
import usePersistentState from '../hooks/usePersistentState';

// Dynamically import all test components under tests/ with React.lazy
const testModules = import.meta.glob('./tests/**/*.ct.tsx');

const LazyComponents: Record<string, React.LazyExoticComponent<React.FC>> = {};
for (const path in testModules) {
    const key = path.replace(/^\.\/tests\//, '');
    LazyComponents[key] = lazy(() => testModules[path]() as Promise<{ default: React.FC }>);
}

type TreeNode = {
    name: string;
    path: string;
    children?: TreeNode[];
};

interface TreeNodeMap {
    [key: string]: {
        __path: string;
        __children: TreeNodeMap;
    };
}

function buildTree(paths: string[]): TreeNode[] {
    const root: TreeNodeMap = {};

    paths.forEach((fullPath) => {
        const parts = fullPath.replace(/^\.\/tests\//, '').split('/');
        let current = root;
        parts.forEach((part, i) => {
            if (!current[part]) {
                current[part] = { __path: parts.slice(0, i + 1).join('/'), __children: {} };
            }
            current = current[part].__children;
        });
    });

    function traverse(obj: TreeNodeMap): TreeNode[] {
        return Object.entries(obj).map(([key, val]) => {
            const node: TreeNode = { name: key, path: val.__path };
            const children = traverse(val.__children);
            if (children.length) node.children = children;
            return node;
        });
    }

    return traverse(root);
}

// 递归获取所有叶子节点（测试文件）的路径
function getAllTestPaths(nodes: TreeNode[]): string[] {
    const paths: string[] = [];
    
    function traverse(nodes: TreeNode[]) {
        nodes.forEach(node => {
            if (node.children) {
                traverse(node.children);
            } else {
                paths.push(node.path);
            }
        });
    }
    
    traverse(nodes);
    return paths;
}

export const TestManager: React.FC = () => {
    const [tree, setTree] = useState<TreeNode[]>([]);
    const [selected, setSelected] = usePersistentState<string | null>('TestManager.selected', null);
    const [openFoldersArr, setOpenFoldersArr] = usePersistentState<string[]>('TestManager.openFolders', []);
    const openFolders = useMemo(() => new Set(openFoldersArr), [openFoldersArr]);

    useEffect(() => {
        const paths = Object.keys(testModules).map(p => p.replace(/^\.\/tests\//, ''));
        const builtTree = buildTree(paths);
        setTree(builtTree);

        // 检查当前选中的文件是否存在，如果不存在则选择第一个测试文件
        const availablePaths = getAllTestPaths(builtTree);
        
        if (!selected || !availablePaths.includes(selected)) {
            if (availablePaths.length > 0) {
                setSelected(availablePaths[0]);
            }
        }
    }, [selected, setSelected]);

    const handleSelect = (path: string) => {
        setSelected(path);
    };

    const handleToggleFolder = (path: string) => {
        const isOpen = openFolders.has(path);
        if (isOpen) {
            openFolders.delete(path);
        } else {
            openFolders.add(path);
        }
        setOpenFoldersArr(Array.from(openFolders));
    };

    const renderTree = (nodes: TreeNode[], level = 0): React.ReactNode => (
        <div style={{ paddingLeft: level * 12 }}>
            {nodes.map(node =>
                node.children ? (
                    <div key={node.path}>
                        <button className={styles.folderNode} onClick={() => handleToggleFolder(node.path)}>
                            <span style={{ marginRight: 2 }}>{openFolders.has(node.path) ? '▼' : '►'}</span>
                            📁 {node.name}
                        </button>
                        {openFolders.has(node.path) && renderTree(node.children, level + 1)}
                    </div>
                ) : (
                    <button
                        key={node.path}
                        className={
                            styles.fileNode +
                            (selected === node.path ? ` ${styles.fileNodeSelected}` : '')
                        }
                        onClick={() => handleSelect(node.path)}
                    >
                        📄 {node.name}
                    </button>
                )
            )}
        </div>
    );

    return (
        <div className={styles.container}>
            <nav className={styles.nav}>{renderTree(tree)}</nav>
            <main className={styles.main}>
                {selected && LazyComponents[selected] ? (
                    <Suspense fallback={<div>Loading test...</div>}>
                        {React.createElement(LazyComponents[selected]!)}
                    </Suspense>
                ) : (
                    <p style={{ color: '#888' }}>
                        {tree.length === 0 ? 'No tests found' : 'Select a test to run'}
                    </p>
                )}
            </main>
        </div>
    );
};