import React,{useEffect ,useState} from 'react'

const SpeechRecognition =  window.webkitSpeechRecognition || window.SpeechRecognition ;

const App = () => {
  const [start, setStart] = useState(false) ;
  
  /*useEffect(() => {
    const recognition = new SpeechRecognition();
    recognition.onresult = console.log ;
    recognition.start() ;
  }, []) */

  const toggleFunction = (state) => {
    setStart(!state) ;
  }
  return (
    <>
      <h1>Speech to Text application</h1>
      <hr></hr>
      <div>
        <button>Start/Stop</button>
        <p>results here</p>

      </div> 
      <hr></hr>
      <p>Built by Jaenil Parekh</p>
    </>
  )
}

export default App
