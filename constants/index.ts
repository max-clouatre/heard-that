const prod = false;

const scopes =
    'user-read-private+user-read-email+playlist-read-private+user-top-read+user-read-recently-played';
const redirectURI = prod ? 'https://heard-that.vercel.app' : 'http://localhost:3000';

export const clientID = '7c2f0dfd36b24415af89e1c2e05f89aa';
export const clientSecret = '6f838f3c07d0430db383a1364cb599d4';

export const spotifyWebApiURL = `https://accounts.spotify.com/authorize/?client_id=${clientID}&response_type=token&redirect_uri=${redirectURI}&scope=${scopes}`;

export const spotifyProfileURL = 'https://api.spotify.com/v1/me?access_token=';
export const spotifyPlaylistURL = 'https://api.spotify.com/v1/me/playlists?access_token=';
export const spotifySearchURL = 'https://api.spotify.com/v1/search?q=';
export const spotifyArtistURL = 'https://api.spotify.com/v1/artists/';
export const spotifyAlbumURL = 'https://api.spotify.com/v1/albums/';
export const spotifyTopURL = 'https://api.spotify.com/v1/me/top/';
export const spotifyTopArtists = 'https://api.spotify.com/v1/me/top/artists?time_range=long_term';
export const spotifyTopTracks = 'https://api.spotify.com/v1/me/top/tracks?time_range=long_term';
