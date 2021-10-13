import React , {useState,useEffect} from 'react' ;
import './App.css';


const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition ;
const mic = new SpeechRecognition() ;

mic.continous = true ;
mic.interimResults = true ;
mic.lang = 'en-US' ;

function App() {
  const [isListening ,setIsListening] = useState(false)
  const [note, setNote] = useState(null) ;
  const [savedNotes, setSavedNotes] = useState([]);

  useEffect(() => {
    handleListen() 
  }, [isListening])

  const handleListen = () => {
    if(isListening) {
      mic.start()
      mic.onend = () => {
        console.log('continue ...')  
        mic.start ()
      }
    }else {
      mic.stop()
      mic.onend = () => {
        console.log('Stopped mic on click ')
      }
    }
    mic.onstart = () => {
      console.log('Mic is on')
    }

    mic.onresult = event =>{
      const transcript = Array.from(event.results)
        .map(result => result[0])
        .map(results => results.transcript)
        .join('')
      console.log(transcript)
      setNote(transcript)
      mic.onerror = event => {
        console.log(event.error)
      }
    }
  }

  const handleSaveNote = () => {
    setSavedNotes([...savedNotes , note])
    setNote('')
  }
  return (
    <>
      <h1>Voice Notes </h1>
      <div className='container'>
        <div className='box'>
          <h2>Current Note</h2>
          {isListening ? <span>	🎙️</span> : <span>🚫</span>}
          <button onClick= {handleSaveNote} disabled={!note}>Save Note</button>
          <button onClick={() => setIsListening(prevState => !prevState)}>
            Start/Stop
          </button>
          <p>
            {note}
          </p>
        </div>
        <div className='box'>
          <h2>Notes</h2>
          {savedNotes.map(n => (
            <p key={n}>{n}</p>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
