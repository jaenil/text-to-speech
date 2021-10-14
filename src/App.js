import React,{useEffect ,useState} from 'react'

const SpeechRecognition =  window.webkitSpeechRecognition || window.SpeechRecognition ;
const mic = new SpeechRecognition();

mic.continous = true ;
mic.onresult = console.log ;
mic.lang = 'en-US' ;


//Additional Date feature
var today = new Date();
var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();

const App = () => {
  const [start, setStart] = useState(false) ;
  const [reply, setReply] = useState('')
  //const dictionary = useState([])
  
  useEffect(() => {
   handleFunction() ;
   // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start]) 
  
  const handleFunction = () => {
    if (start === false) {
      mic.stop() ;
      console.log('mic has stopped')
    } else{ 
      mic.start() ;
    }

    mic.onresult = (event) => {
      setReply(event.results[0][0].transcript) 
     // dictionary.unshift(reply) 
      //setReply('')
      console.log(reply)
    }

    mic.onstart = () =>{
      console.log('mic has started now')
    }

    mic.onnomatch = () => {
      setReply('No possible matches found ')
    }

    mic.onerror = event => {
      console.log(event.error) 
    }
  }

  const toggleFunction = (state) => {
    setStart(!state) ; 
  }
  return (
    <>
      <h1>Speech to Text application</h1>
      <hr></hr>
      <div>
        <button onClick={() => toggleFunction(start)}>Start/Stop</button>
        <div>
         {reply}
         {/*
          <ul>
          {
            dictionary.map(item =>(
              <li> {item} {console.log(item)} </li>
            ))
          }
          </ul>
          */} 
         
        </div>
      </div> 
      <hr></hr>
      <p className='footer_'>Built by Jaenil Parekh</p>
      <div>
         {date}
      </div>
    </>
  )
}

export default App
