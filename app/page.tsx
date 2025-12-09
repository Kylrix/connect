export default function Home() {
  return (
    <div className="app-container">
      <aside className="sidebar">
        <div style={{ padding: '20px', fontWeight: 'bold' }}>WhisperrConnect</div>
        <nav style={{ padding: '20px' }}>
          {/* Sidebar items will go here */}
          <div>Chats</div>
          <div>Calls</div>
          <div>Contacts</div>
        </nav>
      </aside>
      
      <main className="main-content">
        <div style={{ 
          flex: 1, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          flexDirection: 'column',
          padding: '20px',
          textAlign: 'center'
        }}>
          <h1 style={{ marginBottom: '1rem' }}>Welcome to WhisperrConnect</h1>
          <p style={{ maxWidth: '400px', color: '#666' }}>
            Secure, modular, and instant connections. 
            Select a chat to start messaging.
          </p>
        </div>

        {/* Mobile Bottom Navigation Placeholder */}
        <nav className="bottom-nav">
          <div>Chats</div>
          <div>Calls</div>
          <div>Settings</div>
        </nav>
      </main>
    </div>
  );
}
