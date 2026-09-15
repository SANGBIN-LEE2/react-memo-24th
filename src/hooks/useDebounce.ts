import { useEffect, useState } from "react";

// value가 바뀐 뒤 delay(ms) 동안 더 바뀌지 않을 때만 결과값을 갱신한다
function useDebounce(value: string, delay: number): string {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // 다음 입력이 들어오면(또는 컴포넌트가 사라지면) 이전 타이머를 취소한다
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
