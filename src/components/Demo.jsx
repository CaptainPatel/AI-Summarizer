import { useState, useEffect } from 'react'
import { copy, linkIcon, loader, tick } from '../assets'
import { useLazyGetSummaryQuery } from '../services/article';

const Demo = () => {
  const [article, setArticle] = useState({
    url: "",
    summary: ""
  });
  const [allArticle, setAllArticle] = useState([]);
  const [copied, setCopied] = useState("")

  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  useEffect(() => {
    const articleFromLocalStorage = JSON.parse(localStorage.getItem('articles'));
    if (articleFromLocalStorage) setAllArticle(articleFromLocalStorage);
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await getSummary({ articleUrl: article.url });

    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary }
      const updateAllArticle = [newArticle, ...allArticle];

      setArticle(newArticle);
      // to keep it in the history
      setAllArticle(updateAllArticle);
      localStorage.setItem("articles", JSON.stringify(updateAllArticle));
    } else if (error) {
      console.log("Error:", error);
    }
  }

  const handleCopy = (copyUrl) => {
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => setCopied(false), 2000);
  }
  return (
    <section className='mt-16 w-full max-w-xl'>
      {/* search */}
      <div className='flex flex-col w-full gap-2'>
        <form action="" className='relative flex justify-center items-center' onSubmit={handleSubmit}>
          <img src={linkIcon} className='absolute left-0 my-2 ml-3 w-5' alt="link_icon" />

          <input type="url" required placeholder='Enter Url' value={article.url} onChange={(e) => setArticle({ ...article, url: e.target.value })} className='url_input peer' />
          <button type='submit' onClick={handleSubmit} className='submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700'>O</button>
        </form>
        {/* URL history */}
      </div>
      <div className='flex flex-col gap-1 max-h-60 overflow-y-auto'>
        {
          allArticle.map((item, index) => (
            <div
              key={`link-${index}`}
              onClick={() => setArticle(item)}
              className='link_card'
            >
              <div className='copy_btn' onClick={() => handleCopy(item.url)}>
                <img src={copied === item.url ? tick : copy} alt="copy_icon" className='w-[40%] h-[40%] object-contain' />
              </div>
              <p className='flex-1 font-satoshi text-blue-700 font-medium text-sm turncate'>{item.url}</p>
            </div>
          )
          )
        }
      </div>
      {/* Display Results */}
      <div className='my-10 max-w-full flex justify-center items-center'>
        {
          isFetching ? (
            <img src={loader} alt="loader" className='w-20 h-20 object-contain ' />
          ) : error ? (
            <p className='font-inter font-bold text-black text-center'>Ohoo, Something went wronggg
              <br />
              <span className='font-satoshi font-normal text-gray-700'>
                {error?.data?.error}
              </span> </p>
          ) : (
            article.summary && (
              <div className='flex flex-col gap-3'>
                <h2 className='font-satoshi font-bold text-gray-600 text-xl'>
                  Article <span className='blue_gradient'>Summary</span>
                </h2>
                <div className='summary_box'>
                  <p className='font-inter font-medium text-sm text-gray-700'>{article.summary}</p>
                </div>
              </div>
            )
          )
        }

      </div>
    </section>
  )
}

export default Demo