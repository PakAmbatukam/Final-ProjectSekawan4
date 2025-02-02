import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom'


const TitleCards = ({title, category}) => {

  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0OWJiMjdlODI3MDc1YjMyZTAzMDVmZGRlOTFmODRlYyIsIm5iZiI6MTcyOTgzNTc3Ni4xMjIwMywic3ViIjoiNjcwNDgxYjYyMjJlYWQxZWRhYmZmN2E5Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.r756mIJAgwPqCrbBivvgFXsus5T_UxxdJeSuAXVyZIg'
    }
  };

  const handleWheel = (event)=>{
  event.preventDefault();
  cardsRef.current.scrollLeft += event.deltaY;
  }

 useEffect(()=>{

  fetch(`https://api.themoviedb.org/3/movie/${category?category :"now_playing"}?language=en-US&page=1`, options)
    .then(response => response.json())
    .then(response => setApiData(response.results))
    .catch(err => console.error(err));

  cardsRef.current.addEventListener ('wheel', handleWheel);
  },[]) 
  return (
    <div className='title-cards'>
      <h2>{title?title:"Popular On Netflix"}</h2>
      <div className="card-list" ref={cardsRef}> 
        {apiData.map((card, index)=>{
          return <Link to={`/player/${card.id}`}><div className="card" key={index}>
                  <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
                   <p>{card.original_title}</p>
                </div>
                </Link>
        })}
      </div>
    </div>
  )
}

export default TitleCards
