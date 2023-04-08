import React, {useState} from 'react';   // for create-react-app, etc
import { useEffect } from 'react';
import axios from 'axios'
import Thanks from './Thanks';

function StarRating({
    count, 
    value, 
    inactiveColor='#ddd',
    size=24,
    activeColor='#f00', 
    onChange
    }) {

  const stars = Array.from({length: count}, () => '★')


  const handleChange = (value) => {
    onChange(value + 1);
  }

  return (
    <div>
      {stars.map((s, index) => {
        let style = inactiveColor;
        if (index < value) {
          style=activeColor;
        }
        return (
          <span className={"star"}  
            key={index}
            style={{color: style, width:size, height:size, fontSize: size}}
            onClick={()=>handleChange(index)}>{s}</span>
        )
      })}
      {/* {value} */}
    </div>
  )
}


function Rating({outOf, question, count}) {

  const [rating, setRating] = useState(0);
  const [survey, setSurvey] = useState([])
  const [showButton, setShowButton] = useState(true)
  const [track, setTrack ] = useState([])
  const [post, setPost ] = useState(false)
  const [description, setDescription] = useState(null);
  const [showThanks, setShowThanks] = useState(false);

  const thanks =  JSON.parse(localStorage.getItem('survey'));

  useEffect(() => {
   
    setRating(0)
  }, [count])

  useEffect(() => {
    track[count] && track[count].submit === true ? setShowButton(false) : setShowButton(true)
    thanks && setShowThanks(true)
    thanks && setTimeout(() => {
      localStorage.setItem('survey','false')
      localStorage.setItem('welcome','true')
      setShowThanks(false)
    }, 5000);
  })
  
  useEffect(() => {

    let axiosConfig = {
      headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          "Access-Control-Allow-Origin": "*",
      }
    };

    post && axios
    .post(`http://localhost:7000/api/session/add-session`,{
      survey: survey
    },
    axiosConfig
    )
    .then((response) => {
      console.log(response.data);
    }).catch(error => {
      console.log(error);
    });
   
  }, [post])
  
 
  
  const onChangeDescription=(e)=>{
    setDescription(e.target.value)
  }

  const handleChange = (value) => {
    setRating(value);
  }

  const submit=()=>{
    setSurvey([{question: question,rating: rating, description: description, submitted: true},...survey])
    setTrack([...track, { count: count, submit: true }])
  }

  const dataStore=()=>{
    setPost(true)
    localStorage.setItem('survey', true);
  }

  return (<>
           {outOf != null ? <div>
                <StarRating 
                count={outOf}
                size={40}
                value={rating}
                activeColor ={'red'}
                inactiveColor={'#ddd'}
                onChange={handleChange}  
                />
              </div>: 
              <input type='text' onChange={(e)=>onChangeDescription(e)}/>}
             {showButton && <button className='button shift' onClick={()=>submit()}>Submit</button>}
             <button className='button add left' onClick={()=>dataStore()}> Submit Survey</button>

             {thanks && <Thanks/>}
          </>)
}

export default Rating
 

