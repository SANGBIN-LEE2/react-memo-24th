import type { CategoryFilter, Memo } from "../types/memo";

// 태그와 검색어 조건을 모두 만족하는 메모만 남긴다 (1주차 renderMemoList의 ① 단계)
function filterMemoList(
  memoList: Memo[],
  keyword: string,
  category: CategoryFilter,
): Memo[] {
  const searchWord = keyword.trim().toLowerCase();

  return memoList.filter((memo) => {
    const matchCategory = category === "all" || memo.category === category;
    const matchKeyword =
      memo.title.toLowerCase().includes(searchWord) ||
      memo.content.toLowerCase().includes(searchWord);
    return matchCategory && matchKeyword;
  });
}

export default filterMemoList;
