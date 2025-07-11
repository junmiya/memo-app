import React, { useState, useEffect } from 'react';
import { Memo, MemoFormData, MEMO_COLORS } from '../../types';
import Modal from '../ui/Modal';
import Button from '../ui/Button';

interface MemoFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: MemoFormData) => void;
  memo?: Memo | null;
  isLoading?: boolean;
}

const MemoForm: React.FC<MemoFormProps> = ({
  isOpen,
  onClose,
  onSave,
  memo = null,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState<MemoFormData>({
    frontContent: '',
    backContent: '',
    color: 'blue',
    tags: [],
  });
  const [tagInput, setTagInput] = useState('');

  // メモが変更された時にフォームデータを更新
  useEffect(() => {
    if (memo) {
      setFormData({
        frontContent: memo.frontContent,
        backContent: memo.backContent,
        color: memo.color || 'blue',
        tags: memo.tags || [],
      });
    } else {
      setFormData({
        frontContent: '',
        backContent: '',
        color: 'blue',
        tags: [],
      });
    }
    setTagInput('');
  }, [memo]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.frontContent.trim() && !formData.backContent.trim()) {
      alert('表面または裏面のどちらかに内容を入力してください');
      return;
    }

    onSave(formData);
  };

  const handleTagAdd = () => {
    const tag = tagInput.trim();
    if (tag && !formData.tags?.includes(tag)) {
      setFormData(prev => ({
        ...prev,
        tags: [...(prev.tags || []), tag],
      }));
      setTagInput('');
    }
  };

  const handleTagRemove = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags?.filter(tag => tag !== tagToRemove) || [],
    }));
  };

  const handleTagInputKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleTagAdd();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={memo ? 'カードを編集' : '新しいカード'}
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 表面の内容 */}
        <div>
          <label htmlFor="frontContent" className="block text-sm font-medium text-gray-700 mb-2">
            表面の内容
          </label>
          <textarea
            id="frontContent"
            value={formData.frontContent}
            onChange={(e) => setFormData(prev => ({ ...prev, frontContent: e.target.value }))}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 resize-none"
            placeholder="メモのタイトルや要約を入力..."
          />
        </div>

        {/* 裏面の内容 */}
        <div>
          <label htmlFor="backContent" className="block text-sm font-medium text-gray-700 mb-2">
            裏面の内容
          </label>
          <textarea
            id="backContent"
            value={formData.backContent}
            onChange={(e) => setFormData(prev => ({ ...prev, backContent: e.target.value }))}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 resize-none"
            placeholder="詳細な内容や補足情報を入力..."
          />
        </div>

        {/* カラー選択 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            カードの色
          </label>
          <div className="flex flex-wrap gap-2">
            {MEMO_COLORS.map((color) => {
              const colorClasses = {
                blue: 'bg-blue-500',
                green: 'bg-green-500',
                yellow: 'bg-yellow-400',
                pink: 'bg-pink-500',
                purple: 'bg-purple-500',
                indigo: 'bg-indigo-500',
                red: 'bg-red-500',
                gray: 'bg-gray-500',
              };

              return (
                <button
                  key={color}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, color }))}
                  className={`w-8 h-8 rounded-full ${colorClasses[color]} border-2 ${
                    formData.color === color ? 'border-gray-900' : 'border-gray-300'
                  } hover:scale-110 transition-transform`}
                  aria-label={`${color}色を選択`}
                />
              );
            })}
          </div>
        </div>

        {/* タグ入力 */}
        <div>
          <label htmlFor="tagInput" className="block text-sm font-medium text-gray-700 mb-2">
            タグ
          </label>
          <div className="flex gap-2 mb-2">
            <input
              id="tagInput"
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={handleTagInputKeyPress}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="タグを入力してEnterキーを押す"
            />
            <Button type="button" onClick={handleTagAdd} variant="secondary" size="md">
              追加
            </Button>
          </div>
          
          {/* 追加されたタグ */}
          {formData.tags && formData.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {formData.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full"
                >
                  #{tag}
                  <button
                    type="button"
                    onClick={() => handleTagRemove(tag)}
                    className="ml-1 text-blue-600 hover:text-blue-800"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* 操作ボタン */}
        <div className="flex justify-end space-x-3 pt-4 border-t">
          <Button type="button" onClick={onClose} variant="secondary">
            キャンセル
          </Button>
          <Button type="submit" variant="primary" loading={isLoading}>
            {memo ? '更新' : '作成'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default MemoForm;