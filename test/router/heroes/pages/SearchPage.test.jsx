import { fireEvent, getByRole, render,screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { SearchPage } from '../../../../src/heroes/pages/SearchPage';


const mockUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockUseNavigate,
}) );

describe('Pruebas en <SearchPage />', () => { 

    beforeEach( () => jest.clearAllMocks() );
    
    test('debe mostrarse correctamente con valores por defecto', () => { 

        const { container } =render(
            <MemoryRouter>
                <SearchPage/>
            </MemoryRouter>
        );
        expect( container ).toMatchSnapshot();
    });


    test('debe mostrar a Batman y el input con el valor del queryString', () => { 

        render(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <SearchPage/>
            </MemoryRouter>
        );
       
        const input = screen.getByRole('textbox');
        expect( input.value ).toBe('batman');
        
        const imagen = screen.getByRole('img');
        expect( imagen.src ).toContain('/assets/heroes/dc-batman.jpg');

        const  pikachuTest = screen.getByLabelText('pikachu');
        expect( pikachuTest.style.display).toBe('none')
        
    });

    
    test('debe mostrar un error si no se encuentra el hero (batman123)', () => { 
    
            render(
                <MemoryRouter initialEntries={['/search?q=batman123']}>
                    <SearchPage/>
                </MemoryRouter>
            );
           
            const  pikachuTest = screen.getByLabelText('pikachu');
            expect( pikachuTest.style.display ).toBe('');
    
    
    
    });

   
    
    test('debe llamar el navigate a la pantalla nueva', () => { 
        
        const inputValue = 'superman';
        render(
            <MemoryRouter initialEntries={['/search']}>
                <SearchPage/>
            </MemoryRouter>
        );

        const input =  screen.getByRole('textbox');
        fireEvent.change( input, { target: {name: 'searchText', value: inputValue }});

        const form = screen.getByRole('form');
        fireEvent.submit( form );
        screen.debug();
        expect( mockUseNavigate ).toHaveBeenCalledWith(`?q=${ inputValue }`);

    });
        


});