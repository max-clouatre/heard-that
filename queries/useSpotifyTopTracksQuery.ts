import { useQuery } from 'react-query';
import { fetchSpotifyTopTracks } from '../pages/api';

export function useSpotifyTopTracksQuery(accessToken) {
    return useQuery<SpotifyApi.UsersTopTracksResponse>('spotifyTopTracks', () =>
        fetchSpotifyTopTracks(accessToken)
    );
}
