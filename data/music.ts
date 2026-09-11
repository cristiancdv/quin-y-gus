export const spotifyPlaylistUrl = process.env.NEXT_PUBLIC_SPOTIFY_PLAYLIST_URL ?? "";

export function getSpotifyEmbedUrl(url: string) {
    if (!url) return "";

    try {
        const parsedUrl = new URL(url);
        const segments = parsedUrl.pathname.split("/").filter(Boolean);

        // Buscamos si el link es de una playlist
        const playlistIndex = segments.indexOf("playlist");
        if (playlistIndex !== -1 && segments[playlistIndex + 1]) {
            const playlistId = segments[playlistIndex + 1];
            return `https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator&theme=0`;
        }

        return "";
    } catch {
        return "";
    }
}
