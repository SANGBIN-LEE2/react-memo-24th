import type { Category, Memo } from '../types/memo'

const SAMPLE_TITLE = '이것은 제목입니다'
const SAMPLE_CONTENT = '이것은 본문입니다 이것은 본문입니다 이것은 본문입니다'

// 제목·본문은 모든 샘플이 같으므로 한 번만 적고, 메모마다 다른 값만 받는다
const createMemo = (
  id: number,
  category: Category,
  date: string,
  isPinned = false,
): Memo => ({
  id,
  title: SAMPLE_TITLE,
  content: SAMPLE_CONTENT,
  category,
  date,
  isPinned,
})

export const initialMemoList: Memo[] = [
  createMemo(1, 'Daily', '2026-09-15', true),
  createMemo(2, 'Work', '2026-09-15', true),
  createMemo(3, 'Others', '2026-09-16'),
  createMemo(4, 'Daily', '2026-09-16'),
  createMemo(5, 'Work', '2026-09-17'),
  createMemo(6, 'Others', '2026-09-17'),
  createMemo(7, 'Daily', '2026-09-18'),
  createMemo(8, 'Work', '2026-09-18'),
  createMemo(9, 'Others', '2026-09-19'),
  createMemo(10, 'Daily', '2026-09-19'),
]