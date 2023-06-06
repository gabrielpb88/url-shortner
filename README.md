## Encurtador de URL

Este repositório contém a implementação de um desafio técnico conforme descrição do [README.](https://github.com/gabrielpb88/shorterner-url/blob/main/requirements/README.md)

### Variáveis de Ambiente
As únicas variáveis de ambiente estão configuradas no docker-compose.yml e descritas abaixo, caso execute localmente, verifique o arquivo src/main/config/env.ts:
```
MONGO_URL = url de conexão com o mongo
PORT = porta em que a aplicação estará rodando
EXPIRATION_TIME = tempo de expiração da url em dias
```

### Executando pelo Docker
```shell
docker compose up -d
```

### Executando localmente
```shell
npm start
```
* Verificar

### Testes
Obs: Alguns testes utilizam o banco de dados, portanto, verifique se o serviço do mongodb está rodando.
```shell
npm run test
```

### Rotas:
```
POST http://localhost:8080/
{
    "url": "https://www.jusfy.com.br"
}

GET http://localhost:8080/some_token
```