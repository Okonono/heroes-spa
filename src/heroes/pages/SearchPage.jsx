import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { HeroCard } from '../components';

import { getHerosByName } from '../helpers';
import queryString from 'query-string';


export const SearchPage = () => {

    const navigate = useNavigate();
    const location = useLocation();
    
    const { q = ''} = queryString.parse (location.search);
    const heroes = getHerosByName(q);

    const showSearch = (q.length === 0 ) // YA REGRESA T O F ? false : true;
    const showError = (q.length > 0) && heroes.length === 0;
    const { buscarTexto, onInputChange } = useForm ({
      buscarTexto: q
    });

    

    const enBusquedaSubmit = (e) => {
        e.preventDefault(); //evitar propagacion del formulario - evitar que haga un refresh
        //if(buscarTexto.trim().length <=1 ) return;
        //console.log( { buscarTexto} );
        navigate( `?q=${ buscarTexto.toLowerCase() }` );

}

  return (
    <>
      <h1>Búsquedas</h1>
      <hr/>

    <div className="row">
          <div className="col-5">
              <h4>Buscar</h4>
              <hr />
              <form onSubmit={ enBusquedaSubmit } aria-label='form'>
                <input 
                  type="text"
                  placeholder="Buscar aquí"
                  className="form-control"
                  name="buscarTexto"
                  autoComplete="off"
                  value={ buscarTexto }
                  onChange={ onInputChange }
                />

                <button className="btn btn-outline-info mt-2">
                    Buscar
                </button>
              </form>
           </div>

           <div className="col-7">
                <h4>Resultados</h4>
                <hr/>

                {/* {
                  ( q=== '')
                  ? <div className="alert alert-primary">Buscar un héroe</div>
                  :  (heroes.length === 0) 
                  && <div className="alert alert-danger">No hay resultados con <b> { q } </b> </div>               
                } */}

                <div className="alert alert-primary animate__animated animate__fadeIn" 
                    style={ { display: showSearch ? '' : 'none' }}
                  >Buscar un héroe
                </div>

                <div aria-label='pikachu' className="alert alert-danger animate__animated animate__fadeIn" 
                    style={ { display: showError ? '' : 'none'  } }
                  >No hay resultados con <b> { q } </b> 
                  
                </div>



                {
                  heroes.map ( hero =>(
                    <HeroCard key={ hero.id } { ...hero }/>
                  ))
                }


          </div>

      </div>
    </>
  )
}
