export type Category = "Daily" | "Work" | "Others";

export interface Memo {
  id: number;
  title: string;
  content: string;
  category: Category;
  date: string;
  isPinned: boolean;
}

// 태그 필터에서 고를 수 있는 값: 카데고리 3개 + 전체
export type CategoryFilter = Category | "all";
