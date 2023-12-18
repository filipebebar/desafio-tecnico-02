## Description

Aplicação implementada e voltada para o desafio técnico

A aplicação foi pensada para rodar em docker, no qual a aplicação api e banco estão dentro do mesmo container e já em comunicação.

Os passos para rodar a aplicação estão abaixo.


## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ docker compose up -d
```
Acesse a aplicação: [Link de acesso após subir docker](http://127.0.0.1:3001/doc)

Casote nha problemas para rodar a aplicação no docker e a o banco mongoDB subir, siga:

```bash
# development
$ yarn start:dev
```
E acesse normalmente a aplicação: [Link de acesso após subir docker](http://127.0.0.1:3001/doc)

## Test

```bash
# unit tests
$ yarn run test

# test coverage
$ yarn run test:cov
```

Observações, encontrei bastante conflitos e problemas ao utilizara o mongoDB, principalmente nos testes, 
no qual a dificultade de mockar os models ficou bem aparente, tentei utilizar o o package @mockingoose mas sem sucesso, 
mas acredito que posso melhorar e desenvolver melhor, vindo a utilizar mais o mongodb 
