import React from 'react';
import { Layout } from '../components/Layout';
import styles from '../styles/Home.module.css';
import { spotifyWebApiURL } from '../constants';
import Router from 'next/router';
import styled from 'styled-components';

const StyledMain = styled.main`
    background-image: linear-gradient(90deg, #c074b2, #8ab5e8);
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    min-height: calc(100vh - 100px);
`;

const StyledContent = styled.div`
    grid-column: 2/3;
    display: flex;
    text-align: left;
    justify-content: center;
    color: #fff;
    flex-flow: column;
    padding: 72px;
`;

const StyledButton = styled.button`
    font-size: 16px;
    line-height: 1;
    border-radius: 500px;
    padding: 19px 56px 21px;
    background-color: #1db954;
    color: #fff;
    border: none;
    transition-duration: 0.3s;
    border-width: 0;
    letter-spacing: 2px;
    min-width: 160px;
    text-transform: uppercase;
    white-space: normal;
    font-weight: 700;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    margin: 32px 0;

    &:hover {
        background-color: #1ed760;
    }
`;

const StyledFooter = styled.footer`
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #000;
    color: #fff;
`;

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
            <StyledMain>
                <StyledContent>
                    <h1 className={styles.title}>Let's get started</h1>
                    <h3>Log in to find what your friends have been listening to!</h3>
                    {accessToken ? (
                        <p>Successfully logged in!</p>
                    ) : (
                        <StyledButton onClick={onClickHandler}>Log in</StyledButton>
                    )}
                </StyledContent>
            </StyledMain>
            <StyledFooter>Created by Max Clouatre 2021</StyledFooter>
        </Layout>
    );
}
