import { render, screen } from "@testing-library/react";
import { GifGrid } from "../../src/components/GifGrid";
import { useFetchGifs } from "../../src/hooks/useFetchGifs";

jest.mock( '../../src/hooks/useFetchGifs' );

describe('Pruebas en <GifGrid />', () => {

  const category = 'Dragon Ball';

  test('Debe de mostrar el loading inicialmente', () => {

    useFetchGifs.mockReturnValue({
      images: [],
      isLoading: true
    });

    render( <GifGrid category={ category }/> );

    expect( screen.getByText( 'Cargando...' ) );
    expect( screen.getByText( category ) );
  });

  test('Debe de mostrar items cuando se cargan las imágenes desde useFetchGifs', () => {

    const gifs = [
      {
        id: 'ABC',
        title: 'Dragon Ball',
        url: 'https://localhost/dragonball'
      },
      {
        id: 'DEF',
        title: 'Detective Conan',
        url: 'https://localhost/detectiveconan'
      },
    ];

    useFetchGifs.mockReturnValue({
      images: gifs,
      isLoading: false
    });

    render( <GifGrid category={ category }/> );

    expect( screen.getAllByRole( 'img' ).length ).toBe( 2 );

  });
});