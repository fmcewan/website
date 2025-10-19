import Navbar from './components/Navbar.tsx'
import Hero from './components/Hero.tsx'
import './styles.css';

export default function App() {
  return (
    <main className='flex min-h-screen flex-col border-4 border-red-500'>
      <Navbar />
      <Hero />
    </main>
  );
}
