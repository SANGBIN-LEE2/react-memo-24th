import type { Memo } from '../types/memo'
import MemoCard from './MemoCard'

interface MemoSectionProps {
  title: string
  memoList: Memo[]
  onTogglePin: (id: number) => void
  onOpen: (id: number) => void
}

function MemoSection({ title, memoList, onTogglePin, onOpen }: MemoSectionProps) {
  // 보여줄 메모가 없으면 구역 자체를 그리지 않는다 (1주차의 section.hidden)
  if (memoList.length === 0) return null

  return (
    <section>
      <h2 className="sr-only">{title}</h2>
      <ul className="flex flex-wrap gap-5">
        {memoList.map((memo) => (
          <li
            key={memo.id}
            className="max-w-[285px] flex-[0_0_calc((100%_-_60px)/4)]"
          >
            <MemoCard memo={memo} onTogglePin={onTogglePin} onOpen={onOpen} />
          </li>
        ))}
      </ul>
    </section>
  )
}

export default MemoSection