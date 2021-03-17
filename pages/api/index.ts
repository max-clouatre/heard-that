import {
    spotifyPlaylistURL,
    spotifyProfileURL,
    spotifyTopArtists,
    spotifyTopTracks,
    spotifyWebApiURL
} from '../../constants';

export async function fetchSpotifyAuth() {
    const res = await fetch(spotifyWebApiURL, { mode: 'no-cors' });
    return res.json();
}

export async function fetchSpotifyProfile(accessToken) {
    if (!accessToken) return '';
    const res = await fetch(spotifyProfileURL + accessToken, { mode: 'no-cors' });
    return res.json();
}

export async function fetchSpotifyPlaylist(accessToken) {
    if (!accessToken) return '';
    const res = await fetch(spotifyPlaylistURL + accessToken, { mode: 'no-cors' });
    return res.json();
}

export async function fetchSpotifyTopArtists(accessToken, userId?: string) {
    if (!accessToken) return '';
    const res = await fetch(spotifyTopArtists, {
        mode: 'no-cors',
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + accessToken
        }
    });
    return res.json();
}

export async function fetchSpotifyTopTracks(accessToken, userId?: string) {
    if (!accessToken) return '';
    const res = await fetch(spotifyTopTracks, {
        mode: 'no-cors',
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + accessToken
        }
    });
    return res.json();
}
