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

const StyledListContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 16px;
`;

const StyledCard = styled.div`
    border: 1px solid #eee;
    border-radius: 8px;
`;

const StyledUl = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
`;

const StyledTrackLi = styled.li<{ imageUrl: string }>`
    padding: 16px;
    height: 88px;
    position: relative;

    h4 {
        color: #ffffff;
        line-height: 0.9;
        text-align: center;
        font-size: 16px;
        position: relative;
        text-shadow: white 0px 0px 10px;
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
        opacity: 0.65;
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
            <div>
                <h1 className={styles.title}>Spotify Page!!</h1>
                <h2> Welcome {spotifyProfile.display_name}!</h2>
                <p> You have {spotifyPlaylist.total} playlists </p>
                <StyledListContainer>
                    <StyledCard>
                        <h3 style={{ textAlign: 'center' }}>Your top 20 tracks</h3>
                        <StyledUl>
                            {spotifyTopTracks.items?.map((track) => (
                                <StyledTrackLi key={track.id} imageUrl={track.album.images[0].url}>
                                    <h4>{track.name}</h4>
                                </StyledTrackLi>
                            ))}
                        </StyledUl>
                    </StyledCard>
                    <StyledCard>
                        <h3 style={{ textAlign: 'center' }}>Your top 20 artists</h3>
                        <StyledUl>
                            {spotifyTopArtists.items?.map((artist) => (
                                <StyledTrackLi key={artist.id} imageUrl={artist.images[0].url}>
                                    <h4>{artist.name}</h4>
                                </StyledTrackLi>
                            ))}
                        </StyledUl>
                    </StyledCard>
                </StyledListContainer>
            </div>
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
