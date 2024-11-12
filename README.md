# Recipes Explorer - Teste Técnico Kernel System

Este projeto é uma aplicação de receitas culinárias desenvolvida com Vite, React e TypeScript. A aplicação permite pesquisar receitas, explorar categorias, salvar receitas favoritas e alternar entre temas claro e escuro.

## Índice

- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias)
- [Dependências](#dependências)
- [Estrutura de Pastas](#estrutura-de-pastas)
- [Configuração do Projeto](#configuração-do-projeto)
- [Instruções de Uso](#instruções-de-uso)
- [Componentes e Contextos](#componentes-e-contextos)
- [API Utilizada](#api-utilizada)

## Funcionalidades

- Pesquisar receitas por nome ou categoria.
- Explorar categorias de receitas.
- Ver detalhes da receita, incluindo ingredientes e modo de preparo.
- Salvar receitas favoritas em uma seção dedicada.
- Alternar entre temas claro e escuro.

## Tecnologias

- **Vite** - Empacotador rápido para desenvolvimento web.
- **React** - Biblioteca JavaScript para construção de interfaces.
- **TypeScript** - Superset do JavaScript que adiciona tipagem estática.
- **React Router Dom** - Gerenciamento de rotas da aplicação.
- **Axios** - Cliente HTTP para requisições à API.
- **Nuqs** - Gerenciamento de estado de URL simplificado.
- **FontAwesome** - Conjunto de ícones para React.

## Dependências

```json
"dependencies": {
  "@fortawesome/fontawesome-svg-core": "^6.6.0",
  "@fortawesome/free-solid-svg-icons": "^6.6.0",
  "@fortawesome/react-fontawesome": "^0.2.2",
  "axios": "^1.7.7",
  "nuqs": "^2.1.1",
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-loading-skeleton": "^3.5.0",
  "react-router-dom": "^6.28.0",
  "react-spinners": "^0.14.1",
}
```

## Estrutura de Pastas

Abaixo está a estrutura principal do projeto:

```bash
src/
├── assets/
├── components/
├── constants/
├── contexts/
├── hooks/
├── layouts/
├── pages/
├── routes/
├── services/
├── styles/
├── types/
├── utils/
└── App.tsx
```

## Configuração do Projeto

### 1. Clone o repositório

```bash
git clone https://github.com/gabrielfel1x/react-tech-test.git
cd react-tech-test
```

### 2. Instale as dependências

```bash
npm i
```

### 3. Execute o projeto em ambiente de desenvolvimento

```bash
npm run dev
```

Abra [http://localhost:5173](http://localhost:5173) com o seu navegador para ver o resultado.

## Instruções de Uso

Para utilizar o **Recipes Explorer**, siga estas instruções:

1. **Pesquisar Receitas**: Na página inicial, você pode pesquisar receitas digitando o nome de uma receita específica. Utilize o campo de busca para encontrar receitas que correspondam ao termo pesquisado.

2. **Explorar Categorias**: Na página de categorias, selecione uma categoria específica para visualizar receitas dentro daquele tema culinário. Você pode usar os filtros de categoria para ajustar os resultados de busca na página inicial.

3. **Salvar Receitas**: Ao encontrar uma receita de interesse, clique no ícone de favorito para salvar essa receita. As receitas salvas são armazenadas localmente e podem ser acessadas na página de receitas salvas.

4. **Alternar Temas**: Utilize o botão de alternância de tema no cabeçalho para trocar entre os temas claro e escuro, conforme sua preferência.

5. **Ver Detalhes da Receita**: Em qualquer receita listada, clique para abrir e visualizar detalhes completos, incluindo ingredientes e o modo de preparo.

## Componentes e Contextos

Abaixo está a lista de componentes do projeto, organizados por funcionalidade:

- **IconButton** (`button.tsx`):  
  Um botão de ícone genérico, que usa o FontAwesome para renderizar ícones. Recebe o ícone, classes adicionais e um evento `onClick`.

- **CategoryFilter** (`category-filter.tsx`):  
  Filtro de categorias com checkboxes para selecionar múltiplas categorias de receitas.

- **ErrorMessage** (`error-message.tsx`):  
  Exibe uma mensagem de erro com um ícone de aviso.

- **ExpandableCard** (`expandable-card.tsx`):  
  Um cartão expansível que exibe conteúdo ao ser clicado, alternando entre um estado expandido e comprimido.

- **Footer** (`footer.tsx`):  
  Rodapé da aplicação com informações de copyright e do desenvolvedor.

- **Header** (`header.tsx`):  
  Cabeçalho com navegação para páginas principais (Home, Categories e Favorites) e alternador de tema.

- **IngredientList** (`ingredient-list.tsx`):  
  Lista de ingredientes da receita, exibindo nome e medida de cada ingrediente.

- **MealList** (`meal-list.tsx`):  
  Exibe uma lista de refeições com opção para salvar cada uma nos favoritos. Utiliza o componente `IconButton` e pode exibir um esqueleto de carregamento (`SkeletonCard`).

- **SavedRecipesGrid** (`saved-recipes.tsx`):  
  Grelha de receitas salvas com opção para remover cada receita dos favoritos.

- **SearchInput** (`search-input.tsx`):  
  Campo de pesquisa com ícone de busca para buscar receitas por nome.

### Contextos

- **SavedRecipes Context and Provider**:  
  Contexto para gerenciar as receitas salvas pelo usuário, permitindo salvar e remover receitas favoritas.

- **Theme Context and Provider**:  
  Contexto para gerenciar o tema (claro ou escuro) da aplicação, com preferência armazenada no `localStorage`.

## API Utilizada

Esta aplicação utiliza a versão gratuita da **API do TheMealDB** para buscar informações sobre receitas e categorias.

#### Endpoints

- **Categorias de Refeição**:  
  `GET /categories.php` - Retorna uma lista de categorias de refeição.

- **Refeições Aleatórias**:  
  `GET /random.php` - Retorna uma refeição aleatória.

- **Refeições por Nome**:  
  `GET /search.php?s={nome}` - Retorna uma lista de refeições que correspondem ao nome fornecido.

- **Detalhes da Receita**:  
  `GET /lookup.php?i={id}` - Retorna os detalhes de uma receita específica com base em seu ID.

- **Refeições por Categoria**:  
  `GET /filter.php?c={categoria}` - Retorna uma lista de refeições dentro de uma categoria específica.
