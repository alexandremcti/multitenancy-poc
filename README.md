## Regras ##

- [x] Deve criar o cadastro de um novo produto no banco do tenant informado; 
- [x] Deve retornar o cadastro de um produto de acordo com o tenant informado;
- [] Deve criar um módulo de usuários que realizarão os cadastros de produtos;
- [] Um usuário de um tenant x não pode atuar em um tenant y mesmo se ele passar o id do tenant y no header;

## O processo ##

Após criado toda a estrutura física da aplicação (organização dos diretórios), começamos criando as configurações de banco de dados, inicialmente criando um docker compose para subir um container do banco de dados.

O próximo passo é criar os arquivos de configuração da conexão. Primeiro o `orm.config.ts` que conterá as informações do banco de dados e em seguida o `tenants-orm.config.ts` que conterá as informações de migrations dos tentants.
No projeto foi realizado uma configuração opcional de estratégia de criação do banco, tabelas, colunase e joins através do arquivo `snake-naming-strategy`.

Em seguida foi criado o módulo de `tentants` contendo seus dtos, a entidade **Tenant** que herda da classe base **AbstractEntity** e o arquivo `tentants.service.ts` que contém os métodos de criação de e listagem de tentants

Focando no método create em *TenantService*, a lógica consiste em criar e persistir na base de dados um novo tenant recebendo do cliente um nome. Em seguida, em posso do id do registro salvo, criamos um novo schema no banco de dados com o nome do schema, utilizando um padrão tentant_${tenant.id}. O próximo passo é pegar a conexão do tenant. Para isso, a função getTenantConnection é chamada passando o id do tenant. Por fim as migragions são executadas, a conexão é encerrada e o tenant é retornado ao requester.

Já a função chamada, *getTenantConnection* está no arquivo `tenancy.utils.ts`, no módulo `tentancy`. Ele é responsável por verificar se uma conexão com o nome da connection *tenant_${id}* existe. Se existir, ela é buscada ou criada uma nova conexão com essa connection name e retornada para o *TenantService* ou é criada uma nova conexão passando as informações do *tentantsOrmconfig* atribuíndo também o nome e o schema como a connectionName. 

A parte de criação dos arquivos de controller e do módulo de tenants não serão abordados pois o foco do processo é apenas nas lógicas de implementação da solução. Para mais detalhes, consulte a documentação do Nest  <https://docs.nestjs.com/>.

A próxima parte é a finalização do módulo de tenancy. Já criamos um arquivo *tenant.utils* que está sendo utilizado no módulo de tenants. Agora iremos criar um arquivo chamado `tenancy.middleware.ts` que será responsável por capturar o header `x-tentant-id` que será informado pela requisição. Escolhemos o header da request como a forma de enviar o id, mas existem outras formas como enviar no body ou especifica-lo através do host da API.

Em seguida criaremos um outro arquivo dentro do mesmo módulo, chamado `tenancy.symbols`. Ele tem um única instrução que é criar uma constante com Symbol chamada CONNECTION. Essa constante será usada para pegar a conexão do tenant e instanciar o seu repositório.

Agora partiremos para a criação do módulo de *products*. Criaremos a entidade *Product* em `product.entity.ts` e o serviço e controller. Focaremos no arquivo `product.service.ts`. Em seu construtor ele recebe a conexão e instancia o repositório de produtos baseado na conexão do tenant.
