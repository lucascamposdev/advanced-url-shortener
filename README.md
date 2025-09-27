# Criando o Hash

### Redis
```
    const idStr = await redis.incr(UrlService.COUNTER_KEY)
    const id = BigInt(idStr.toString ? idStr.toString() : `${idStr}`)
```
1. Um contador é criado no Redis para que os hashes sejam gerados de forma sequencial a partir deste valor, eliminando a necessidade de checar disponibilidade no banco de dados.

2. Como o redis.incr incrementa valores de forma atômica, mesmo com múltiplas instâncias da aplicação utilizando o serviço, cada uma recebe um valor diferente, garantindo a unicidade do hash.

3. Esse valor é convertido em string antes de virar BigInt, pois caso o contador cresça demais, o tipo number poderia ultrapassar o Number.MAX_SAFE_INTEGER do JavaScript (≈ 9e15).

4. O Redis está configurado com persistência (AOF), garantindo que mesmo que o serviço ou o container reinicie, o valor do contador não será perdido, evitando a geração de hashes duplicados.

### Hashids
```
    const hashids = new Hashids(UrlService.HASHIDS_SALT, 7)
    const hashid = hashids.encode(Number(id))
```

1. Utilizo a biblioteca Hashids para codificar o número sequencial vindo do Redis.

2. Um salt é adicionado para que os hashes gerados não sejam facilmente adivinháveis ou previsíveis.

3. Defino que o hash tenha 7 caracteres, se baseando no padrão de mercado para encurtadores de URL profissionais.

### Fallback

```
catch (error) {
      const rnd = crypto.randomBytes(6)             
      const num = Number(BigInt("0x" + rnd.toString("hex")))
      const hashids = new Hashids(UrlService.HASHIDS_SALT, 7)
      return hashids.encode(num)                     
    }
```

1. Caso o Redis esteja indisponível (desligado, falha na conexão ou erro inesperado), não podemos utilizar o contador para gerar o hash. Nesse caso, utilizo um fallback que gera um número aleatório de 48 bits e, em seguida, aplico o mesmo processo de toString e BigInt antes de codificá-lo com Hashids.

