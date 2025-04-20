import { useRef } from 'react';
import toast from 'react-hot-toast';

interface Props {
  onUpload: (name: string, data: GeoJSON.GeoJsonObject) => void;
}

export function GeoJsonUploader({ onUpload }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const json = JSON.parse(reader.result as string);
        onUpload(file.name, json);
        toast.success(`Arquivo "${file.name}" carregado com sucesso`);
      } catch (e) {
        toast.error(`Erro ao ler o arquivo: ${(e as Error).message}`);
      }
    };

    reader.readAsText(file);
  }

  return (
    <div className="mb-4">
      <input
        type="file"
        accept=".geojson,application/json"
        ref={fileInputRef}
        onChange={handleFile}
        className="block"
      />
    </div>
  );
}