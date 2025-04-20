import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

describe('GeoJSON Viewer App – estado vazio', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.mock('./hooks/useGeoJsonStorage', () => ({
      useGeoJsonStorage: () => ({
        geojsons: {},
        addGeoJson: vi.fn(),
        deleteGeoJson: vi.fn(),
        clearAll: vi.fn(),
      }),
    }));
  });

  it('mostra mensagem de vazio ao iniciar', async () => {
    const { default: App } = await import('./App');
    render(<App />);
    expect(screen.getByText(/Nenhum arquivo carregado/i)).toBeInTheDocument();
  });
});

describe('GeoJSON Viewer App – com dados', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.mock('./hooks/useGeoJsonStorage', () => ({
      useGeoJsonStorage: () => ({
        geojsons: {
          'fake.geojson': {
            type: 'FeatureCollection',
            features: [],
          },
        },
        addGeoJson: vi.fn(),
        deleteGeoJson: vi.fn(),
        clearAll: vi.fn(),
      }),
    }));
  });

  it('permite trocar a visualização para mapa único', async () => {
    const { default: App } = await import('./App');
    render(<App />);
    const mapaBtn = screen.getByRole('button', { name: /Mapa único/i });
    await userEvent.click(mapaBtn);
    expect(mapaBtn).toHaveClass('bg-blue-600');
  });
});