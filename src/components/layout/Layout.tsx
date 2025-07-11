import React from 'react';
import { BaseComponentProps } from '../../types';

interface LayoutProps extends BaseComponentProps {
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  header, 
  footer, 
  className = '' 
}) => {
  return (
    <div className={`min-h-screen bg-gray-50 flex flex-col ${className}`}>
      {/* ヘッダー */}
      {header}

      {/* メインコンテンツ */}
      <main className="flex-1">
        {children}
      </main>

      {/* フッター */}
      {footer}
    </div>
  );
};

export default Layout;