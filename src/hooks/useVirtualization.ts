import { useState, useEffect } from 'react'

// 仮想化の閾値設定
const VIRTUALIZATION_THRESHOLD = 50 // 50件以上で仮想化を有効化

export function useVirtualization() {
  const [isVirtualizationEnabled, setIsVirtualizationEnabled] = useState(false)
  const [performanceMetrics, setPerformanceMetrics] = useState({
    renderTime: 0,
    memoryUsage: 0,
    itemCount: 0
  })

  // 自動的に仮想化を有効/無効にする
  const checkVirtualizationNeed = (itemCount: number) => {
    const shouldEnable = itemCount >= VIRTUALIZATION_THRESHOLD
    
    if (shouldEnable !== isVirtualizationEnabled) {
      setIsVirtualizationEnabled(shouldEnable)
      console.log(`Virtualization ${shouldEnable ? 'enabled' : 'disabled'} for ${itemCount} items`)
    }

    setPerformanceMetrics(prev => ({
      ...prev,
      itemCount
    }))
  }

  // 手動で仮想化を切り替え
  const toggleVirtualization = () => {
    setIsVirtualizationEnabled(!isVirtualizationEnabled)
  }

  // レンダリング時間測定
  const measureRenderTime = (startTime: number) => {
    const endTime = performance.now()
    const renderTime = endTime - startTime
    
    setPerformanceMetrics(prev => ({
      ...prev,
      renderTime: Math.round(renderTime * 100) / 100
    }))
  }

  // メモリ使用量測定（利用可能な場合）
  useEffect(() => {
    if ('memory' in performance) {
      const updateMemoryUsage = () => {
        setPerformanceMetrics(prev => ({
          ...prev,
          memoryUsage: Math.round((performance as any).memory.usedJSHeapSize / 1024 / 1024)
        }))
      }

      const interval = setInterval(updateMemoryUsage, 5000) // 5秒ごと
      return () => clearInterval(interval)
    }
  }, [])

  return {
    isVirtualizationEnabled,
    setIsVirtualizationEnabled,
    toggleVirtualization,
    checkVirtualizationNeed,
    measureRenderTime,
    performanceMetrics,
    threshold: VIRTUALIZATION_THRESHOLD
  }
}

// デバイス性能に基づく最適化設定
export function useDeviceOptimization() {
  const [deviceTier, setDeviceTier] = useState<'low' | 'mid' | 'high'>('mid')

  useEffect(() => {
    // ハードウェア並行性でデバイス性能を推測
    const cores = navigator.hardwareConcurrency || 4
    
    // メモリ情報（利用可能な場合）
    const memory = (navigator as any).deviceMemory || 4

    // 接続情報（利用可能な場合）
    const connection = (navigator as any).connection
    const effectiveType = connection?.effectiveType || '4g'

    // デバイス性能ティア決定
    if (cores >= 8 && memory >= 8) {
      setDeviceTier('high')
    } else if (cores >= 4 && memory >= 4) {
      setDeviceTier('mid')
    } else {
      setDeviceTier('low')
    }

    console.log(`Device tier: ${deviceTier}`, {
      cores,
      memory,
      effectiveType
    })
  }, [])

  // デバイス性能に応じた設定
  const getOptimizationSettings = () => {
    switch (deviceTier) {
      case 'low':
        return {
          virtualizationThreshold: 20,
          overscanRowCount: 1,
          overscanColumnCount: 0,
          debounceDelay: 300
        }
      case 'mid':
        return {
          virtualizationThreshold: 50,
          overscanRowCount: 2,
          overscanColumnCount: 1,
          debounceDelay: 200
        }
      case 'high':
        return {
          virtualizationThreshold: 100,
          overscanRowCount: 3,
          overscanColumnCount: 1,
          debounceDelay: 100
        }
      default:
        return {
          virtualizationThreshold: 50,
          overscanRowCount: 2,
          overscanColumnCount: 1,
          debounceDelay: 200
        }
    }
  }

  return {
    deviceTier,
    optimizationSettings: getOptimizationSettings()
  }
}

// スクロール位置記憶フック
export function useScrollPosition() {
  const [scrollPosition, setScrollPosition] = useState({ scrollTop: 0, scrollLeft: 0 })

  const saveScrollPosition = (scrollTop: number, scrollLeft: number) => {
    setScrollPosition({ scrollTop, scrollLeft })
    
    // セッションストレージに保存
    try {
      sessionStorage.setItem('memoGridScrollPosition', JSON.stringify({ scrollTop, scrollLeft }))
    } catch (error) {
      console.warn('Failed to save scroll position:', error)
    }
  }

  const restoreScrollPosition = () => {
    try {
      const saved = sessionStorage.getItem('memoGridScrollPosition')
      if (saved) {
        const position = JSON.parse(saved)
        setScrollPosition(position)
        return position
      }
    } catch (error) {
      console.warn('Failed to restore scroll position:', error)
    }
    return { scrollTop: 0, scrollLeft: 0 }
  }

  return {
    scrollPosition,
    saveScrollPosition,
    restoreScrollPosition
  }
}