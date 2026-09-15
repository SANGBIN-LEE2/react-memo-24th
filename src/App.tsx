import { useState } from "react";
import EmptyState from "./components/EmptyState";
import MemoSection from "./components/MemoSection";
import TopBar from "./components/TopBar";
import { initialMemoList } from "./data/memoList";
import useDebounce from "./hooks/useDebounce";
import type { CategoryFilter } from "./types/memo";
import filterMemoList from "./utils/filterMemoList";

function App() {
  const [memoList, setMemoList] = useState(initialMemoList);
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState<CategoryFilter>("all");

  // 입력이 0.3초 동안 멈췄을 때만 검색에 반영한다 (서버 연동 시 요청 폭주 방지)
  const debouncedKeyword = useDebounce(keyword, 300);

  // 상태가 바뀌면 React가 App을 다시 실행하므로 매번 자동으로 다시 계산된다
  const filteredList = filterMemoList(memoList, debouncedKeyword, category);
  const pinnedList = filteredList.filter((memo) => memo.isPinned);
  const normalList = filteredList.filter((memo) => !memo.isPinned);
  const isSearching = debouncedKeyword.trim() !== "" || category !== "all";

  // 기존 배열을 고치지 않고, 해당 메모만 바꾼 새 배열로 교체해야 React가 변화를 알아챈다
  const togglePin = (id: number) => {
    setMemoList((prev) =>
      prev.map((memo) =>
        memo.id === id ? { ...memo, isPinned: !memo.isPinned } : memo,
      ),
    );
  };

  const openMemo = (id: number) => {
    console.log("상세 뷰 열기", id); // 마지막 단계에서 MemoDetail로 교체
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-[1440px] flex-col gap-[52px] px-[120px] pt-[72px] pb-[86px]">
      <TopBar
        keyword={keyword}
        onKeywordChange={setKeyword}
        category={category}
        onCategoryChange={setCategory}
      />

      <main className="flex flex-1 flex-col gap-5">
        {filteredList.length === 0 ? (
          <EmptyState isSearching={isSearching} />
        ) : (
          <>
            <MemoSection
              title="고정된 메모"
              memoList={pinnedList}
              onTogglePin={togglePin}
              onOpen={openMemo}
            />
            <MemoSection
              title="전체 메모"
              memoList={normalList}
              onTogglePin={togglePin}
              onOpen={openMemo}
            />
          </>
        )}
      </main>
    </div>
  );
}

export default App;
