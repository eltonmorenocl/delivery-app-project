# To-do List

## Visão geral

### Contextualizando:

Nessa aplicação, meu grupo ficou responsável por criar e integrar tanto o back-end quanto o front-end, criando uma plataforma de delivery de cerveja. 🍻

O projeto não é só codar, mas também é trabalhar em equipe, aprender e se divertir muito!

**Neste projeto, meu grupo teve que desenvolver um app de delivery para uma distribuidora de bebidas. Veja abaixo o contexto da entrega que foi feita:**

A distribuidora de cervejas da dona Tereza está se informatizando! 🚀 Seu negócio, antes focado em um local específico da cidade, passou a receber uma quantidade massiva de encomendas de outros pontos, expandindo sua atuação via delivery. Isso tudo graças ao excelente preço das bebidas e atendimento da equipe de vendas.

  Agora a distribuidora possui alguns pontos de venda na cidade para agilizar no atendimento dessas áreas. Cada ponto de venda, por sua vez, possui uma pessoa vendedora responsável.

  Como seu antigo sistema, que era um conjunto de planilhas, já não atende a necessidade do negócio por gerar muita manutenção, dona Tereza procurou a minha equipe de pessoas desenvolvedoras com uma ideia de aplicativo que pudesse agilizar a vida de sua equipe e das pessoas que compram seus produtos. O aplicativo precisa:

  - Ter acesso via login: tanto clientes como pessoas vendedoras, assim como a própria dona Tereza, que administra o sistema, devem ter acesso ao aplicativo via login, porém para funções diferentes: (1) A pessoa cliente, que compra da lista de produtos; (2) A pessoa vendedora, que aprova, prepara e entrega; (3) A pessoa administradora, que gerencia quem usa o aplicativo;
  - Fazer a comunicação entre clientes e pessoas vendedoras: a pessoa cliente faz o pedido via "carrinho de compras" e a pessoa vendedora aprova, prepara e envia esse pedido. Quando o produto é recebido por quem comprou, essa pessoa marca o pedido como "recebido". Ambos devem possuir detalhes sobre seus pedidos;
  - Se a pessoa cliente faz o pedido, o mesmo deve aparecer para a pessoa vendedora em seu dash de pedidos após a atualização da página. A pessoa cliente, por sua vez, deve ter as informações sobre seu pedido quando sua página for atualizada, ou seja, ter informações se o pedido está sendo preparado ou se já saiu pra entrega;

<br />

## Aplicação rodando:

Criei um site de lista de tarefas para os colaboradores adicionarem suas tarefas. É possível consultar a tarefa de qualquer lugar, basta fazer login com a conta criada.

 `Veja a aplicação rodando:` [Link]

#### Primeiro acesso?
> É importante saber que para fazer o cadastro é preciso colocar um e-mail em um formato valido e uma senha de pelo menos 6 caracteres.



<br />

## Rode em sua maquina

### Modo tradicional

<details>
  <summary><b>Requisitos:</b></summary><br>

  - Ter o `Git` instalado em sua máquina;
  - Ter o `node` instalado em sua máquina.
  - Ter o `MySQL` instalado e ativado em sua máquina.
  
</details>

<details>
  <summary><b>Clonar</b></summary><br>

Para clonar o repositório usando HTTPS:

```
git clone [Link]
```

Para clonar usando SSH:

```
git clone [Link]
```
</details>

<details>
  <summary><b>Vamos lá</b></summary><br>
 
`Backend:`

Entre na pasta do projeto:

```
cd [nome do repositorio]/backend
```

Instale as dependências do projeto:

```
npm i
```

Crie um arquivo `.env` com as seguintes informações:

```
MYSQL_USER=(nome do MySQL)
MYSQL_PASSWORD=(sua senha)
```

Inicie o projeto:

```
npm run dev
```
  
`Frontend:`
  
Entre na pasta do projeto:

```
cd [nome do repositorio]/frontend
```

Instale as dependencias:

```
npm i
```

Inicie o projeto:

```
npm start
```

Abra o link abaixo no navegador de sua preferencia:

```
http://localhost:3000/
```
</details>


### Usando Docker

<details>
  <summary><b>Requisitos:</b></summary><br>
  
  - Ter o `Git` instalado em sua máquina;
  - Ter o `docker` instalado e ativado em sua máquina.
  
</details>

<details>
  <summary><b>Clonar</b></summary><br>

Para clonar o repositório usando HTTPS:

```
git clone [Link]
```

Para clonar usando SSH:

```
git clone [Link]
```
</details>

<details>
  <summary><b>Vamos lá</b></summary><br>


Entre na pasta principal:

```
cd [nome do repositorio]
```
  
Inicie o docker com o comando:

```
docker-compose up -d
```

Abra o link abaixo no navegador de sua preferencia:

```
http://localhost:3000/
```

</details>

</details>
<br />

## Documentações:

> `Backend:` [Clique aqui](./back-end/README.md)

> `Frontend:` [Clique aqui](./front-end/README.md)

<br />

## Autores

### Hiago Briano
Linkedin - https://www.linkedin.com/in/hiago-briano/

Email - hiago.artist@hotmail.com

### Gabriel Silvestre
Linkedin - https://www.linkedin.com/in/gabrielh-silvestre/

Email - gabriel.h.silvestre11@gmail.com

### Elton Moreno
Linkedin - https://www.linkedin.com/in/eltonmoreno/

Email - eltonmorenocl@gmail.com

### Daniel Tavares
Linkedin - https://www.linkedin.com/in/daniel-tavares-819727217/

Email - daniel1tavares@outlook.com

### André Luiz S. da Silva
Linkedin - https://www.linkedin.com/in/andreluiiz/

Email - andreluizgyn1@gmail.com

