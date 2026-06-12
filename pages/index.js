import { useState, useEffect } from 'react';

export default function Home({ theme, isDark }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock data for demonstration
  useEffect(() => {
    const mockPosts = [
      { id: 1, title: 'New Workout Routine', likes: 1250, comments: 45, date: '2025-06-10' },
      { id: 2, title: 'Gym Progress Update', likes: 890, comments: 32, date: '2025-06-09' },
      { id: 3, title: 'Nutrition Tips', likes: 2100, comments: 87, date: '2025-06-08' },
      { id: 4, title: 'Rest Day Reflections', likes: 650, comments: 18, date: '2025-06-07' },
    ];
    setPosts(mockPosts);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        backgroundColor: theme.background,
        color: theme.text 
      }}>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      padding: '2rem',
      backgroundColor: theme.background,
      color: theme.text,
      fontFamily: 'Space Mono, monospace'
    }}>
      <header style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{ 
          fontSize: '3rem', 
          fontWeight: '700',
          marginBottom: '0.5rem',
          color: theme.primary 
        }}>
          Virlet
        </h1>
        <p style={{ 
          fontSize: '1.2rem', 
          color: theme.text,
          opacity: 0.8 
        }}>
          Instagram Creator Analytics & Management
        </p>
      </header>

      <main style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Stats Cards */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '1.5rem', 
          marginBottom: '2rem' 
        }}>
          <div className="neumorphic" style={{ 
            padding: '1.5rem',
            textAlign: 'center'
          }}>
            <h3 style={{ color: theme.primary, marginBottom: '0.5rem' }}>Total Posts</h3>
            <p style={{ fontSize: '2.5rem', fontWeight: '700' }}>{posts.length}</p>
          </div>
          
          <div className="neumorphic" style={{ 
            padding: '1.5rem',
            textAlign: 'center'
          }}>
            <h3 style={{ color: theme.success, marginBottom: '0.5rem' }}>Total Likes</h3>
            <p style={{ fontSize: '2.5rem', fontWeight: '700' }}>
              {posts.reduce((sum, post) => sum + post.likes, 0).toLocaleString()}
            </p>
          </div>
          
          <div className="neumorphic" style={{ 
            padding: '1.5rem',
            textAlign: 'center'
          }}>
            <h3 style={{ color: theme.warning, marginBottom: '0.5rem' }}>Total Comments</h3>
            <p style={{ fontSize: '2.5rem', fontWeight: '700' }}>
              {posts.reduce((sum, post) => sum + post.comments, 0).toLocaleString()}
            </p>
          </div>
          
          <div className="neumorphic" style={{ 
            padding: '1.5rem',
            textAlign: 'center'
          }}>
            <h3 style={{ color: theme.danger, marginBottom: '0.5rem' }}>Avg Engagement</h3>
            <p style={{ fontSize: '2.5rem', fontWeight: '700' }}>
              {Math.round(posts.reduce((sum, post) => sum + post.likes + post.comments, 0) / posts.length).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Posts Table */}
        <div className="neumorphic" style={{ 
          padding: '1.5rem',
          overflowX: 'auto'
        }}>
          <h2 style={{ 
            marginBottom: '1rem', 
            color: theme.primary,
            fontSize: '1.5rem' 
          }}>
            Recent Posts
          </h2>
          
          <table style={{ 
            width: '100%', 
            borderCollapse: 'collapse',
            fontFamily: 'JetBrains Mono, monospace'
          }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${theme.neutral}` }}>
                <th style={{ padding: '0.75rem', textAlign: 'left', color: theme.text }}>
                  Title
                </th>
                <th style={{ padding: '0.75rem', textAlign: 'left', color: theme.text }}>
                  Date
                </th>
                <th style={{ padding: '0.75rem', textAlign: 'right', color: theme.text }}>
                  Likes
                </th>
                <th style={{ padding: '0.75rem', textAlign: 'right', color: theme.text }}>
                  Comments
                </th>
                <th style={{ padding: '0.75rem', textAlign: 'right', color: theme.text }}>
                  Engagement
                </th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr 
                  key={post.id} 
                  style={{ 
                    borderBottom: `1px solid ${theme.neutral}`,
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = theme.surface === '#E7E5E4' ? '#DCDAD9' : '#3E3E3E';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <td style={{ padding: '0.75rem' }}>{post.title}</td>
                  <td style={{ padding: '0.75rem' }}>{post.date}</td>
                  <td style={{ padding: '0.75rem', textAlign: 'right' }}>
                    {post.likes.toLocaleString()}
                  </td>
                  <td style={{ padding: '0.75rem', textAlign: 'right' }}>
                    {post.comments.toLocaleString()}
                  </td>
                  <td style={{ padding: '0.75rem', textAlign: 'right' }}>
                    {(post.likes + post.comments).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Sample Chart Placeholder */}
        <div className="neumorphic" style={{ 
          padding: '1.5rem', 
          marginTop: '1.5rem',
          textAlign: 'center'
        }}>
          <h2 style={{ 
            marginBottom: '1rem', 
            color: theme.primary,
            fontSize: '1.5rem' 
          }}>
            Engagement Trends
          </h2>
          <p style={{ color: theme.text, opacity: 0.7 }}>
            Chart visualization will be added here
          </p>
          <div style={{ 
            height: '200px', 
            backgroundColor: theme.surface === '#E7E5E4' ? '#DCDAD9' : '#3E3E3E',
            borderRadius: '4px',
            marginTop: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <span style={{ color: theme.text, opacity: 0.5 }}>
              [Interactive Chart]
            </span>
          </div>
        </div>
      </main>

      <footer style={{ 
        textAlign: 'center', 
        marginTop: '2rem', 
        padding: '1rem',
        color: theme.text,
        opacity: 0.6,
        fontSize: '0.875rem'
      }}>
        <p>Virlet &copy; {new Date().getFullYear()} | Instagram Creator Analytics</p>
      </footer>
    </div>
  );
}
