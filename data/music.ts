export const spotifyPlaylistUrl = process.env.NEXT_PUBLIC_SPOTIFY_PLAYLIST_URL ?? "";

export function getSpotifyEmbedUrl(url: string) {
    if (!url) return "";

    try {
        const parsedUrl = new URL(url);
        const playlistId = parsedUrl.pathname.split("/").filter(Boolean).pop();

        if (!playlistId) return "";

        return `https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator&theme=0`;
    } catch {
        return "";
    }
}
