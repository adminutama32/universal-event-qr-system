'use client'

import React, { useState } from 'react'
import { ArrowLeft, CheckCircle, User, Mail, Phone, Building } from 'lucide-react'
import Link from 'next/link'

export default function RegisterPage() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    institution: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    // Simulasi simpan data
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 1000)
  }

  return (
    <main className="max-w-md mx-auto px-4 py-12">
      <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-6 text-sm">
        <ArrowLeft className="w-4 h-4" /> Kembali ke Beranda
      </Link>

      <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 shadow-xl">
        {!submitted ? (
          <>
            <h1 className="text-2xl font-bold text-white mb-2">Form Pendaftaran Event</h1>
            <p className="text-slate-400 text-sm mb-6">Isi data diri Anda untuk mendapatkan tiket QR Code.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
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

              <div>
                <label className="block text-xs text-slate-300 font-medium mb-1">Instansi / Perusahaan</label>
                <div className="relative">
                  <Building className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="Nama Universitas / Perusahaan"
                    className="w-full pl-10 pr-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500"
                    value={formData.institution}
                    onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-4 py-3 bg-indigo-600 hover:bg-indigo-500 font-medium rounded-xl text-white transition text-sm flex items-center justify-center gap-2"
              >
                {loading ? 'Daftar...' : 'Daftar Sekarang'}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-6">
            <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
            <h2 className="text-xl font-bold text-white mb-2">Pendaftaran Berhasil!</h2>
            <p className="text-slate-400 text-sm mb-6">
              Terima kasih <span className="text-white font-semibold">{formData.name}</span>. Tiket QR Code Anda telah dibuat.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="text-xs text-indigo-400 hover:underline"
            >
              Daftar Peserta Lain
            </button>
          </div>
        )}
      </div>
    </main>
  )
}
