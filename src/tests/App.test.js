import React from 'react';
import { render, screen } from '@testing-library/react';
import FilterProvider from '../context/FilterProvider';
import Header from '../components/Header';
import { filterEqual, filterGreaterThen, filterLessThen, info, filterList } from './mock/mockPlanetsResults'
import verify from '../Functions/verify';
import Table from '../components/Table';
import App from '../App';
import userEvent from '@testing-library/user-event';
import FilterContext from '../context/FilterContext';


describe('Componente Header e a funcionalidade dos filtros', () => {

  it('Verifica se os elementos de input são renderizados corretamente', async () => {
    render(<FilterProvider>
      <Header />
    </FilterProvider>);
  
    expect(screen.getByTestId('name-filter')).toBeInTheDocument();
    expect(screen.getByTestId('value-filter')).toBeInTheDocument();
    expect(screen.getByTestId('column-filter')).toBeInTheDocument();
    expect(screen.getByTestId('comparison-filter')).toBeInTheDocument();
    expect(screen.getByTestId('button-remove-filters')).toBeInTheDocument();
    expect(screen.getByTestId('button-filter')).toBeInTheDocument();
    
  });
  
  it('Verifica se uma função onChange é chamada ao digitar algo no input de texto e a função onClick é chamada ao apertar o botão de filtro', () => {
    const mockOnChange = jest.fn();
    const mockOnClick = jest.fn();
    const { getByTestId } = render(
      <FilterContext.Provider value={ {filterList, onChange: mockOnChange, onClick: mockOnClick} }
      ><Header /> </FilterContext.Provider>);
    const nameFilterInput = getByTestId('name-filter');
    const buttonFilter = getByTestId('button-filter');
  
    userEvent.type(nameFilterInput, 'o');
  
    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenCalledWith(nameFilterInput);
  
    userEvent.click(buttonFilter);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
  
  it('Verifica se uma função onChange é chamada ao digitar algo no input de texto e a função onClick é chamada ao apertar o botão de filtro', () => {
    const mockOnClick = jest.fn();
    const mocksetInfoFiltered = jest.fn();
  
    const { getByTestId } = render(
      <FilterContext.Provider value={ {filterList,
        onClick: mockOnClick,
         setInfoFiltered: mocksetInfoFiltered
      } }
      ><Table /> </FilterContext.Provider>);
  
  });  
});


describe('Componente Table', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        results: info,
      }),
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('mensagem de carregando', async () => {
    render(
      <FilterProvider>
      <Table />
      </FilterProvider>
    );
    expect(await screen.findByText('Carregando...')).toBeInTheDocument();
  });

  it('componentes da tabela', async () => {
    render(
      <FilterProvider>
      <Table />
      </FilterProvider>
    );
    expect(await screen.findByText('Tatooine')).toBeInTheDocument();
    expect(screen.getByText('Alderaan')).toBeInTheDocument();

  });
});

it('Testa a função verify', () => {

  const resultExpected =     [
    {
      name: 'Tatooine',
      rotation_period: '23',
      orbital_period: '304',
      diameter: '10465',
      climate: 'arid',
      gravity: '1 standard',
      terrain: 'desert',
      surface_water: '1',
      population: '200000',
      films: [
        'https://swapi.dev/api/films/1/',
        'https://swapi.dev/api/films/3/',
        'https://swapi.dev/api/films/4/',
        'https://swapi.dev/api/films/5/',
        'https://swapi.dev/api/films/6/'
      ],
      created: '2014-12-09T13:50:49.641000Z',
      edited: '2014-12-20T20:58:18.411000Z',
      url: 'https://swapi.dev/api/planets/1/'
    }
  ];

expect(verify(info, filterEqual)).toEqual(resultExpected);
expect(verify(info, [])).toEqual(info);
expect(verify(info, filterLessThen)).toEqual([
      {
        name: 'Bespin',
        rotation_period: '12',
        orbital_period: '5110',
        diameter: '118000',
        climate: 'temperate',
        gravity: '1.5 (surface), 1 standard (Cloud City)',
        terrain: 'gas giant',
        surface_water: '0',
        population: '6000000',
        films: [ 'https://swapi.dev/api/films/2/' ],
        created: '2014-12-10T11:43:55.240000Z',
        edited: '2014-12-20T20:58:18.427000Z',
        url: 'https://swapi.dev/api/planets/6/'
      }
    ]);

expect(verify(info, filterGreaterThen)).toEqual([
      {
        name: 'Alderaan',
        rotation_period: '24',
        orbital_period: '364',
        diameter: '12500',
        climate: 'temperate',
        gravity: '1 standard',
        terrain: 'grasslands, mountains',
        surface_water: '40',
        population: '2000000000',
        films: [
          'https://swapi.dev/api/films/1/',
          'https://swapi.dev/api/films/6/'
        ],
        created: '2014-12-10T11:35:48.479000Z',
        edited: '2014-12-20T20:58:18.420000Z',
        url: 'https://swapi.dev/api/planets/2/'
      },
      {
        name: 'Yavin IV',
        rotation_period: '24',
        orbital_period: '4818',
        diameter: '10200',
        climate: 'temperate, tropical',
        gravity: '1 standard',
        terrain: 'jungle, rainforests',
        surface_water: '8',
        population: '1000',
        films: [ 'https://swapi.dev/api/films/1/' ],
        created: '2014-12-10T11:37:19.144000Z',
        edited: '2014-12-20T20:58:18.421000Z',
        url: 'https://swapi.dev/api/planets/3/'
      },
      {
        name: 'Hoth',
        rotation_period: '23',
        orbital_period: '549',
        diameter: '7200',
        climate: 'frozen',
        gravity: '1.1 standard',
        terrain: 'tundra, ice caves, mountain ranges',
        surface_water: '100',
        population: 'unknown',
        films: [ 'https://swapi.dev/api/films/2/' ],
        created: '2014-12-10T11:39:13.934000Z',
        edited: '2014-12-20T20:58:18.423000Z',
        url: 'https://swapi.dev/api/planets/4/'
      },
      {
        name: 'Dagobah',
        rotation_period: '23',
        orbital_period: '341',
        diameter: '8900',
        climate: 'murky',
        gravity: 'N/A',
        terrain: 'swamp, jungles',
        surface_water: '8',
        population: 'unknown',
        films: [
          'https://swapi.dev/api/films/2/',
          'https://swapi.dev/api/films/3/',
          'https://swapi.dev/api/films/6/'
        ],
        created: '2014-12-10T11:42:22.590000Z',
        edited: '2014-12-20T20:58:18.425000Z',
        url: 'https://swapi.dev/api/planets/5/'
      },
      {
        name: 'Endor',
        rotation_period: '18',
        orbital_period: '402',
        diameter: '4900',
        climate: 'temperate',
        gravity: '0.85 standard',
        terrain: 'forests, mountains, lakes',
        surface_water: '8',
        population: '30000000',
        films: [ 'https://swapi.dev/api/films/3/' ],
        created: '2014-12-10T11:50:29.349000Z',
        edited: '2014-12-20T20:58:18.429000Z',
        url: 'https://swapi.dev/api/planets/7/'
      },
      {
        name: 'Naboo',
        rotation_period: '26',
        orbital_period: '312',
        diameter: '12120',
        climate: 'temperate',
        gravity: '1 standard',
        terrain: 'grassy hills, swamps, forests, mountains',
        surface_water: '12',
        population: '4500000000',
        films: [
          'https://swapi.dev/api/films/3/',
          'https://swapi.dev/api/films/4/',
          'https://swapi.dev/api/films/5/',
          'https://swapi.dev/api/films/6/'
        ],
        created: '2014-12-10T11:52:31.066000Z',
        edited: '2014-12-20T20:58:18.430000Z',
        url: 'https://swapi.dev/api/planets/8/'
      },
      {
        name: 'Kamino',
        rotation_period: '27',
        orbital_period: '463',
        diameter: '19720',
        climate: 'temperate',
        gravity: '1 standard',
        terrain: 'ocean',
        surface_water: '100',
        population: '1000000000',
        films: [ 'https://swapi.dev/api/films/5/' ],
        created: '2014-12-10T12:45:06.577000Z',
        edited: '2014-12-20T20:58:18.434000Z',
        url: 'https://swapi.dev/api/planets/10/'
      }
    ]);
});