import { useState } from "react";
import MemoSection from "./components/MemoSection";
import { initialMemoList } from "./data/memoList";

function App() {
  const [memoList, setMemoList] = useState(initialMemoList);

  // 상태가 바뀌면 React가 App을 다시 실행하므로 매번 자동으로 다시 계산된다
  const pinnedList = memoList.filter((memo) => memo.isPinned);
  const normalList = memoList.filter((memo) => !memo.isPinned);

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
      <main className="flex flex-1 flex-col gap-5">
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
      </main>
    </div>
  );
}

export default App;
