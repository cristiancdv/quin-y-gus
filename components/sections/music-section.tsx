import { ExternalLink } from "lucide-react";
import { SectionHeading } from "@/components/common/section-heading";
import { Button } from "@/components/ui/button";
import { getSpotifyEmbedUrl, spotifyPlaylistUrl } from "@/data/music";
import { musicSectionContent } from "@/data/sections";
import { MirrorballIcon } from "@/components/icons/wedding-icons";

const musicIcons = { mirrorball: MirrorballIcon } as const;

export function MusicSection() {
    const spotifyEmbedUrl = getSpotifyEmbedUrl(spotifyPlaylistUrl);
    const MusicIcon = musicIcons[musicSectionContent.icon];
    console.log(spotifyEmbedUrl);
    return (
        <section aria-label={musicSectionContent.ariaLabel} className="bg-background px-6 py-20">
            <div className="mx-auto max-w-lg text-center">
                <span className="bg-accent text-accent-foreground mx-auto flex size-16 items-center justify-center rounded-full">
                    <MusicIcon className="size-7" />
                </span>

                <div className="mt-5">
                    <SectionHeading eyebrow={musicSectionContent.eyebrow} line1={musicSectionContent.titleLine1} line2={musicSectionContent.titleLine2} />
                    <p className="text-muted-foreground mx-auto mt-4 max-w-sm text-sm leading-relaxed text-balance">
                        {musicSectionContent.description}
                        <br />
                        {musicSectionContent.invitation}
                    </p>
                </div>

                {spotifyEmbedUrl ? (
                    <div className="mt-8">
                        <Button asChild variant="secondary">
                            <a href={spotifyPlaylistUrl} target="_blank" rel="noopener noreferrer">
                                <ExternalLink aria-hidden />
                                {musicSectionContent.addSongs}
                            </a>
                        </Button>

                        <div className="mt-4 overflow-hidden rounded-2xl bg-[#121212] shadow-xl shadow-black/10">
                            <iframe
                                data-testid="embed-iframe"
                                style={{ borderRadius: "12px" }}
                                src={spotifyEmbedUrl}
                                width="100%"
                                height="352"
                                frameBorder="0"
                                allowFullScreen
                                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                loading="lazy"
                            />
                        </div>
                    </div>
                ) : null}
            </div>
        </section>
    );
}
