const styles = {
  footer: {
    marginTop: '4rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  motto: {
    fontSize: '11px',
    color: '#8b9ab0',
    fontStyle: 'italic',
    fontWeight: 300,
    letterSpacing: '0.02em',
  },
  links: {
    display: 'flex',
    gap: '1.25rem',
  },
  link: {
    fontSize: '11px',
    color: '#8b9ab0',
    letterSpacing: '0.04em',
  },
} satisfies Record<string, React.CSSProperties>

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <span style={styles.motto}>compiling...</span>
      <div style={styles.links}>
        <a
            href="https://github.com/fmcewan"
            style={styles.link}
            target="_blank"
            rel="noopener noreferrer"
        >
          GitHub
        </a>
        <a  
            href="https://www.linkedin.com/in/fraser-mcewan-517186253/"
            style={styles.link}
            target="_blank"
            rel="noopener noreferrer"
        >
          LinkedIn
        </a>
      </div>
    </footer>
  )
}

export default Footer
