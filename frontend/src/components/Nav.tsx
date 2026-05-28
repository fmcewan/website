const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '5rem',
  },
  logo: {
    fontSize: '13px',
    fontWeight: 500,
    letterSpacing: '0.04em',
    color: '#f2f4f8',
  },
  links: {
    display: 'flex',
    gap: '2rem',
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },
  link: {
    fontSize: '12px',
    color: '#8b9ab0',
    letterSpacing: '0.06em',
  },
} satisfies Record<string, React.CSSProperties>

const Nav = () => {
  return (
    <nav style={styles.nav}>
      <a href="/" style={styles.logo}>fmcewan.dev</a>
      <ul style={styles.links}>
        <li><a href="/projects" className={styles.link}>projects</a></li>
        <li><a href="/tools" style={styles.link}>tools</a></li>
        <li><a href="/notes" style={styles.link}>notes</a></li>
        <li><a href="/reading" style={styles.link}>reading</a></li>
      </ul>
    </nav>
  )
}

export default Nav
