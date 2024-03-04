# E-commerce Microservice 

## Índice
* [Pré requisitos](#-pré-requisitos)
* [Instalação](#-instalação)
* [Testes](#-executando-os-testes)
* [Tecnologias utilizadas](#-tecnologias-utilizadas)

----

### 📋 Pré-requisitos

Primeiramente é necessário baixar o [Docker](https://docs.docker.com/) para o [Windows](https://docs.docker.com/desktop/install/windows-install/), ou para o [Linux](https://docs.docker.com/desktop/install/mac-install/) para conseguir rodar o [MongoDB](https://www.mongodb.com/pt-br) através dele. 

Precisaremos também do [NodeJS](https://nodejs.org/en/download) instalado na nossa máquina.

Depois de baixar e instalar o Docker, vamos baixar a imagem do MongoDB 

```
 $ docker pull mongo
```

### 🔧 Instalação

Siga as instruções para a instalação do projeto em sua máquina

#### Clone este repositório

```
$ git clone https://github.com/matheus-santos-da-silva/e-commerce-microservice
```

#### Acesse a pasta do projeto em seu cmd e em seguida abra no seu Vscode

```
$ cd e-commerce-microservice

$ code .
```
#### Na pasta principal do projeto abra o terminal e rode o container com o RabbitMQ

````
docker run -d -p 15672:15672 -p 5672:5672 --name meu-rabbitmq -e RABBITMQ_DEFAULT_USER=admin -e RABBITMQ_DEFAULT_PASS=admin rabbitmq:3.9-management
````
#### Vá em cada pasta do projeto e: Instale suas dependências
```
$ yarn install 

ou

$ npm install
```
#### Vá em cada pasta do projeto e: Renomeie o arquivo **.env.example** para **.env**, e preencha todas as variáveis que estão lá
 
```
PORT= (Porta que o projeto vai rodar - Ex: 3333)
JWT_SECRET= (Aqui uma 'Senha' para o jwt), etc...
```
#### Vá em cada pasta do projeto e: Inicie o Docker Compose 

```
$ docker-compose up -d 
```

#### Vá em cada pasta do projeto e: Inicie a aplicação

```
$ yarn run dev  
```

## ⚙️ Executando os testes

Para executar os testes apenas rode esse código no terminal: 

```
$ yarn test
```


## 🛠️ Tecnologias utilizadas

* [NodeJS](https://nodejs.org/docs/latest/api/) 
* [Typescript](https://www.typescriptlang.org/docs/)
* [Express.js](https://expressjs.com/pt-br/) - Framework
* [Docker](https://docs.docker.com/) - Container
* [MongoDB](https://www.mongodb.com/pt-br) - Banco de dados
* [Mongoose](https://mongoosejs.com/docs/guide.html) - ODM
* [RabbitMQ](https://rabbitmq.com/docs/documentation) - Mensageria
* [Vitest](https://vitest.dev/) - Testes

---
⌨️ Feito por [Matheus Santos](https://github.com/matheus-santos-da-silva) 😊