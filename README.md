# :checkered_flag: OBES - Sebo Online

Para pessoas que buscam adquirir livros por preços mais acessíveis e contribuir para a preservação do meio ambiente, que encontram dificuldades em ter acesso a livros novos devido aos preços elevados.
O OBES é uma plataforma online de vendas e doação de livros usados que oferece preços mais acessíveis e uma grande variedade de títulos em comparação às lojas físicas tradicionais.
Nosso produto contribui para a formação de uma sociedade mais instruída e crítica, além de colaborar para a preservação do meio ambiente por meio da reutilização de recursos.

## :technologist: Membros da equipe

508159 – Lara Gabrielly Souza Batista Lima - Engenharia de Software
508653 – Victor Anthony Pereira Alves - Engenharia de Software
509278 – Vinícius Lemos Araújo - Engenharia de Software
516098 – Antonio Herik Cosmo Martins - Engenharia de Software

## :spiral_calendar: Entidades ou tabelas do sistema

1. **Livros**: representa os livros disponíveis para venda/doação no sebo online. Os atributos podem incluir título, autor, editora, ano de publicação, condição (novo, usado), preço, descrição e imagem do livro.
2. **Usuários**: a entidade que representa os usuários do sistema, incluindo usuário comum e usuário institucional. Os atributos podem incluir nome, endereço, telefone, e-mail e senha.
3. **Doação/venda**: a entidade que representa as doações/vendas feitas pelos usuários. Os atributos podem incluir informações do cliente e informações do livro.
4. **Avaliações**: a entidade que representa as avaliações feitas pelos clientes sobre os livros e usuários. Os atributos podem incluir número da avaliação, data, informações do cliente, nome do livro ou usuário avaliado, nota (em uma escala de 1 a 5) e comentário.

## :triangular_flag_on_post: Principais funcionalidades da aplicação

- **Receber livros disponíveis para doação**: assim como todos os sistemas e-commerce, será implementada no Obes uma plataforma de envios para que os usuários registrados acompanhem os pedidos.
- **Colocar livros usados à venda**: os usuários registrados a qualquer momento poderão cadastrar livros usados por meio da página de cadastro que ficará disponível no menu.
- **Cadastrar livro para doação**: os usuários registrados a qualquer momento poderão cadastrar livros usados por meio da página de cadastro que ficará disponível no menu.
- **Visualizar livros usados que estão sendo vendidos e doados**: o sistema será dividido em duas categorias, a primeira é o Sebo no qual constará os livros à venda, essa página ficará disponível tanto para o UC (Usuário Comum) quanto para o UI (Usuário Institucional). Já a categoria de doação estará visível apenas para o UI, o UC não poderá receber livros doados e a página de doação para ele constará apenas aqueles materiais que ele cadastrou para doação.

## :desktop_computer: Tecnologias e frameworks utilizados

**Frontend:**

Lista as tecnologias, frameworks e bibliotecas utilizados.

VUE

**Backend:**

NodeJS, Express, Nodemon, PostgreSQL

## :shipit: Operações implementadas para cada entidade da aplicação

| Entidade     | Criação | Leitura | Atualização | Remoção |
| ------------ | ------- | ------- | ----------- | ------- |
| Livros       | X       | X       | X           | X       |
| Usuários     | X       | X       | X           |         |
| Doação/venda | X       | X       | X           | X       |
| Avaliações   | X       | X       |             | X       |

> Lembre-se que é necessário implementar o CRUD de pelo menos duas entidades.

## :neckbeard: Rotas da API REST utilizadas

| Método HTTP | URL            |
| ----------- | -------------- |
| GET         | api/entidade1/ |
| POST        | api/entidade2  |