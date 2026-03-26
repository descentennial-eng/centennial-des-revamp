"use client"

interface DesLogoProps {
  size?: "sm" | "md" | "lg"
  className?: string
}

const sizeMap = {
  sm: {
    dot: "h-1.5 w-1.5",
    des: "text-xl",
    sub: "text-[7px] tracking-[0.12em]",
    gap: "gap-0",
  },
  md: {
    dot: "h-2 w-2",
    des: "text-3xl",
    sub: "text-[9px] tracking-[0.14em]",
    gap: "gap-0.5",
  },
  lg: {
    dot: "h-2.5 w-2.5",
    des: "text-5xl",
    sub: "text-xs tracking-[0.16em]",
    gap: "gap-1",
  },
}

export function DesLogo({ size = "sm", className = "" }: DesLogoProps) {
  const s = sizeMap[size]

  return (
    <div className={`flex flex-col ${s.gap} ${className}`}>
      <div className="flex items-start">
        <span className={`${s.dot} mt-0.5 mr-1 rounded-full bg-primary`} />
        <span
          className={`${s.des} font-sans font-black leading-none tracking-tighter text-foreground`}
        >
          DES
        </span>
      </div>
      <div className="flex flex-col leading-none">
        <span className={`${s.sub} font-bold uppercase text-primary`}>
          Digital
        </span>
        <span className={`${s.sub} font-bold uppercase text-primary`}>
          Engagement
        </span>
        <span className={`${s.sub} font-bold uppercase text-primary`}>
          Strategy
        </span>
      </div>
    </div>
  )
}
