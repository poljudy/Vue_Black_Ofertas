# Teste de codificação de desenvolvedor front-end

<p float="left">
  <img src="https://user-images.githubusercontent.com/32960040/194759459-7e94d632-89f6-4207-86c7-2dd19ccee629.JPG" width="160px" alt="Página inicial"/>
  <img src="https://user-images.githubusercontent.com/32960040/194759490-35873554-ac85-477a-9180-1a4a9033a9a6.JPG" width="160px" alt="Detalhes do produto"/>
  <img src="https://user-images.githubusercontent.com/32960040/194759552-ffac36e6-2205-4a96-912c-db1b84d6f8be.JPG" width="160px" alt="Carrinho vazio"/>
  <img src="https://user-images.githubusercontent.com/32960040/194759553-0284e7c9-470f-47d8-8f60-a7c42871c0f6.JPG" width="160px" alt="Carrinho com produtos"/>
  <img src="https://user-images.githubusercontent.com/32960040/194760702-680abdfb-890c-43e1-a853-5fd23b07769f.JPG" width="160px" alt="Acesso">
  <img src="https://user-images.githubusercontent.com/32960040/194759734-70109c5d-1674-49e5-bc8d-155b011fa11b.JPG" width="160px" alt="Checkout restrito"/>
  <img src="https://user-images.githubusercontent.com/32960040/194759593-58af685e-250f-41d6-a122-d9b2f9fe3544.JPG" width="160px" alt="Checkout passo 1"/>
  <img src="https://user-images.githubusercontent.com/32960040/194759595-4edcf302-df9f-4861-bdfa-515f4d15656d.JPG" width="160px" alt="Checkout passo 2"/>
  <img src="https://user-images.githubusercontent.com/32960040/194759660-bb4e8164-1175-4851-a3a1-cdd1dc42ed76.JPG" width="160px" alt="Finalizando compra"/>
  <img src="https://user-images.githubusercontent.com/32960040/194759737-add810d5-9b2b-48a7-8759-2bcb84f67c72.JPG" width="160px" alt="Compra realizada"/>
</p>

## Sobre o projeto

Implementação desenvolvida para o teste de codificação para vaga de estágio em desenvolvimento front-end, na empresa [InfoG2 Tecnologia](http://www.infog2.com.br/).

## Observações sobre a implementação

1. A largura de tela adequada para visualização é de 425px, com zoom de 75%.
2. O acesso às informações da tela de checkout é permitido apenas se o usuário estiver cadastrado ou logado.
3. Nas telas de checkout, não é permitido avançar caso os valores da tela atual não estejam selecionados.

## Instruções para execução do deploy

1. Clique no ícone de cadeado da url, e em seguida, em **Configurações do site**.
2. Em **Permissões**, vá até a opção **Conteúdo não seguro**, e selecione a opção **Permitir**.
3. Recarregue a página.

## Funcionalidades

- Busca (parcialmente implementada)
- Visualização de detalhes de um produto
- Carrinho
  - Adição e exclusão de produto
  - Alteração de unidades de cada produto
  - Cálculo do valor total de compra
- Login e cadastro
- Checkout

## Tecnologias e ferramentas utilizadas

- [Vue.js](https://vuejs.org/) - Framework para construção de interfaces web.
- [Vue Router](https://router.vuejs.org/) - Definição de rotas para navegação.
- [Axios](https://axios-http.com/) - Biblioteca para envio de requisições ao back-end.
- [Pinia](https://pinia.vuejs.org/) - Gerenciador para compartilhamento de estados entre páginas e componentes.
- [Quasar](https://quasar.dev/) - Framework para UI, com componentes prontos e plugins.
- [VeeValidate](https://vee-validate.logaretm.com/v4/) - Biblioteca para validação de formulários.
- [Yup](https://www.npmjs.com/package/yup) - Pacote adicional para validação de formulários.
- [Vue-the-mask](https://github.com/vuejs-tips/vue-the-mask) - Para aplicação de máscaras nos inputs dos formulários.

## Recursos úteis

- [Vue School](https://vueschool.io/) - Tutoriais e cursos de Vue.js.
- [Vue Devtools](https://devtools.vuejs.org/) - Extensão de navegador para debugar aplicações Vue.js.
- [Stack Overflow](https://stackoverflow.com/) - Para dúvidas em questões pontuais.
- [Code Sandbox](https://js.new) - Editor online para testes rápidos em questões do Javascript.
- [Vue 3 + Pinia - User Registration and Login Example & Tutorial](https://jasonwatmore.com/post/2022/07/25/vue-3-pinia-user-registration-and-login-example-tutorial) - Útil para implementação de login e cadastro.

## Como executar o projeto

### Clonando o repositório

```bash
  git clone https://github.com/guisantosfr/infog2-teste
```

### Instalando dependências

```bash
  npm install
```

### Executando projeto

```bash
  npm run dev
```

## Autor

- [Francisco Guilherme](https://www.linkedin.com/in/guisantosfr/)
