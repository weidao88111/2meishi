import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange
}) => {
  // 页码显示逻辑
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    
    if (totalPages <= maxPagesToShow) {
      // 如果总页数小于要显示的最大页数，显示所有页码
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // 复杂逻辑，确保当前页附近的页码显示
      let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
      let endPage = startPage + maxPagesToShow - 1;
      
      if (endPage > totalPages) {
        endPage = totalPages;
        startPage = Math.max(1, endPage - maxPagesToShow + 1);
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      
      // 添加首页和末页的省略标记
      if (startPage > 1) {
        if (startPage > 2) {
          pages.unshift('...');
        }
        pages.unshift(1);
      }
      
      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pages.push('...');
        }
        pages.push(totalPages);
      }
    }
    
    return pages;
  };
  
  const pages = getPageNumbers();
  
  // 如果总页数为1，不显示分页
  if (totalPages <= 1) return null;
  
  return (
    <nav className="flex items-center justify-center mt-6">
      <ul className="flex space-x-1">
        {/* 上一页按钮 */}
        <li>
          <button
            onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-2 rounded-md text-sm font-medium ${
              currentPage === 1
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
            }`}
            aria-label="上一页"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        </li>
        
        {/* 页码按钮 */}
        {pages.map((page, index) => (
          <li key={index}>
            {page === '...' ? (
              <span className="px-4 py-2 text-gray-400">...</span>
            ) : (
              <button
                onClick={() => typeof page === 'number' && onPageChange(page)}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  currentPage === page
                    ? 'bg-red-600 text-white'
                    : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                }`}
              >
                {page}
              </button>
            )}
          </li>
        ))}
        
        {/* 下一页按钮 */}
        <li>
          <button
            onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-2 rounded-md text-sm font-medium ${
              currentPage === totalPages
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
            }`}
            aria-label="下一页"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination; 