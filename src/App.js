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
      <button onClick={getRandomQuote}>Random</button>
      { singleQuote && (
        <div>
          <p>{quote}</p>
          <div onClick={getAllQuotes}>
            <p>{author}</p>
            <p>{genre}</p>
          </div>
        </div>
      )}
      { !singleQuote && (
        <div>
          <p>{author}</p>
          {quotes.map((word, key)=>{
            return (<div key={key}> {word.quoteText} </div>)
          })}
          <button onClick={()=>setSingleQuote(true)}>Return</button>
        </div>
      )}
      
    </div>
  );
}

export default App;
