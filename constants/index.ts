const prod = process.env.NODE_ENV === 'development' ? false : true;
const scopes =
    'user-read-private+user-read-email+playlist-read-private+user-top-read+user-read-recently-played';
const redirectURI = process.env.SPOTIFY_REDIRECT_URI;

export const clientID = process.env.SPOTIFY_CLIENT_ID;
export const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

export const spotifyWebApiURL = `https://accounts.spotify.com/authorize/?client_id=${clientID}&response_type=token&redirect_uri=${redirectURI}&scope=${scopes}`;

export const spotifyProfileURL = 'https://api.spotify.com/v1/me?access_token=';
export const spotifyPlaylistURL = 'https://api.spotify.com/v1/me/playlists?access_token=';
export const spotifySearchURL = 'https://api.spotify.com/v1/search?q=';
export const spotifyArtistURL = 'https://api.spotify.com/v1/artists/';
export const spotifyAlbumURL = 'https://api.spotify.com/v1/albums/';
export const spotifyTopURL = 'https://api.spotify.com/v1/me/top/';
export const spotifyTopArtists = 'https://api.spotify.com/v1/me/top/artists?time_range=long_term';
export const spotifyTopTracks = 'https://api.spotify.com/v1/me/top/tracks?time_range=long_term';

export const TIME_RANGE_OPTIONS = {
    LONG_TERM: {
        value: 'long_term',
        display: 'Long Term',
        desc: 'approx all time'
    },
    MEDIUM_TERM: {
        value: 'medium_term',
        display: 'Medium Term',
        desc: 'approx last 6 months'
    },
    SHORT_TERM: {
        value: 'short_term',
        display: 'Short Term',
        desc: 'approx last 4 weeks'
    }
};

export type TypeTimeRangeOptions = keyof typeof TIME_RANGE_OPTIONS;
