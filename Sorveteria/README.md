# Sorveteria Minimal API

## Descrição do Projeto
Este projeto consiste em uma Minimal API desenvolvida em C# utilizando o padrão REST, com exportação e consumo de dados no formato JSON. A API gerencia pedidos de sorvetes, utilizando Entity Framework com banco de dados SQLite para persistência. O front-end é desenvolvido em React, consumindo a API para exibir e gerenciar os pedidos.

## Tecnologias Utilizadas
- Linguagem: C# (.NET Core 8.0)
- Framework ORM: Entity Framework Core
- Banco de Dados: SQLite
- Front-end: React (JavaScript)
- Documentação da API: Swagger

## Integrantes da Dupla
- Eduardo Almeida de Gouveia
- RGM: 26254689

## Instruções para Executar o Projeto

### Back-end (API)
1. Certifique-se de ter o .NET 8.0 SDK instalado.
2. No diretório raiz do projeto, execute:
   ```
   dotnet build
   dotnet run
   ```
3. A API estará disponível em `https://localhost:5001` (ou porta configurada).
4. A documentação Swagger pode ser acessada em `https://localhost:5001/swagger`.

### Front-end (React)
1. Navegue até a pasta `frontend-react`.
2. Instale as dependências:
   ```
   npm install
   ```
3. Inicie o servidor de desenvolvimento:
   ```
   npm start
   ```
4. O front-end estará disponível em `http://localhost:3000`.

## Endpoints da API

### Pedidos
- GET /pedidos - Lista todos os pedidos
- POST /pedidos - Cria um novo pedido
- DELETE /pedidos/{id} - Remove um pedido específico
- PATCH /pedidos/{id}/cancelar - Cancela um pedido

## Estrutura do Banco de Dados
- Pedidos (Orders)
  - Id
  - Total
  - MetodoPagamento
  - QRCodeUrl
  - Cancelado
  - DataHora
- Sorvetes (Ice Creams)
  - Id
  - Nome
  - Descricao
  - Preco
  - ImagemUrl
- ItemPedido (Order Items)
  - Id
  - PedidoId
  - SorveteId
  - Quantidade

## Informações Adicionais
- O projeto utiliza CORS para permitir comunicação entre front-end e back-end
- A API possui endpoints para gerenciamento de pedidos, incluindo criação, listagem, cancelamento e exclusão
- O versionamento do código é feito via Git, com commits regulares conforme critérios do professor
- Implementação completa de tratamento de erros
- Documentação via Swagger UI disponível em desenvolvimento

---
Este projeto foi desenvolvido como parte da disciplina de Tópicos Especiais, com foco em boas práticas de desenvolvimento.
