import React, { useEffect } from 'react'
import { useAppSelector } from '../../hooks/redux'
import { selectSortedAndFilteredMemos } from '../../utils/selectors'
import { useVirtualization, useDeviceOptimization } from '../../hooks/useVirtualization'
import { Memo } from '../../types'
import MemoGrid from './MemoGrid'
import VirtualMemoGrid from './VirtualMemoGrid'

interface MemoGridContainerProps {
  onEditMemo: (memo: Memo) => void
  onDeleteMemo: (id: string) => void
  onCreateMemo: () => void
  isLoading?: boolean
}

const MemoGridContainer: React.FC<MemoGridContainerProps> = (props) => {
  const memos = useAppSelector(selectSortedAndFilteredMemos)
  const { 
    isVirtualizationEnabled, 
    checkVirtualizationNeed, 
    performanceMetrics,
    threshold 
  } = useVirtualization()
  const { deviceTier, optimizationSettings } = useDeviceOptimization()

  // メモ数に応じて仮想化の必要性をチェック
  useEffect(() => {
    checkVirtualizationNeed(memos.length)
  }, [memos.length, checkVirtualizationNeed])

  // デバッグ情報（開発環境のみ）
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('MemoGrid Performance:', {
        itemCount: memos.length,
        isVirtualized: isVirtualizationEnabled,
        deviceTier,
        renderTime: performanceMetrics.renderTime,
        memoryUsage: performanceMetrics.memoryUsage,
        threshold,
        optimizationSettings
      })
    }
  }, [
    memos.length, 
    isVirtualizationEnabled, 
    deviceTier, 
    performanceMetrics, 
    threshold, 
    optimizationSettings
  ])

  // 仮想化判定: アイテム数とデバイス性能を考慮
  const shouldUseVirtualization = isVirtualizationEnabled || 
    (memos.length >= optimizationSettings.virtualizationThreshold)

  return (
    <>
      {shouldUseVirtualization ? (
        <VirtualMemoGrid {...props} />
      ) : (
        <MemoGrid {...props} />
      )}
      
      {/* パフォーマンス情報表示（開発環境のみ） */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 right-4 bg-black bg-opacity-75 text-white text-xs p-3 rounded-lg z-50">
          <div className="space-y-1">
            <div>📊 Performance Metrics</div>
            <div>Items: {memos.length} / Threshold: {threshold}</div>
            <div>Mode: {shouldUseVirtualization ? '🚀 Virtual' : '📝 Standard'}</div>
            <div>Device: {deviceTier.toUpperCase()}</div>
            {performanceMetrics.renderTime > 0 && (
              <div>Render: {performanceMetrics.renderTime}ms</div>
            )}
            {performanceMetrics.memoryUsage > 0 && (
              <div>Memory: {performanceMetrics.memoryUsage}MB</div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default MemoGridContainer