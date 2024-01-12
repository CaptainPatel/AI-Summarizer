import { logo } from '../assets'

const Hero = () => {
  return (
    <header className='w-full flex justify-center items-center flex-col'>
      <nav className='flex justify-between items-center w-full mb-10 pt-3'>
        <img src={logo} alt="logo" className='w-28 object-contain' />
        <button onClick={() => { window.open(`https://github.com/CaptainPatel`) }} className='black_btn'>
          Github
        </button>
      </nav>

      <h1 className='head_text'>
        Summarize article with <br className='max-md:hidden' />
        <span className='orange_gradient'>
          OpenAI GPT-4
        </span>
      </h1>
      <h2 className='desc'>
        Simplfy your reading with summize , an
        AI powered article summarizer that is built
        upon OpenAIs GPT-4 Model.
      </h2>
    </header>
  )
}

export default Hero