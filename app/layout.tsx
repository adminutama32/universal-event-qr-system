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
      <body>{children}</body>
    </html>
  )
}
