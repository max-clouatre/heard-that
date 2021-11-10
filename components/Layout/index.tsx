import React from 'react';
import Head from 'next/head';
import styles from '../../styles/Home.module.css';
import Link from 'next/link';
import styled from 'styled-components';
import { Select } from '../Select';

const StyledActionBar = styled.header`
    position: fixed;
    background-color: rgba(0, 0, 0, 0.6);
    //background: #000;
    top: 0;
    right: 0;
    left: 0;
    min-height: 56px;
    color: #fff;
    display: flex;
    align-items: center;
    padding: 0 56px;
    z-index: 1020;

    justify-content: space-between;
`;

interface LayoutProps {
    children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
    return (
        <div className={styles.container}>
            <>
                <Head>
                    <title>Heard That</title>
                    <link rel="icon" href="/favicon.ico" />
                    <link rel="preconnect" href="https://fonts.gstatic.com"></link>
                    <link
                        href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap"
                        rel="stylesheet"></link>
                </Head>
                <>
                    <ActionBar />
                    {children}
                </>
            </>
        </div>
    );
}

export const DISPLAY_CATEGORY_OPTIONS = {
    TRACK: {
        value: '1',
        display: 'Track'
    },
    ARTIST: {
        value: '2',
        display: 'Artist'
    }
};

const displayCategoryOptions = Object.values(DISPLAY_CATEGORY_OPTIONS).map((option) => (
    <option key={option.value} value={option.value}>
        {option.display}
    </option>
));

export type DisplayCategoryOptions = keyof typeof DISPLAY_CATEGORY_OPTIONS;

export function ActionBar() {
    const [selectedListType, setSelectedListType] = React.useState(DISPLAY_CATEGORY_OPTIONS.TRACK);

    function handleListTypeChange(e: React.FormEvent<HTMLSelectElement>) {
        const foundOption = Object.values(DISPLAY_CATEGORY_OPTIONS).find(
            (option) => option.value === e.currentTarget.value
        );

        if (foundOption) {
            setSelectedListType(foundOption);
        }
    }

    return (
        <StyledActionBar>
            <Link href="/">
                <a className="btn btn-success">Heard That</a>
            </Link>
            <div>
                <Select
                    options={displayCategoryOptions}
                    value={selectedListType.value}
                    onChange={handleListTypeChange}
                />
            </div>
        </StyledActionBar>
    );
}
