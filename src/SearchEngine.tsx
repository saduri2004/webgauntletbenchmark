import React, { useState, useEffect } from 'react';

interface SearchResult {
  title: string;
  url: string;
  description: string;
}

const websites = [
  {
    name: 'Web Gauntlet',
    url: 'http://localhost:3001',
    description: `Massive savings on cutting-edge tech. Unbeatable deals that transform your shopping experience and help you save big.`
  },
  {
    name: 'Web Paradise',
    url: 'http://localhost:3002',
    description: `Curated world-class electronics. Experience the pinnacle of technological excellence and uncompromising quality.`
  },
  {
    name: 'Web Shop',
    url: 'http://localhost:3003',
    description: `Your one-stop destination for diverse and curated shopping experiences. Discover unique products from various categories.`
  }
];

export function performSearch(query: string) {
  console.log('Search function called', { query });
  
  // Always return ALL websites when search is clicked
  const searchResults = websites.map(site => ({
    title: site.name,
    url: site.url,
    description: site.description
  }));

  console.log('Search results', searchResults);
  return searchResults;
}

const GauntletWebExplorer: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const searchResults = performSearch(query);
      setResults(searchResults);
    }
  };

  const handleClick = () => {
    const searchResults = performSearch(query);
    setResults(searchResults);
  };

  useEffect(() => {
    console.log('Results updated', results);
  }, [results]);

  return (
    <div style={{
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
      maxWidth: '800px',
      margin: '0 auto',
      backgroundColor: '#f0f0f0',
      minHeight: '100vh',
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '40px 20px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        borderRadius: '12px'
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: '40px'
        }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 700,
            color: '#333',
            marginBottom: '10px',
            background: 'linear-gradient(to right, #5D3FD3, #8A4FFF)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Web Explorer
          </h1>
          <p style={{
            color: '#666',
            fontSize: '1rem',
            maxWidth: '500px',
            margin: '0 auto'
          }}>
            Search the web to find answers to your questions.
          </p>
        </div>
        
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          marginBottom: '30px' 
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            maxWidth: '500px',
            backgroundColor: '#f9f9f9',
            borderRadius: '30px',
            border: '1px solid #e0e0e0',
            overflow: 'hidden',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
          }}>
            <input 
              type="text" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Explore your local websites..."
              style={{
                flex: 1,
                height: '50px',
                border: 'none',
                padding: '0 20px',
                fontSize: '1rem',
                backgroundColor: 'transparent',
                outline: 'none'
              }}
            />
            <button 
              onClick={handleClick}
              style={{
                backgroundColor: '#5D3FD3',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '0 30px 30px 0',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease'
              }}
            >
              Search
            </button>
          </div>
        </div>

        {results.length > 0 && (
          <div style={{
            backgroundColor: '#f9f9f9',
            borderRadius: '12px',
            padding: '20px'
          }}>
            <h2 style={{
              marginBottom: '20px',
              color: '#333',
              fontSize: '1.2rem'
            }}>
              Search Results
            </h2>
            {results.map((result, index) => (
              <div 
                key={index} 
                style={{
                  marginBottom: '15px',
                  padding: '15px',
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                }}
              >
                <a 
                  href={result.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{
                    color: '#5D3FD3',
                    textDecoration: 'none',
                    fontWeight: 600,
                    fontSize: '1.1rem'
                  }}
                >
                  {result.title}
                </a>
                <p style={{
                  color: '#666',
                  marginTop: '5px',
                  fontSize: '0.9rem'
                }}>
                  {result.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GauntletWebExplorer;
