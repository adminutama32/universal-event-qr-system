import React from 'react'
import { QrCode, UserPlus, CheckCircle, Ticket } from 'lucide-react'

export default function Home() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
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

      {/* Grid Fitur Utama */}
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {/* Card Pendaftaran */}
        <div className="p-6 bg-slate-800/60 border border-slate-700/60 rounded-2xl hover:border-indigo-500/50 transition">
          <div className="flex items-center gap-3 mb-4 text-indigo-400">
            <UserPlus className="w-6 h-6" />
            <h2 className="text-xl font-bold text-white">Form Pendaftaran</h2>
          </div>
          <p className="text-slate-400 text-sm mb-6">
            Daftarkan peserta event untuk mendapatkan tiket QR Code unik secara otomatis.
          </p>
          <button className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-500 font-medium rounded-xl transition text-white">
            Buka Form Pendaftaran
          </button>
        </div>

        {/* Card Pemindai QR */}
        <div className="p-6 bg-slate-800/60 border border-slate-700/60 rounded-2xl hover:border-emerald-500/50 transition">
          <div className="flex items-center gap-3 mb-4 text-emerald-400">
            <QrCode className="w-6 h-6" />
            <h2 className="text-xl font-bold text-white">Scanner Absensi</h2>
          </div>
          <p className="text-slate-400 text-sm mb-6">
            Pindai tiket QR milik peserta di lokasi acara untuk mencatat kehadiran instan.
          </p>
          <button className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-500 font-medium rounded-xl transition text-white">
            Buka Pemindai QR
          </button>
        </div>
      </div>

      {/* Status Sistem */}
      <div className="p-4 bg-slate-800/30 border border-slate-700/40 rounded-xl flex items-center justify-between text-xs text-slate-400">
        <span className="flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          Koneksi Supabase & Vercel Terhubung
        </span>
        <span className="text-slate-500">v1.0.0</span>
      </div>
    </main>
  )
}
