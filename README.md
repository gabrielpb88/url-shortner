## Encurtador de URL

Este repositório contém a implementação de um desafio técnico conforme descrição do [README.](https://github.com/gabrielpb88/shorterner-url/blob/main/requirements/README.md)

### Variáveis de Ambiente

As únicas variáveis de ambiente estão configuradas no docker-compose.yml e descritas abaixo:

```
MONGO_URL = url de conexão com o mongo
PORT = porta em que a aplicação estará rodando
MONGO_DB_NAME = nome do banco
EXPIRATION_TIME= numero de dias que a url será valida
```

### Executando pelo Docker

```shell
docker compose up -d --build
```

### Rotas:

```
POST http://localhost:3000/
{
    "url": "https://www.jusfy.com.br"
}

GET http://localhost:3000/some_token
```
