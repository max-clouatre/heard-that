import { useQuery } from 'react-query';
import { fetchSpotifyPlaylist } from '../pages/api';

export function useSpotifyPlaylistQuery(accessToken) {
    return useQuery<SpotifyApi.ListOfCurrentUsersPlaylistsResponse>('spotifyPlaylist', () =>
        fetchSpotifyPlaylist(accessToken)
    );
}
