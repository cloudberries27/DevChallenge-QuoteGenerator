import React from 'react';
import './App.css';

function App() {
  const [quote, setQuote] = React.useState("")
  const [author, setAuthor] = React.useState("")
  const [genre, setGenre] = React.useState("")
  const [quotes, setQuotes] = React.useState([])
  const [singleQuote, setSingleQuote] = React.useState(true)
  React.useEffect(()=>{
    getRandomQuote();
  }, [])

  const getRandomQuote = async () =>{
    await fetch('https://quote-garden.herokuapp.com/api/v3/quotes/random')
    .then(response => response.json())
    .then(result => {
      setQuote(result.data[0].quoteText)
      setAuthor(result.data[0].quoteAuthor)
      setGenre(result.data[0].quoteGenre)
      setSingleQuote(true)
      setQuotes([])
    });
  }

  const getAllQuotes = async () => {
    await fetch(`https://quote-garden.herokuapp.com/api/v3/quotes?author=${author}`)
    .then(response => response.json())
    .then(result => {
      setQuotes(result.data)
      setSingleQuote(false)
    });
  }
  return (
    <div className="App">
      <header>
        <button className="random-button" onClick={getRandomQuote}>
          random <span class="material-icons">refresh</span>
        </button>
      </header>
      { singleQuote && (
        <div className='singleQuote'>
          <h1>"{quote}"</h1>
          <div className='getAllButton' onClick={getAllQuotes}>
            <div>
              <p className='author'>{author}</p>
              <p className='genre'>{genre}</p>
            </div>
            <span className='material-icons'>east</span>
          </div>
        </div>
      )}
      { !singleQuote && (
        <div className='allQuotes'>
          <h1><span onClick={()=>setSingleQuote(true)} className='material-icons not-vertical'>west</span>{author}</h1>
          {quotes.map((word, key)=>{
            return (
              <div key={key}> 
                "{word.quoteText}" 
              </div>
            )
          })}
        </div>
      )}
      
    </div>
  );
}

export default App;
