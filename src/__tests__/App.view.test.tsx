import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

vi.mock('../../hooks/useGeoJsonStorage', () => ({
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

import App from '../../App';

describe('GeoJSON Viewer - troca de visualização', () => {
  it('permite trocar a visualização para mapa único', async () => {
    render(<App />);
    const mapaBtn = screen.getByRole('button', { name: /Mapa único/i });
    await userEvent.click(mapaBtn);
    expect(mapaBtn).toHaveClass('bg-blue-600');
  });
});