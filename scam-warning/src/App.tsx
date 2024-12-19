import React, { useState, useEffect } from 'react'

function App() {
  const [visitCount, setVisitCount] = useState<number>(() => {
    // Retrieve visit count from localStorage or start at 0
    const savedCount = localStorage.getItem('scamWarningVisits')
    return savedCount ? parseInt(savedCount, 10) : 0
  })

  useEffect(() => {
    // Increment visit count
    const newCount = visitCount + 1
    setVisitCount(newCount)
    
    // Save to localStorage
    localStorage.setItem('scamWarningVisits', newCount.toString())
  }, [])

  const handleGoBack = () => {
    // Attempt to go back to the previous page
    window.history.back()
  }

  return (
    <div className="warning">
      <h1>⚠️ THIS IS A SCAM ⚠️</h1>
      <p>
        You have been redirected to this page because the link you clicked appears to be a potential scam or fraudulent website.
      </p>
      <p>
        For your safety, we recommend:
        <ul>
          <li>Do NOT provide any personal information</li>
          <li>Do NOT click on any links</li>
          <li>Do NOT download any files</li>
        </ul>
      </p>
      <button onClick={handleGoBack}>Go Back to Safety</button>
      <div className="counter">
        This scam warning page has been viewed {visitCount} time{visitCount !== 1 ? 's' : ''} during this session.
      </div>
    </div>
  )
}

export default App
