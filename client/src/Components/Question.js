import React, {useState, useEffect} from 'react'
import Rating from './Rating'

const list = [
    {
        question: 'How satisfied are you with our products?',
        rate: 5,
        description: null
    },
    {
        question: 'How fair are the prices compared to similar retailers?',
        rate: 5,
        description: null
    },
    {
        question: 'How satisfied are you with the value for money of your purchase?',
        rate: 5,
        description: null
    },
    {
        question: 'On a scale of 1-10 how would you recommend us to your friends and family?',
        rate: 10,
        description: null
    },
    {
        question: 'What could we do to improve our service?',
        rate: null
    },
]

const Question = () => {
    const [count, setCount] = useState(0)
    const [data, setData] = useState(list)
    const [question, setQuestion] = useState('')
    const [rating, setRating] = useState(null)
    const [text, setText] = useState(false)


    const prev=()=>{
        count > 0 && setCount(count - 1)
    }
    const next=()=>{
        count < data.length - 1 && setCount(count + 1)
    }
    const addQuestion=()=>{
        setData([...data,{
            question: question,
            rate: rating
        }])

        setText(false)
    }
    const showText=()=>{
        setText(true)
    }

    const questionChange=(e)=>{
        setQuestion(e.target.value)
    }
    const ratingChange=(e)=>{
        setRating(e.target.value)
    }


  return (
   <>
     <div className='upper-container'>
     <button className='button add right' onClick={showText}>Add Question</button>
     {text && <button className='button add right' onClick={addQuestion}>Add</button>}
            {text && <input type="text" onChange={(e)=>questionChange(e)}/>}
            {text && <input type="Number" onChange={(e)=>ratingChange(e)}/>}
           { !text &&<>
            <div className='queue'>{count+1}/{data.length}</div>
            <div className="question-container">{data[count].question}</div> 
            {/* {data[count].rate ? <Rating outOf={data[count].rate} question={data[count].question} count={count}/> : <input type="text"/>} */}
           
             <Rating outOf={data[count].rate} question={data[count].question} count={count}/>
            </>}
           
     </div>
     <div className='lower-container'>
        <button className='button' onClick={prev}>Prev</button>
        <button className='button' onClick={next}>Next</button>
     </div>
   </>
  )
}

export default Question