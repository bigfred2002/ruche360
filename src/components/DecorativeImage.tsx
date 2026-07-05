import Image from "next/image";

type DecorativeImageProps = {
  alt: string;
  aspect?: "wide" | "card" | "square";
  className?: string;
  priority?: boolean;
  src: string;
};

const aspectClasses = {
  card: "aspect-[4/3]",
  square: "aspect-square",
  wide: "aspect-[16/9]",
} satisfies Record<NonNullable<DecorativeImageProps["aspect"]>, string>;

export function DecorativeImage({
  alt,
  aspect = "wide",
  className = "",
  priority = false,
  src,
}: DecorativeImageProps) {
  return (
    <figure
      className={`relative overflow-hidden rounded-3xl border border-cream-300 bg-cream-100 shadow-field ${aspectClasses[aspect]} ${className}`}
    >
      <Image
        alt={alt}
        className="object-cover"
        fill
        priority={priority}
        sizes="(min-width: 1280px) 44rem, (min-width: 768px) 50vw, 100vw"
        src={src}
      />
    </figure>
  );
}
