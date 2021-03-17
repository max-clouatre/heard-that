import { useQuery } from 'react-query';
import { fetchSpotifyTopArtists } from '../pages/api';

export function useSpotifyTopArtistsQuery(accessToken) {
    return useQuery<SpotifyApi.UsersTopArtistsResponse>('spotifyTopArtists', () =>
        fetchSpotifyTopArtists(accessToken)
    );
}
