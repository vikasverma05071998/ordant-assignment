import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import './movies1.css'
export default function Description() {

  const [data, setData] = useState([])
  const [persons, setPersons] = useState([])
  let { id } = useParams()

  const imgs = './stars/'

  useEffect(() => {
    let fetchData = async () => {
      let response = await axios.get(`https://api.tvmaze.com/shows/${id}`)

      console.log(response.data, 'show')
      setData(response.data)
    }
    fetchData()
  }, [])


  useEffect(() => {
    let person = async () => {
      let respnsesa = await axios.get(`https://api.tvmaze.com/shows/${id}?embed=cast`)
      console.log(respnsesa.data, 'bvcftgvj')
      setPersons(respnsesa.data)

    }
    person()
  },[])

  return (
    <div className='containors'>
      <h1 id='h1'>TV Bland</h1>
      <div>
        <div className='detailcard'>
          <img src={data?.image?.medium} className='blendimage'/>
          <div className='ratsection'>
            <img id='ratings' src={imgs.concat(`${String(Math.floor(data?.rating?.average / 2))}.jpg`)} alt=''
            /> <p className='number'>{data?.rating?.average / 2}</p>
            <h1 className='moviename'>{data.name}</h1>
          </div>
          <div className='summary'> 
            <p style={{ marginBottom: '20px' }} id='text' dangerouslySetInnerHTML={{__html:data.summary}}/>
          </div>
        </div>
        <div className='crew'>
          <h2 className='shows'>Show info</h2>
          <table className='table' id='info'>
            <tbody>
              <tr>
                <td> <p className='para'>Streamed on </p></td>
                <td>{data?.network?.name}</td>
              </tr>
              <tr>
                <td> <p className='para'>Schedule </p></td>
                <td>{data?.schedule?.days}</td>
              </tr>
              <tr>
                <td> <p className='para'>Status</p></td>
                <td>{data?.status}</td>
              </tr>
              <tr>
                <td><p className='para'>Genres </p> </td>
                <td> {data?.genres}</td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
      <div className='starring' id='center'>
        <div className='starr'>
          <h2 style={{ fontSize: '50px', marginLeft: '50px' }}>Starring</h2>
          {persons?._embedded?.cast?.map((item, index) => {
            return (
              <div key={index} className='inner'>

                <img src={item?.person?.image?.medium} className='stars' />
                <p className='fonts'>{item?.person?.name}</p>
                <p className='fonts'>as</p>
                <p className='fonts'>{item?.character?.name}</p>

              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
