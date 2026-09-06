import Image from "next/image";

type WeddingIconProps = {
    className?: string;
    size?: number;
    alt?: string;
    style?: React.CSSProperties;
};

function WeddingIcon({
    name,
    className,
    size = 40,
    alt = "",
    style,
}: WeddingIconProps & { name: string }) {
    return (
        <Image
            src={`/icons/${name}.svg`}
            alt={alt}
            width={size}
            height={size}
            className={className}
            style={{
                ...style,
                width: size,
                height: size,
                maxWidth: "none",
                flexShrink: 0,
            }}
            aria-hidden={alt ? undefined : true}
        />
    );
}

export function CameraIcon(props: WeddingIconProps) {
    return <WeddingIcon name="camara" {...props} size={64} />;
}

export function GlassesIcon(props: WeddingIconProps) {
    return <WeddingIcon name="copas2" {...props} size={32} />;
}

export function DressCodeIcon(props: WeddingIconProps) {
    return <WeddingIcon name="dress-code" {...props} size={78} />;
}

export function MessageIcon(props: WeddingIconProps) {
    return <WeddingIcon name="message" {...props} />;
}

export function MirrorballIcon(props: WeddingIconProps) {
    return <WeddingIcon name="mirrorball" {...props} size={60} />;
}

export function GiftsIcon(props: WeddingIconProps) {
    return <WeddingIcon name="regalos" {...props} size={32} />;
}
