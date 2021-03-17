import Head from 'next/head';
import styles from '../../styles/Home.module.css';
import Link from 'next/link';
import styled from 'styled-components';

const StyledHeader = styled.header`
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
                    <StyledHeader>
                        <Link href="/">
                            <a className="btn btn-success">Heard That</a>
                        </Link>
                    </StyledHeader>
                    {children}
                </>
            </>
        </div>
    );
}
