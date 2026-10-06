import React from 'react'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-slate-900 text-white">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex flex-col gap-6 text-center">
        <h1 className="text-4xl font-bold text-blue-400">
          Universal Event Registration & QR Attendance System
        </h1>
        <p className="text-lg text-slate-300">
          Sistem Pendaftaran & Absensi QR Berbasis Cloud Siap Digunakan.
        </p>
        <div className="p-4 bg-slate-800 border border-slate-700 rounded-lg text-green-400">
          Status Database Supabase: Terhubung & Siap
        </div>
      </div>
    </main>
  )
}
