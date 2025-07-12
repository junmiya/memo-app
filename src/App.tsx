import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import { AuthProvider } from './components/auth/AuthProvider';
import Layout from './components/layout/Layout';
import Header from './components/layout/Header';
import SearchHeader from './components/search/SearchHeader';
import MemoGrid from './components/memo/MemoGrid';
import MemoForm from './components/memo/MemoForm';
import { useMemos } from './hooks/useMemos';
import { useAppSelector } from './hooks/redux';
import { selectIsFormOpen } from './store';
import { MemoFormData } from './types';

// メインアプリケーションコンポーネント
const AppContent: React.FC = () => {
  const {
    memos,
    selectedMemo,
    isLoading,
    error,
    createMemo,
    editMemo,
    removeMemo,
    openCreate,
    openEdit,
    closeFormModal,
  } = useMemos();

  const isFormOpen = useAppSelector(selectIsFormOpen);

  // フォーム保存処理
  const handleSaveMemo = async (data: MemoFormData) => {
    try {
      if (selectedMemo) {
        // 編集モード
        await editMemo(selectedMemo.id, data);
      } else {
        // 新規作成モード
        await createMemo(data);
      }
      closeFormModal();
    } catch (error) {
      console.error('Failed to save memo:', error);
    }
  };

  // エラー表示
  if (error) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="text-red-600 text-lg font-medium mb-2">エラーが発生しました</div>
            <div className="text-gray-600">{error}</div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout
      header={
        <Header 
          onCreateMemo={openCreate}
          memoCount={memos.length}
        />
      }
    >
      {/* 検索・フィルターヘッダー */}
      <SearchHeader />

      {/* メモ一覧 */}
      <MemoGrid
        onEditMemo={openEdit}
        onDeleteMemo={removeMemo}
        onCreateMemo={openCreate}
        isLoading={isLoading}
      />

      <MemoForm
        isOpen={isFormOpen}
        onClose={closeFormModal}
        onSave={handleSaveMemo}
        memo={selectedMemo}
        isLoading={isLoading}
      />
    </Layout>
  );
};

// ルートコンポーネント
const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Provider>
  );
};

export default App;