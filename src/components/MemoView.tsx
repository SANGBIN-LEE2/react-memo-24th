import { useEffect } from "react";
import { cardColor, chipDotColor } from "../constants/categoryStyle";
import type { Memo } from "../types/memo";

interface MemoViewProps {
  memo: Memo;
  onClose: () => void;
}

function MemoView({ memo, onClose }: MemoViewProps) {
  // 상세 뷰가 떠 있는 동안에만 ESC 키로 닫을 수 있게 한다
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    // 상세 뷰가 사라질 때(언마운트) 등록했던 리스너를 떼어낸다
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      onClick={(event) => {
        // 딤(배경) 자체를 눌렀을 때만 닫는다. 카드 안쪽 클릭도 버블링으로 여기까지 올라온다
        if (event.target === event.currentTarget) onClose();
      }}
      className="fixed inset-0 z-10 flex items-center justify-center bg-blue07/45 p-5"
    >
      <article
        role="dialog"
        aria-modal="true"
        aria-labelledby="memo-detail-title"
        className={`flex size-[556px] max-h-full flex-col gap-4 rounded-3xl px-11 py-10 text-white00 ${cardColor[memo.category]}`}
      >
        <header className="flex items-start justify-between gap-4">
          <h2
            id="memo-detail-title"
            className="flex-1 break-all text-heading-large"
          >
            {memo.title}
          </h2>
          <button
            type="button"
            aria-label="닫기"
            onClick={onClose}
            autoFocus
            className="mt-1.5 flex shrink-0 cursor-pointer"
          >
            <img src="/icons/close.svg" alt="" width={32} height={32} />
          </button>
        </header>

        <div className="flex items-center gap-6">
          <span className="inline-flex h-9 items-center gap-2 rounded-full bg-white00 px-[18px] py-2 text-action-small text-blue07">
            <span
              className={`size-5 shrink-0 rounded-full ${chipDotColor[memo.category]}`}
            />
            {memo.category}
          </span>
          <time className="border-l-[3px] border-current pl-6 text-body-medium leading-[52px]">
            {memo.date}
          </time>
        </div>

        <p className="flex-1 overflow-y-auto break-all whitespace-pre-wrap text-body-medium">
          {memo.content}
        </p>
      </article>
    </div>
  );
}

export default MemoView;
