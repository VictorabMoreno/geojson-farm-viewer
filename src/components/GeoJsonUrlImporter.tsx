import { useState } from 'react';
import toast from 'react-hot-toast';

interface Props {
  onImport: (name: string, data: GeoJSON.GeoJsonObject) => void;
}

export function GeoJsonUrlImporter({ onImport }: Props) {
  const [url, setUrl] = useState('');

  async function handleImport() {
    if (!url) return toast.error('Informe uma URL válida');

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Erro: ${res.status}`);

      const json = await res.json();
      if (!json || typeof json !== 'object' || !json.type) {
        throw new Error('JSON inválido');
      }

      const name = url.split('/').pop() || 'arquivo.geojson';
      onImport(name, json);
      toast.success(`Arquivo ${name} importado com sucesso`);
      setUrl('');
    } catch (e) {
      toast.error(`Falha ao importar: ${(e as Error).message}`);
    }
  }

  return (
    <div className="mb-6 flex gap-2">
      <input
        type="text"
        placeholder="https://meusdados.com/arquivo.geojson"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="flex-1 px-3 py-2 rounded border dark:bg-gray-800 dark:text-white"
      />
      <button
        onClick={handleImport}
        className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700 text-sm"
      >
        Importar URL
      </button>
    </div>
  );
}