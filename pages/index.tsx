import React from 'react';
import { Layout } from '../components/Layout';
import styles from '../styles/Home.module.css';
import { spotifyWebApiURL } from '../constants';
import Router from 'next/router';

export default function Home() {
    const [accessToken, setAccessToken] = React.useState('');

    React.useEffect(() => {
        const url = window.location.href;
        // does token exist
        if (url.indexOf('_token') > -1) {
            const access_token = url.split('_token=')[1].split('&')[0].trim();
            setAccessToken(access_token);
            Router.push({
                pathname: '/spotify',
                query: { access_token }
            });
        }
    }, []);

    function onClickHandler(e) {
        e.preventDefault();

        if (!accessToken) {
            // @ts-ignore
            document.location = spotifyWebApiURL;
        }
    }

    return (
        <Layout>
            <main className={styles.main}>
                <h1 className={styles.title}>Welcome to Heard That!</h1>

                {accessToken ? (
                    <p>Successfully logged in!</p>
                ) : (
                    <button onClick={onClickHandler}>Log In</button>
                )}
            </main>

            <footer className={styles.footer}>Created by Max Clouatre 2021</footer>
        </Layout>
    );
}
