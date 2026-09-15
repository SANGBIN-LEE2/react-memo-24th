import type { Category } from "../types/memo";

// Tailwind는 완성된 클래스 이름만 인식하므로 `bg-${...}`로 조합하지 않고 미리 적어 둔다
export const cardColor: Record<Category, string> = {
  Daily: "bg-blue03",
  Work: "bg-blue06",
  Others: "bg-gray02",
};

// 태그를 고르면 select 왼쪽에 보이는 카테고리 도트 아이콘
export const tagDotIcon: Record<Category, string> = {
  Daily: "bg-[url(/icons/dot-daily.svg)]",
  Work: "bg-[url(/icons/dot-work.svg)]",
  Others: "bg-[url(/icons/dot-others.svg)]",
};

// 상세 뷰 태그 칩 앞에 붙는 도트 색
export const tagDotColor: Record<Category, string> = {
  Daily: "bg-blue04",
  Work: "bg-blue06",
  Others: "bg-gray03",
};