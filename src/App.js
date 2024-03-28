import { useState } from 'react';
import './App.css';
import Section from './components/Section';
import Header from './components/header';
import AudioPlayer from './components/AudioPlayer';
import AWS from 'aws-sdk';
AWS.config.update({
  accessKeyId: process.env.REACT_APP_CLIENTID,
  secretAccessKey: process.env.REACT_APP_SECRETKEY,
  region: process.env.REACT_APP_REGION
})
const polly = new AWS.Polly()
function App() {
  const [text, setText] = useState('');
  const [audioFile, setAudioFile] = useState();
  const convertTextToSpeech = () => {
    polly.synthesizeSpeech({
      Text: text,
      OutputFormat: 'mp3',
      VoiceId: 'Salli',
    },
    (error, data) => {
      if(error){
        console.log(error);
      }
      else{
        console.log(data);
        setAudioFile(data);
      }
    }
    )
  }
  return (
    <>
    <div className="container">
      <Header />
      <Section text={text} setText={setText} convertTextToSpeech={convertTextToSpeech}/>
    </div>
    <AudioPlayer audioFile={audioFile} />
    </>
  );
}

export default App;
