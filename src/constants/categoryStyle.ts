import type { Category } from "../types/memo";

// Tailwind는 완성된 클래스 이름만 인식하므로 `bg-${...}`로 조합하지 않고 미리 적어 둔다
export const cardColor: Record<Category, string> = {
  Daily: "bg-blue03",
  Work: "bg-blue06",
  Others: "bg-gray02",
};
