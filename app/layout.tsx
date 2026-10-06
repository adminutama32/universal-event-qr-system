import React from 'react'

export const metadata = {
  title: 'Universal Event QR System',
  description: 'Sistem Pendaftaran & Absensi QR Event',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body className="bg-slate-900 text-slate-100 min-h-screen antialiased">
        {children}
      </body>
    </html>
  )
}
