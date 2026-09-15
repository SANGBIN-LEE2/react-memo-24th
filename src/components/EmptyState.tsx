interface EmptyStateProps {
  isSearching: boolean;
}

function EmptyState({ isSearching }: EmptyStateProps) {
  return (
    <div className="flex min-h-[710px] flex-1 flex-col items-center justify-center gap-2.5 rounded-3xl border-2 border-dashed border-blue02 text-center">
      {isSearching ? (
        <div className="mb-2 flex size-24 items-center justify-center rounded-full bg-blue07">
          <img src="/icons/search-white.svg" alt="" width={40} height={40} />
        </div>
      ) : (
        <div className="mb-2 flex size-[120px] items-center justify-center rounded-full bg-blue02">
          <img src="/icons/plus-gray.svg" alt="" width={33} height={33} />
        </div>
      )}

      <p className="text-body-medium">
        {isSearching ? "검색 결과가 없습니다" : "새로운 메모를 작성해보세요!"}
      </p>
      {isSearching && (
        <p className="text-body-small text-gray03">
          다른 검색어로 다시 시도해보세요
        </p>
      )}
    </div>
  );
}

export default EmptyState;