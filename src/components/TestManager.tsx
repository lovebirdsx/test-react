import React, { useState, useEffect, lazy, Suspense } from 'react';
import styles from './TestManager.module.css';

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

export const TestManager: React.FC = () => {
    const [tree, setTree] = useState<TreeNode[]>([]);
    const [selected, setSelected] = useState<string | null>(null);
    const [openFolders, setOpenFolders] = useState<Set<string>>(new Set());

    useEffect(() => {
        const paths = Object.keys(testModules).map(p => p.replace(/^\.\/tests\//, ''));
        setTree(buildTree(paths));
    }, []);

    const handleSelect = (path: string) => {
        setSelected(path);
    };

    const handleToggleFolder = (path: string) => {
        setOpenFolders(prev => {
            const next = new Set(prev);
            if (next.has(path)) {
                next.delete(path);
            } else {
                next.add(path);
            }
            return next;
        });
    };

    const renderTree = (nodes: TreeNode[], level = 0): React.ReactNode => (
        <div style={{ paddingLeft: level * 12 }}>
            {nodes.map(node =>
                node.children ? (
                    <div key={node.path}>
                        <div className={styles.folderNode} onClick={() => handleToggleFolder(node.path)}>
                            <span style={{ marginRight: 2 }}>{openFolders.has(node.path) ? '▼' : '►'}</span>
                            📁 {node.name}
                        </div>
                        {openFolders.has(node.path) && renderTree(node.children, level + 1)}
                    </div>
                ) : (
                    <div
                        key={node.path}
                        className={
                            styles.fileNode +
                            (selected === node.path ? ` ${styles.fileNodeSelected}` : '')
                        }
                        onClick={() => handleSelect(node.path)}
                    >
                        📄 {node.name}
                    </div>
                )
            )}
        </div>
    );

    return (
        <div className={styles.container}>
            <nav className={styles.nav}>{renderTree(tree)}</nav>
            <main className={styles.main}>
                {selected ? (
                    <Suspense fallback={<div>Loading test...</div>}>
                        {React.createElement(LazyComponents[selected]!)}
                    </Suspense>
                ) : (
                    <p style={{ color: '#888' }}>Select a test to run</p>
                )}
            </main>
        </div>
    );
};
