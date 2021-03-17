import Head from 'next/head';
import styles from '../../styles/Home.module.css';
import Link from 'next/link';

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
                </Head>
                <>
                    <div>
                        <Link href="/">
                            <a className="btn btn-success">Home</a>
                        </Link>
                    </div>
                    {children}
                </>
            </>
        </div>
    );
}
