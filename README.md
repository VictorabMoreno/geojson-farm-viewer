# 🗺️ GeoJSON Farm Viewer

**GeoJSON Farm Viewer** é um visualizador interativo e moderno para arquivos `.geojson`, com foco em aplicações agrícolas e geoespaciais. Este projeto foi criado para demonstrar domínio em tecnologias web modernas, arquitetura de front-end, uso de mapas, armazenamento offline e PWA.

---

## 🌟 Motivação

Trabalho com projetos que lidam com dados geoespaciais sensíveis e, por isso, resolvi transformar parte desse conhecimento em um repositório público para:

- Demonstrar boas práticas de front-end com React + Tailwind + Leaflet
- Aplicar arquitetura realista e escalável
- Criar um case completo com visualização de dados geográficos
- Compartilhar parte da estrutura utilizada em apps reais

---

## 💡 O que esse projeto entrega

- Upload de arquivos `.geojson` com preview no mapa
- Importação via **URL externa**
- Visualização combinada de múltiplos arquivos no **mapa único**
- Preview textual de propriedades de cada feature
- Download e remoção de arquivos
- Visualização em **modal raw** dos dados brutos
- Modo escuro com persistência local
- Armazenamento offline com **IndexedDB**
- Aplicação **instalável (PWA)** com suporte offline real
- Testes automatizados com **Vitest + Testing Library**
- Arquitetura organizada: `components/`, `hooks/`, `storage/`, `map/`

---

## 🧠 Stack principal

- **React** + **Vite** + **TypeScript**
- **TailwindCSS** para UI responsiva
- **Leaflet** + **react-leaflet** para renderização geoespacial
- **idb-keyval** para persistência offline com IndexedDB
- **Vitest + React Testing Library** para testes
- **vite-plugin-pwa** para transformar o app em um PWA real

---

## 🚀 Instalação

```bash
git clone https://github.com/seu-user/geojson-farm-viewer.git
cd geojson-farm-viewer
npm install
npm run dev
```

---

## 🧪 Testes

```bash
npm run test
```

---


## 📲 PWA Instalável

Este projeto pode ser instalado no celular ou desktop.  
✔️ Funciona offline  
✔️ Cache automático  
✔️ Adicionável à tela inicial

---

## 😎 Propósito

Esse repositório é mantido por [@victorabmoreno](https://github.com/VictorabMoreno) como forma de:

- Demonstrar domínio técnico com tecnologias modernas
- Compartilhar um visualizador funcional e leve para uso agrícola
- Expor boas práticas de componentização, testes e organização
- Criar um case real de **frontend técnico com foco geoespacial**

---

Fique à vontade para clonar, estudar, adaptar ou contribuir ❤️