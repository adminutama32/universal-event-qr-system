'use client'

import React, { useState } from 'react'
import { QrCode, UserPlus, CheckCircle, Ticket, User, Mail, Phone, ArrowLeft } from 'lucide-react'
import { createClient } from '@supabase/supabase-js'

// Inisialisasi Klien Supabase dari Environment Variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default function Home() {
  const [view, setView] = useState<'home' | 'register'>('home')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [qrValue, setQrValue] = useState('')
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrorMsg('')

    // Generate ID unik untuk Kode QR
    const uniqueQrCode = `EVENT-${Date.now()}-${Math.floor(Math.random() * 1000)}`

    try {
      const { data, error } = await supabase
        .from('participants')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            qr_code: uniqueQrCode,
          },
        ])
        .select()

      if (error) throw error

      setQrValue(uniqueQrCode)
      setSubmitted(true)
    } catch (err: any) {
      console.error(err)
      setErrorMsg(err.message || 'Gagal menyimpan data ke database.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center p-3 bg-indigo-600/20 rounded-2xl mb-4 text-indigo-400">
          <Ticket className="w-10 h-10" />
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-gradient-to-r from-white via-slate-200 to-indigo-400 bg-clip-text text-transparent">
          Event QR System
        </h1>
        <p className="mt-3 text-lg text-slate-400">
          Sistem Pendaftaran Peserta & Absensi QR Code Berbasis Cloud
        </p>
      </div>

      {view === 'home' ? (
        /* Beranda Utama */
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="p-6 bg-slate-800/60 border border-slate-700/60 rounded-2xl hover:border-indigo-500/50 transition flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4 text-indigo-400">
                <UserPlus className="w-6 h-6" />
                <h2 className="text-xl font-bold text-white">Form Pendaftaran</h2>
              </div>
              <p className="text-slate-400 text-sm mb-6">
                Daftarkan peserta event untuk mendapatkan tiket QR Code unik secara otomatis.
              </p>
            </div>
            <button
              onClick={() => { setView('register'); setSubmitted(false); setErrorMsg(''); }}
              className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-500 font-medium rounded-xl transition text-white"
            >
              Buka Form Pendaftaran
            </button>
          </div>

          <div className="p-6 bg-slate-800/60 border border-slate-700/60 rounded-2xl hover:border-emerald-500/50 transition flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4 text-emerald-400">
                <QrCode className="w-6 h-6" />
                <h2 className="text-xl font-bold text-white">Scanner Absensi</h2>
              </div>
              <p className="text-slate-400 text-sm mb-6">
                Pindai tiket QR milik peserta di lokasi acara untuk mencatat kehadiran instan.
              </p>
            </div>
            <button className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-500 font-medium rounded-xl transition text-white opacity-80 cursor-not-allowed">
              Segera Hadir
            </button>
          </div>
        </div>
      ) : (
        /* Form Pendaftaran & QR Generator */
        <div className="max-w-md mx-auto mb-12">
          <button
            onClick={() => setView('home')}
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-6 text-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Kembali ke Beranda
          </button>

          <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 shadow-xl">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h2 className="text-2xl font-bold text-white mb-2">Form Pendaftaran</h2>

                {errorMsg && (
                  <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-xs">
                    {errorMsg}
                  </div>
                )}

                <div>
                  <label className="block text-xs text-slate-300 font-medium mb-1">Nama Lengkap</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Budi Santoso"
                      className="w-full pl-10 pr-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-slate-300 font-medium mb-1">Email</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      required
                      placeholder="nama@email.com"
                      className="w-full pl-10 pr-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-slate-300 font-medium mb-1">Nomor WhatsApp</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="tel"
                      required
                      placeholder="08123456789"
                      className="w-full pl-10 pr-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-4 py-3 bg-indigo-600 hover:bg-indigo-500 font-medium rounded-xl text-white transition text-sm flex justify-center items-center gap-2"
                >
                  {loading ? 'Menyimpan ke Database...' : 'Daftar Sekarang'}
                </button>
              </form>
            ) : (
              <div className="text-center py-4">
                <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
                <h3 className="text-xl font-bold text-white mb-1">Pendaftaran Berhasil!</h3>
                <p className="text-slate-400 text-xs mb-6">
                  Tiket digital resmi untuk <span className="text-white font-semibold">{formData.name}</span>
                </p>

                {/* Tampilan Gambar QR Code */}
                <div className="bg-white p-4 rounded-xl inline-block mb-4 shadow-lg">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${qrValue}`}
                    alt="Tiket QR Code"
                    className="w-44 h-44 mx-auto"
                  />
                  <p className="text-[10px] text-slate-500 font-mono mt-2">{qrValue}</p>
                </div>

                <p className="text-slate-400 text-xs mb-6">
                  Simpan atau tangkap layar (screenshot) kode QR ini untuk ditunjukkan saat absensi di lokasi acara.
                </p>

                <button
                  onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', phone: '' }); }}
                  className="text-xs text-indigo-400 hover:underline"
                >
                  Daftar Peserta Lain
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="p-4 bg-slate-800/30 border border-slate-700/40 rounded-xl flex items-center justify-between text-xs text-slate-400">
        <span className="flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          Database Supabase Aktif
        </span>
        <span className="text-slate-500">v1.1.0</span>
      </div>
    </main>
  )
}
