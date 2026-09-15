import type { Memo } from "../types/memo";
import { cardColor } from "../constants/categoryStyle";

interface MemoCardProps {
  memo: Memo;
  onTogglePin: (id: number) => void;
  onOpen: (id: number) => void;
}

function MemoCard({ memo, onTogglePin, onOpen }: MemoCardProps) {
  return (
    <article
      onClick={() => onOpen(memo.id)}
      className={`flex h-[285px] w-full cursor-pointer flex-col gap-2.5 rounded-[20px] px-5 py-3 text-white00 ${cardColor[memo.category]}`}
    >
      <header className="flex items-center justify-between gap-2">
        <h3 className="truncate text-heading-small">{memo.title}</h3>
        <button
          type="button"
          aria-label={memo.isPinned ? "고정 해제" : "고정"}
          onClick={(event) => {
            // 카드(article)의 onClick까지 올라가 상세 뷰가 열리지 않도록 막는다
            event.stopPropagation();
            onTogglePin(memo.id);
          }}
          className="flex shrink-0 cursor-pointer"
        >
          <img
            src={memo.isPinned ? "/icons/star-pinned.svg" : "/icons/star.svg"}
            alt=""
            width={23}
            height={22}
          />
        </button>
      </header>

      <p className="line-clamp-9 flex-1 whitespace-pre-wrap text-body-small">
        {memo.content}
      </p>

      <footer className="flex items-center justify-between text-body-small">
        <span>{memo.category}</span>
        <time>{memo.date}</time>
      </footer>
    </article>
  );
}

export default MemoCard;
