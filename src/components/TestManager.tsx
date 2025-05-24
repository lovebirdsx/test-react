/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState, useEffect } from 'react';
import styles from './TestManager.module.css';

// Dynamically import all files ending with .ct.tsx under tests/
const testModules = import.meta.glob('./tests/**/*.ct.tsx');

type TreeNode = {
    name: string;
    path: string;
    children?: TreeNode[];
};

function buildTree(paths: string[]): TreeNode[] {
    const root: Record<string, any> = {};

    paths.forEach((fullPath) => {
        // e.g. '../tests/foo/bar.ct.tsx'
        const parts = fullPath
            .replace(/^\.\/tests\//, '')
            .split('/');
        let current = root;
        parts.forEach((part, i) => {
            if (!current[part]) {
                current[part] = { __path: parts.slice(0, i + 1).join('/'), __children: {} };
            }
            current = current[part].__children;
        });
    });

    function traverse(obj: any): TreeNode[] {
        return Object.entries(obj).map(([key, val]: any) => {
            const node: TreeNode = {
                name: key,
                path: (val.__path as string),
            };
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
    const [Component, setComponent] = useState<React.FC | null>(null);
    const [openFolders, setOpenFolders] = useState<Set<string>>(new Set());

    useEffect(() => {
        const paths = Object.keys(testModules),
            treeData = buildTree(paths);
        setTree(treeData);
    }, []);

    useEffect(() => {
        if (selected) {
            const loader = testModules[`./tests/${selected}` as keyof typeof testModules];
            loader().then((mod: any) => {
                setComponent(() => mod.default);
            });
        }
    }, [selected]);

    const handleSelect = (path: string) => {
        setSelected(path);
    };

    const handleToggleFolder = (path: string) => {
        setOpenFolders((prev) => {
            const next = new Set(prev);
            if (next.has(path)) {
                next.delete(path);
            } else {
                next.add(path);
            }
            return next;
        });
    };

    const folderIcon = (
        <span style={{ marginRight: 4 }}>📁</span>
    );
    const fileIcon = (
        <span style={{ marginRight: 4 }}>📄</span>
    );

    const FileNode: React.FC<{ node: TreeNode; isSelected: boolean; onSelect: (path: string) => void }> = ({ node, isSelected, onSelect }) => {
        const [hover, setHover] = useState(false);
        let classNames = styles.fileNode;
        if (isSelected) classNames += ` ${styles.fileNodeSelected}`;
        else if (hover) classNames += ` ${styles.fileNodeHover}`;

        return (
            <div
                className={classNames}
                onClick={() => onSelect(node.path)}
                onMouseOver={() => setHover(true)}
                onMouseOut={() => setHover(false)}
            >
                {fileIcon}
                {node.name}
            </div>
        );
    };

    const FolderNode: React.FC<{
        node: TreeNode;
        level: number;
        renderTree: (nodes: TreeNode[], level: number) => React.ReactNode;
        openFolders: Set<string>;
        onToggle: (path: string) => void;
    }> = ({ node, level, renderTree, openFolders, onToggle }) => {
        const open = openFolders.has(node.path);
        return (
            <div>
                <div
                    className={styles.folderNode}
                    onClick={() => onToggle(node.path)}
                >
                    <span style={{ marginRight: 2, width: '1em', textAlign: 'center' }}>
                        {open ? '▼' : '►'}
                    </span>
                    {folderIcon}
                    {node.name}
                </div>
                {open && (
                    <div className={styles.folderChildren}>
                        {renderTree(node.children || [], level + 1)}
                    </div>
                )}
            </div>
        );
    };

    const renderTree = (nodes: TreeNode[], level = 0): React.ReactNode => (
        <div style={{ paddingLeft: level === 0 ? 0 : 0 }}>
            {nodes.map((node) =>
                node.children ? (
                    <FolderNode
                        key={node.path}
                        node={node}
                        level={level}
                        renderTree={renderTree}
                        openFolders={openFolders}
                        onToggle={handleToggleFolder}
                    />
                ) : (
                    <FileNode key={node.path} node={node} isSelected={selected === node.path} onSelect={handleSelect} />
                )
            )}
        </div>
    );

    return (
        <div className={styles.container}>
            <nav className={styles.nav}>
                {renderTree(tree)}
            </nav>
            <main className={styles.main}>
                {Component ? <Component /> : <p style={{ color: '#888' }}>Select a test to run</p>}
            </main>
        </div>
    );
};
