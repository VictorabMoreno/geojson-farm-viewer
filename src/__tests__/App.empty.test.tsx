import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';

vi.mock('../../hooks/useGeoJsonStorage', () => ({
  useGeoJsonStorage: () => ({
    geojsons: {},
    addGeoJson: vi.fn(),
    deleteGeoJson: vi.fn(),
    clearAll: vi.fn(),
  }),
}));

import App from '../../App';

describe('GeoJSON Viewer - vazio', () => {
  it('mostra mensagem de vazio ao iniciar', () => {
    render(<App />);
    expect(screen.getByText(/Nenhum arquivo carregado/i)).toBeInTheDocument();
  });
});