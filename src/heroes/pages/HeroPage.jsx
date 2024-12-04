import { Navigate, useParams, useNavigate } from "react-router-dom"
import { getHeroById } from "../helpers";
import { useMemo } from "react";


export const HeroPage = () => {

  const { heroId }  = useParams();
  
  const hero =  useMemo( () => getHeroById(heroId), [heroId] );

  const pikachu = useNavigate();
  

  const onNavigateBack = () =>  {
    return pikachu(-1)
  }

  if ( !hero ){
    return <Navigate to="/marvel" />
  }

  return (
    <div className="row mt-5 animate__animated animate__fadeInLeft">
      <div className="col-4">
         <img 
            src={`/assets/heroes/${ heroId }.jpg`} 
            alt={ hero.superhero }
            className="img-thumbnail "
          />
      </div>

      <div className="col-8">
        <h3 className="animate__animated animate__pulse" >{ hero.superhero }</h3>
        <ul className="list-group list-group-flush">
            <li className="list-group-item"><b>Alter ego:</b> {hero.alter_ego} </li>
            <li className="list-group-item"><b>Publisher:</b> {hero.publisher} </li>
            <li className="list-group-item"><b>Primera aparición:</b> {hero.first_appearance} </li>
        </ul>

        <h5 className="mt-3">Personajes</h5>
        <p> { hero.characters } </p>

        <button 
        className="btn btn-outline-info"
        onClick={ onNavigateBack }
        >Regresar</button>

      </div>
    </div>
  )
}
