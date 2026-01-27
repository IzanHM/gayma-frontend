function Layout({ children }) {
    return (
    <div>
        {/*HEADER */}
        <header style={{
            padding: '20px',
            borderBottom: '1px solid #ddd',
            textAlign: 'center'
        }}>
            <h2>LA FAMILIA</h2>
        </header>

        {/*CONTENIDO*/}
        <main style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '20px'
        }}>
            {children}
        </main>
    </div>
    )
}

export default Layout