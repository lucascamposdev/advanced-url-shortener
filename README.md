# Shortening

### Redis
```
    const idStr = await redis.incr(UrlService.COUNTER_KEY)
    const id = BigInt(idStr.toString ? idStr.toString() : `${idStr}`)
```
1. Um contador é criado no Redis para que os hashes sejam gerados de forma sequencial a partir deste valor, eliminando a necessidade de checar disponibilidade no banco de dados.

2. Como o redis.incr incrementa valores de forma atômica, mesmo com múltiplas instâncias da aplicação utilizando o serviço, cada uma recebe um valor diferente, garantindo a unicidade do hash.

3. Esse valor é convertido em string antes de virar BigInt, pois caso o contador cresça demais, o tipo number poderia ultrapassar o Number.MAX_SAFE_INTEGER do JavaScript (≈ 9e15).

4. O Redis está configurado com persistência (AOF), para que numa ocasional falha do serviço o valor do contador não seja perdido.

### Hashids
```
    const hashids = new Hashids(UrlService.HASHIDS_SALT, 7)
    const hashid = hashids.encode(Number(id))
```

1. Utilizo a biblioteca Hashids para codificar o número sequencial vindo do Redis.

2. Um salt é adicionado para que os hashes gerados não sejam previsíveis.

3. Defino seu tamanho em 7 caracteres, possibilitando 3,5 trilhões de combinações possíveis.


