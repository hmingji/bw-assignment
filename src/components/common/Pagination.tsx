import { DOTS, usePagination } from '../../hooks/usePagination';
import { Theme, themes } from '../../types/Theme';
import { ChevronLeftIcon } from './Icons/ChevronLeftIcon';
import { ChevronRightIcon } from './Icons/ChevronRightIcon';

interface Props {
  currentPage: number;
  updatePage: (p: number) => void;
  pageSize: number;
  totalCount: number;
  theme: Theme;
}

export function Pagination({
  currentPage,
  updatePage,
  pageSize,
  totalCount,
  theme,
}: Props) {
  const paginationRange = usePagination(currentPage, totalCount, pageSize);

  if (
    currentPage === 0 ||
    (paginationRange && paginationRange.length < 2) ||
    !paginationRange
  ) {
    return null;
  }
  const lastPage = paginationRange[paginationRange.length - 1];
  const themeStyles = themes.find((t) => t.value === theme);
  return (
    <ul className="flex gap-2 items-center font-primary text-base">
      <li>
        <button
          className="p-1 rounded-full border border-gray-500 text-gray-500"
          disabled={currentPage === 1}
          onClick={() => updatePage(currentPage - 1)}
        >
          <ChevronLeftIcon />
        </button>
      </li>
      {paginationRange.map((p) => {
        if (p === DOTS) return <li>&#8230;</li>;
        return (
          <li key={p}>
            <button
              className={`p-1 rounded-full border  ${
                currentPage === parseInt(p)
                  ? `${themeStyles?.borderClassName} ${themeStyles?.textClassName}`
                  : 'border-gray-500 text-gray-500'
              }`}
              disabled={currentPage === parseInt(p)}
              onClick={() => updatePage(parseInt(p))}
            >
              {p}
            </button>
          </li>
        );
      })}
      <li>
        <button
          className="p-1 rounded-full border border-gray-500 text-gray-500"
          disabled={currentPage === parseInt(lastPage)}
          onClick={() => updatePage(currentPage + 1)}
        >
          <ChevronRightIcon />
        </button>
      </li>
    </ul>
  );
}
