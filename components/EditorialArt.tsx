/* eslint-disable @next/next/no-img-element */
import { sitePath } from '@/lib/utils';

type EditorialArtProps = {
  src: string;
  alt: string;
  caption: string;
  kind?: string;
  priority?: boolean;
  width?: number;
  height?: number;
};

export default function EditorialArt({
  src,
  alt,
  caption,
  kind = 'MACHINE FOLKLORE',
  priority = false,
  width = 1536,
  height = 1024,
}: EditorialArtProps) {
  return (
    <figure className="editorial-art">
      <img
        src={sitePath(src)}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
      />
      <figcaption>
        <span>{kind}</span>
        <span>{caption}</span>
      </figcaption>
    </figure>
  );
}
