import { renderHook, waitFor } from "@testing-library/react";
import { useFetchGifs } from "../../src/hooks/useFetchGifs";

describe('Pruebas en el hook userFetchGifs', () => {

  test('Debe regeesar el estado inicial', () => {

    const { result } = renderHook( () => useFetchGifs( 'Dragon Ball' ) );
    const { images, isLoading } = result.current;

    expect( images.length ).toBe( 0 );
    expect( isLoading ).toBeTruthy();

  });

  test('Debe retornar un arreglo de imágenes y isLoading en false', async () => {

    const { result } = renderHook( () => useFetchGifs( 'Dragon Ball' ) );
    
    await waitFor(
      () => expect( result.current.images.length ).toBeGreaterThan( 0 ),
      {
        timeout: 2000
      }
    );

    const { images, isLoading } = result.current;

    expect( images.length ).toBeGreaterThan( 0 );
    expect( isLoading ).toBeFalsy();
  });


})