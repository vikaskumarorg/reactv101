import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'

type Notice = { id: number; message: string; tone: 'success' | 'error' }
interface AppContextValue {
  notices: Notice[]
  notify: (message: string, tone?: Notice['tone']) => void
  dismiss: (id: number) => void
}
const AppContext = createContext<AppContextValue | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [notices, setNotices] = useState<Notice[]>([])
  const notify = useCallback((message: string, tone: Notice['tone'] = 'success') => {
    const id = Date.now() + Math.random()
    setNotices((current) => [...current, { id, message, tone }])
    window.setTimeout(() => setNotices((current) => current.filter((notice) => notice.id !== id)), 3500)
  }, [])
  const dismiss = useCallback((id: number) => setNotices((current) => current.filter((notice) => notice.id !== id)), [])
  const value = useMemo(() => ({ notices, notify, dismiss }), [notices, notify, dismiss])
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
export function useAppContext() {
  const context = useContext(AppContext)
  if (!context) throw new Error('useAppContext must be used within AppProvider')
  return context
}
