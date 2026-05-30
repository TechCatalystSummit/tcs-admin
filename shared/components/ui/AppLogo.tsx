import { logo } from "@/core/constants/brand";
import { cn } from "@/shared/utils/cn";
import Image from "next/image";

interface AppLogoProps {
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
}

/** White portrait lockup — use on dark or gradient backgrounds. */
export function AppLogo({
  width = logo.width,
  height = logo.height,
  className,
  priority = false,
}: AppLogoProps) {
  return (
    <Image
      src={logo.src}
      alt={logo.alt}
      width={width}
      height={height}
      priority={priority}
      className={cn("object-contain", className)}
    />
  );
}
