import { cn } from "@/lib/utils";

const Logo = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="bg-primary text-primary-foreground flex h-8 w-8 items-center justify-center rounded-lg font-bold text-xl leading-none">
        e
      </div>
      <span className="text-xl font-bold tracking-tight text-foreground">
        eSIMval
      </span>
    </div>
  );
};

export default Logo;
