# Shortening

### Counter

- O sistema utiliza um contador global armazenado no Redis para gerar identificadores sequenciais que servem como base para a criação dos hashes de URL.

> Essa abordagem elimina a necessidade de consultar o banco de dados para verificar a disponibilidade de novos identificadores, garantindo maior eficiência e escalabilidade.

- O comando de incremento do Redis (INCR) é atômico, o que assegura que, mesmo com múltiplas instâncias da aplicação em execução, cada requisição receba um valor único e não duplicado.

> Dessa forma, a geração de novos hashes permanece consistente e livre de conflitos em ambientes distribuídos.

- Como o contador pode atingir valores muito altos ao longo do tempo, os identificadores são tratados como BigInt, evitando problemas de precisão numérica que poderiam ocorrer caso o limite de segurança do tipo Number em JavaScript fosse ultrapassado.

- Além disso, o Redis é configurado com persistência via Append-Only File (AOF), garantindo que o valor atual do contador seja preservado mesmo em caso de falhas ou reinicializações do serviço.

### Hash

- A partir do identificador sequencial gerado pelo Redis, o sistema aplica um processo de codificação utilizando a biblioteca Hashids, responsável por transformar o número em uma cadeia curta e não sequencial. Esse mecanismo garante que os hashes sejam únicos, compactos e não previsíveis.

- Um salt personalizado é utilizado para reforçar a segurança e evitar que os padrões de geração possam ser inferidos.

- O comprimento do hash é definido em 7 caracteres, o que permite aproximadamente 3,5 trilhões de combinações únicas.


# Redirecting

### PgBouncer

- Na primeira requisição de redirecionamento, o sistema realiza uma consulta ao banco de dados para localizar a URL original correspondente ao hash recebido.
Para otimizar o desempenho e garantir alta disponibilidade, é utilizado o PgBouncer, configurado no modo <b>statement</b>.

> Essa configuração reduz significativamente a latência e o consumo de memória, além de mitigar problemas de concorrência sob alta carga.
Com isso, o serviço é capaz de sustentar altos volumes de leitura — aproximadamente 5.000 requisições por segundo — de forma estável e eficiente.

### Cache

- Após a primeira consulta de uma URL, o resultado é armazenado em Redis com um TTL de 86.400 segundos (7 dias). Com isso, as requisições subsequentes são atendidas diretamente a partir do cache, eliminando a necessidade de novas consultas ao banco de dados e proporcionando respostas significativamente mais rápidas.
<br>

> Esse mecanismo é especialmente importante em cenários de alto tráfego — por exemplo, quando um influenciador divulga um link e milhares de usuários acessam simultaneamente.
Dessa forma, apenas a primeira requisição impacta o banco de dados, enquanto as demais são servidas instantaneamente pelo Redis, preservando recursos e garantindo escalabilidade.

### Moved-Permanently

- Ao optar pela resposta HTTP 301 (Moved Permanently), o navegador do usuário armazenará o redirecionamento em cache, evitando que novas requisições sejam enviadas ao servidor para a mesma URL.

> Essa abordagem reduz significativamente a carga sobre a infraestrutura e melhora a experiência do usuário, já que o redirecionamento passa a ocorrer localmente e de forma instantânea nas visitas subsequentes.


# Tecnologias utilizadas

- Typescript
- Express 
- Prisma 
- Redis 
- Hashids
- Pg
- PostgreSQL
- PgBouncer
- Nginx

# Como executar o projeto

```bash
# clonar repositório
git clone https://github.com/lucascamposdev/advanced-url-shortener.git

# env
utilizar .env-docker como .env, nos dois serviços

# executar na raíz do projeto
docker-compose up --build

# Aplicação poderá ser acessada em:
http://localhost/
```


