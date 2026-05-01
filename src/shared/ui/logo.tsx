import clsx from "clsx";

interface LogoProps {
  className?: string;
}

function Logo({ className }: LogoProps) {
  return (
    <div className={clsx(className)}>
      <div className="font-bold text-xl text-(--text-primary)">Custom Type</div>
    </div>
  );
}

export default Logo;
