import { useQuery } from 'react-query';
import { fetchSpotifyProfile } from '../pages/api';

export function useSpotifyProfileQuery(accessToken) {
    return useQuery<SpotifyApi.CurrentUsersProfileResponse>('spotifyProfile', () =>
        fetchSpotifyProfile(accessToken)
    );
}
