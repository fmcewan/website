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
  copyright: {
    fontSize: '11px',
    color: '#8b9ab0',
    fontWeight: 300,
    letterSpacing: '0.04em',
  },
} satisfies Record<string, React.CSSProperties>

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <span style={styles.motto}>- proof by construction</span>
      <span style={styles.copyright}>© 2025 Fraser McEwan</span>
    </footer>
  )
}

export default Footer
