'use client';

import Image from 'next/image';
import { useState } from 'react';
import ImageFallback from '@/components/ImageFallback';
import { cn } from '@/lib/utils';

export default function ImageWithFallback({
  src,
  alt,
  fallbackLabel,
  fallbackSubLabel,
  className,
  imageClassName
}: {
  src?: string;
  alt: string;
  fallbackLabel: string;
  fallbackSubLabel?: string;
  className?: string;
  imageClassName?: string;
}) {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <ImageFallback
        label={fallbackLabel}
        subLabel={fallbackSubLabel}
        className={cn('absolute inset-0', className)}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className={cn('object-cover', imageClassName)}
      onError={() => setHasError(true)}
    />
  );
}
