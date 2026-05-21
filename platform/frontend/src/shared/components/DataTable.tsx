import React from 'react';
import { Table, TableProps, Input, Space, Button, Card } from 'antd';
import { Search, Filter, Download } from 'lucide-react';

interface DataTableProps<T> extends Omit<TableProps<T>, 'title'> {
  tableTitle?: string;
  onSearch?: (value: string) => void;
  extra?: React.ReactNode;
}

export function DataTable<T extends object>({ 
  tableTitle, 
  onSearch, 
  extra, 
  ...props 
}: DataTableProps<T>) {
  return (
    <Card 
      className="shadow-sm border-none rounded-2xl overflow-hidden"
      title={tableTitle && <span className="font-bold text-slate-800">{tableTitle}</span>}
      extra={extra}
    >
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 px-4">
        {onSearch && (
          <Input 
            placeholder="Search record..." 
            prefix={<Search size={18} className="text-slate-400 mr-2" />}
            onChange={(e) => onSearch(e.target.value)}
            className="max-w-md rounded-xl py-2 bg-slate-50 border-none"
          />
        )}
        <Space>
          <Button icon={<Filter size={16} />} className="rounded-lg">Filters</Button>
          <Button icon={<Download size={16} />} className="rounded-lg">Export</Button>
        </Space>
      </div>
      <Table 
        {...props} 
        pagination={{ 
          ...props.pagination as any,
          showSizeChanger: true,
          className: 'px-4 pb-4'
        }}
      />
    </Card>
  );
}
