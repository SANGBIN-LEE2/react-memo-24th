interface IconButtonProps {
  iconSrc: string;
  iconSize: number;
  label: string;
  onClick?: () => void;
}

function IconButton({ iconSrc, iconSize, label, onClick }: IconButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex size-20 shrink-0 cursor-pointer items-center justify-center rounded-full bg-white00"
    >
      <img src={iconSrc} alt="" width={iconSize} height={iconSize} />
    </button>
  );
}

export default IconButton;
