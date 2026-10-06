'use client'
import { useState, useEffect } from 'react'
import { Html5QrcodeScanner } from 'html5-qrcode'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// PIN AKSES KHUSUS PANITIA
const PIN_PANITIA = "123456"

export default function ScanPage() {
  const [pinInput, setPinInput] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [pinError, setPinError] = useState('')
  const [statusMessage, setStatusMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null)

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (pinInput === PIN_PANITIA) {
      setIsAuthenticated(true)
      setPinError('')
    } else {
      setPinError('PIN Panitia Salah!')
    }
  }

  useEffect(() => {
    if (!isAuthenticated) return

    const scanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: { width: 250, height: 250 } },
      false
    )

    scanner.render(async (decodedText) => {
      // Cek peserta di Supabase
      const { data: participant, error } = await supabase
        .from('participants')
        .select('*')
        .eq('qr_code', decodedText)
        .single()

      if (error || !participant) {
        setStatusMessage({ text: 'Peserta tidak ditemukan!', type: 'error' })
        return
      }

      if (participant.attended) {
        setStatusMessage({ text: `Peserta ${participant.name} SUDAH absensi sebelumnya!`, type: 'error' })
        return
      }

      // Update status kehadiran
      await supabase
        .from('participants')
        .update({ attended: true })
        .eq('id', participant.id)

      setStatusMessage({ text: `Absensi Berhasil! Selamat Datang, ${participant.name}`, type: 'success' })
    }, () => {})

    return () => {
      scanner.clear().catch(() => {})
    }
  }, [isAuthenticated])

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-4">
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 max-w-md w-full text-center shadow-lg">
          <h2 className="text-xl font-bold mb-2">Portal Scanner Panitia</h2>
          <p className="text-slate-400 text-sm mb-4">Masukkan PIN Akses untuk membuka Scanner Absensi</p>

          <form onSubmit={handlePinSubmit} className="space-y-4">
            <input
              type="password"
              maxLength={6}
              placeholder="Masukkan PIN"
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value)}
              className="w-full text-center text-2xl tracking-widest p-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
            />
            {pinError && <p className="text-red-500 text-sm font-medium">{pinError}</p>}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
            >
              Masuk Portal Panitia
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-md mx-auto text-center">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Scanner Absensi Panitia</h2>
          <button 
            onClick={() => setIsAuthenticated(false)}
            className="text-xs bg-red-600/20 text-red-400 border border-red-500/30 px-3 py-1 rounded-md hover:bg-red-600/40"
          >
            Kunci Portal
          </button>
        </div>

        <div id="reader" className="bg-slate-800 rounded-xl p-2 border border-slate-700"></div>

        {statusMessage && (
          <div className={`mt-4 p-4 rounded-lg font-semibold ${statusMessage.type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}>
            {statusMessage.text}
          </div>
        )}
      </div>
    </div>
  )
}
