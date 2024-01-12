import Demo from './components/Demo'
import Hero from './components/Hero'
import './App.css';

const App = () => {
  return (
    <>
        <main className='main'>
          <div className='gradient'/>
        </main>
        <div className='app'>
          <Hero/>
          <Demo/>
        </div>
    </>
  )
}

export default App