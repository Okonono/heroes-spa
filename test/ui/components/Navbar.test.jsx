import { fireEvent, render, screen} from '@testing-library/react';
import { AuthContext } from '../../../src/auth';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { Navbar } from '../../../src/ui';


const mockUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockUseNavigate,

}) );

describe('Pruebas en el <Navbar/>', () => { 

    const contextValue = {
        logged: true,
        user:{
            name: 'Chechi'
        },
        logout: jest.fn()
    }

    beforeEach( () => jest.clearAllMocks() )

    test('debe mostrar el nombre del usuario', () => {

        render(
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter>
                   <Navbar />
                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect( screen.getByText('Chechi')).toBeTruthy();
     });

     test('debe llamar el logout y navigate al hacer click ', () => {
        
        render(
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter>
                   <Navbar />
                </MemoryRouter>
            </AuthContext.Provider>
        );

        const logoutBtn = screen.getByRole('button');
        fireEvent.click( logoutBtn );
        expect ( contextValue.logout ).toHaveBeenCalled();
        expect ( mockUseNavigate ).toHaveBeenCalledWith("./login", {"replace": true});
    
     });

     test('debe ', () => {
        
     });




});