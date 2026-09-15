interface IconButtonProps {
  iconSrc: string;
  iconSize: number;
  label: string;
}

function IconButtton({ iconSrc, iconSize, label }: IconButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      className="flex size-20 shrink-0 cursor-pointer items-center justify-center rounded-full bg-white00"
    >
      <img src={iconSrc} alt="" width={iconSize} height={iconSize} />
    </button>
  );
}
