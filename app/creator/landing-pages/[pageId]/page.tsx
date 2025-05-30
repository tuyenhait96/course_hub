'use client'

import { useParams } from 'next/navigation'

export default function EditLandingPage() {
  const params = useParams()
  const pageId = params.pageId

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Edit Landing Page: {pageId}</h1>
      {/* Add form for editing landing page {pageId} here */}
      <p>Form for editing landing page {pageId} will be here.</p>
    </div>
  )
} 