import React, { useEffect, useState } from 'react'
import './movie.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
export default function Movie() {
  const [data, setData] = useState([])
  const [curr, setCurr] = useState(1)
  const [homePage] = useState(8)
  // const [currentPage, setCurrentPage] = useState(1);
  // const [postPerPage] = useState(8);
  const numofPages = Math.ceil(data.length / homePage);
  const pages = [...Array(numofPages + 1).keys()].slice(1);
  const lastPageIndex = curr * homePage;
  const firstPageIndex = lastPageIndex - homePage;
  const currentPost = data.slice(firstPageIndex, lastPageIndex);
  const previousHandler = () => {
    if (curr !== 1) {
      setCurr(curr - 1);
    }
  }
  const nextHandler = () => {
    if (curr !== numofPages) {
      setCurr(curr + 1);
    }
  }

  useEffect(() => {
    let fetchData = async () => {
      let response = await axios.get('https://api.tvmaze.com/shows')
      console.log(response.data)
      setData(response.data)

    }
    fetchData()
  }, [])

  const imgs = './stars/'
  return (
    <div>
      <marquee>Book Your Show For Avtar 2 Full Movie on This App </marquee>
      <h1 style={{ textAlign: 'center', margin: '0px', padding: '4px', color: 'green' }}> Welcome  To Tv Bland Enjoy With Your favroute movie  </h1>
      <div>
        <img src='https://assets.gqindia.com/photos/6390868c3ee0cb3966cf9950/master/pass/worlds-most-profitable-movie-franchises.jpg' className='headimage' />
      </div>
      <div className='movie'>
        {currentPost.map((val, index) => {
          return (
            <div key={index} className='containor'>
              <Link to={`/${val.id}`}><img src={val.image.medium} alt="image" className='card'></img></Link><br />
              {val.rating.average / 2}<img id='rating' src={imgs.concat(`${String(Math.floor(val.rating.average / 2))}.jpg`)} alt='' /><br />
              <p className='name'>{val.name}</p>
            </div>
          )
        })}
      </div>
      <div>
        <div className='butt'>
          <button className='butt1' onClick={previousHandler} ><span>Prev</span></button>
          <p style={{ color: "transparent" }} className='number'>{pages.map(page => <span key={page} className={`${curr === page ? "active" : ""}`} onClick={() => setCurr(page)}>{`${page} | `}</span>)}</p>
          <button className="butt1" onClick={nextHandler}><span>Next</span></button>
        </div>

      </div>
    </div>
  )
}
