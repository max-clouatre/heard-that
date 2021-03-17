import React from 'react';
import { Layout } from '../components/Layout';
import { spotifyWebApiURL } from '../constants';
import { useSpotifyProfileQuery } from '../queries/useSpotifyProfileQuery';
import styles from '../styles/Home.module.css';
import {
    fetchSpotifyPlaylist,
    fetchSpotifyProfile,
    fetchSpotifyTopArtists,
    fetchSpotifyTopTracks
} from './api';
import { QueryClient, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { useSpotifyPlaylistQuery } from '../queries/useSpotifyPlaylistQuery';
import { useSpotifyTopArtistsQuery } from '../queries/useSpotifyTopArtistsQuery';
import { useSpotifyTopTracksQuery } from '../queries/useSpotifyTopTracksQuery';
import styled from 'styled-components';

const StyledPageContainer = styled.div`
    background-image: linear-gradient(90deg, #c074b2, #8ab5e8);
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto;
    overflow: hidden;
    min-height: 100vh;

    @media (min-width: 600px) {
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-rows: 1fr;
        max-height: 100vh;
    }
`;

const StyledInfo = styled.div`
    margin-top: 88px;
    padding: 16px;
`;

const StyledListContainer = styled.div`
    display: grid;
    grid-template-rows: 1fr;
    overflow-y: auto;

    @media (min-width: 600px) {
        margin-top: 56px;
    }
`;

const StyledCard = styled.div`
    //border: 1px solid #eee;
    border-radius: 8px;
`;

const StyledUl = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
`;

const StyledLiH4Container = styled.div`
    position: relative;
    background-color: black;
    z-index: 0;
    opacity: 0.5;
    padding: 8px 16px;
    width: max-content;
`;

const StyledTrackLi = styled.li<{ imageUrl: string }>`
    padding: 16px;
    height: 96px;
    position: relative;

    h4 {
        color: #ffffff;
        line-height: 0.9;
        text-align: left;
        font-size: 16px;
        position: relative;
        z-index: 2;
        font-weight: 900;
    }

    &::before {
        content: '';
        background-image: ${(props) => `url(${props.imageUrl})`};
        background-size: cover;
        background-position-y: center;
        position: absolute;
        top: 0px;
        right: 0px;
        bottom: 0px;
        left: 0px;
        opacity: 0.75;
    }
`;

export default function Spotify(props) {
    console.log('Spotify props', props);
    const { accessToken } = props;
    const { data: spotifyProfile } = useSpotifyProfileQuery(accessToken);
    console.log('spotifyProfile', spotifyProfile);
    const { data: spotifyPlaylist } = useSpotifyPlaylistQuery(accessToken);
    console.log('spotifyPlaylist', spotifyPlaylist);
    const { data: spotifyTopArtists } = useSpotifyTopArtistsQuery(accessToken);
    console.log('spotifyTopArtists', spotifyTopArtists);
    const { data: spotifyTopTracks } = useSpotifyTopTracksQuery(accessToken);
    console.log('spotifyTopTracks', spotifyTopTracks);

    return (
        <Layout>
            <StyledPageContainer>
                <StyledInfo>
                    <h1 className={styles.title}>Spotify Page!!</h1>
                    <h2> Welcome {spotifyProfile.display_name}!</h2>
                    <p> You have {spotifyPlaylist.total} playlists </p>
                </StyledInfo>
                <StyledListContainer>
                    <StyledCard>
                        <h3 style={{ textAlign: 'center' }}>Your top 20 tracks</h3>
                        <StyledUl>
                            {spotifyTopTracks.items?.map((track) => (
                                <StyledTrackLi key={track.id} imageUrl={track.album.images[0].url}>
                                    <StyledLiH4Container>
                                        <h4>{track.name}</h4>
                                    </StyledLiH4Container>
                                </StyledTrackLi>
                            ))}
                        </StyledUl>
                    </StyledCard>
                </StyledListContainer>
                <StyledListContainer>
                    <StyledCard>
                        <h3 style={{ textAlign: 'center' }}>Your top 20 artists</h3>
                        <StyledUl>
                            {spotifyTopArtists.items?.map((artist) => (
                                <StyledTrackLi key={artist.id} imageUrl={artist.images[0].url}>
                                    <StyledLiH4Container>
                                        <h4>{artist.name}</h4>
                                    </StyledLiH4Container>
                                </StyledTrackLi>
                            ))}
                        </StyledUl>
                    </StyledCard>
                </StyledListContainer>
            </StyledPageContainer>
        </Layout>
    );
}

export async function getServerSideProps(context) {
    const { access_token } = context.query;

    const queryClient = new QueryClient();
    await queryClient.prefetchQuery('spotifyProfile', () => fetchSpotifyProfile(access_token));
    await queryClient.prefetchQuery('spotifyPlaylist', () => fetchSpotifyPlaylist(access_token));
    await queryClient.prefetchQuery('spotifyTopArtists', () =>
        fetchSpotifyTopArtists(access_token)
    );
    await queryClient.prefetchQuery('spotifyTopTracks', () => fetchSpotifyTopTracks(access_token));

    return {
        props: {
            accessToken: access_token,
            dehydratedState: dehydrate(queryClient)
        }
    };
}
