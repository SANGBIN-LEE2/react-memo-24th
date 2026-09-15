import { tagDotIcon } from "../constants/categoryStyle";
import type { CategoryFilter } from "../types/memo";

interface TagSelectProps {
  value: CategoryFilter;
  onChange: (category: CategoryFilter) => void;
}

function TagSelect({ value, onChange }: TagSelectProps) {
  // 전체일 땐 오른쪽 화살표, 태그를 고르면 왼쪽에 카테고리 도트
  const iconClass =
    value === "all"
      ? "bg-[url(/icons/arrow.svg)] bg-position-[right_12px_center] pl-3"
      : `${tagDotIcon[value]} bg-position-[left_12px_center] pl-10`;

  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value as CategoryFilter)}
      aria-label="태그 선택"
      className={`h-9 w-[116px] shrink-0 cursor-pointer appearance-none rounded-[28px] bg-blue01 bg-no-repeat py-1 pr-6 text-action-small text-blue07 ${iconClass}`}
    >
      <option value="all">태그 선택</option>
      <option value="Daily">Daily</option>
      <option value="Work">Work</option>
      <option value="Others">Others</option>
    </select>
  );
}

export default TagSelect;
