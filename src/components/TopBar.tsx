import type { CategoryFilter } from "../types/memo";
import IconButton from "./IconButton";
import TagSelect from "./TagSelect";

interface TopBarProps {
  keyword: string;
  onKeywordChange: (keyword: string) => void;
  category: CategoryFilter;
  onCategoryChange: (category: CategoryFilter) => void;
}

function TopBar({
  keyword,
  onKeywordChange,
  category,
  onCategoryChange,
}: TopBarProps) {
  return (
    <header className="flex items-center gap-4">
      <div className="flex h-20 flex-1 items-center gap-4 rounded-[28px] bg-white00 p-4">
        <TagSelect value={category} onChange={onCategoryChange} />
        <input
          type="text"
          value={keyword}
          onChange={(event) => onKeywordChange(event.target.value)}
          placeholder="원하는 메모를 검색하세요"
          aria-label="메모 검색"
          className="h-9 flex-1 bg-transparent text-field-medium text-blue07 outline-none placeholder:text-gray02"
        />
        <button
          type="button"
          aria-label="검색"
          className="flex shrink-0 cursor-pointer items-center"
        >
          <img src="/icons/search.svg" alt="" width={39} height={39} />
        </button>
      </div>

      <IconButton iconSrc="/icons/plus.svg" iconSize={28} label="메모 추가" />
      <IconButton iconSrc="/icons/profile.svg" iconSize={32} label="프로필" />
    </header>
  );
}

export default TopBar;