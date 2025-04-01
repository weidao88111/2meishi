import React from 'react';

interface ColumnDefinition {
  label: string;
  width?: string;
  align?: 'left' | 'center' | 'right';
}

interface TableHeaderProps {
  columns: ColumnDefinition[];
  className?: string;
}

const TableHeader: React.FC<TableHeaderProps> = ({
  columns,
  className = '',
}) => {
  return (
    <thead className={`bg-gray-50 ${className}`}>
      <tr>
        {columns.map((column, index) => (
          <th
            key={index}
            scope="col"
            className={`px-6 py-3 text-${column.align || 'left'} text-xs font-medium text-gray-500 uppercase tracking-wider`}
            style={column.width ? { width: column.width } : undefined}
          >
            {column.label}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader; 