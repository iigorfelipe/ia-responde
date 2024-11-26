<div align="center">

[Desafio](#challenge) | [Tecnologias](#technologies) | [Instalação](#install) | [API](#api) | [Autor](#autor)

</div>

<div align="center">

# IA Responde

</div>

## Protótipo de Design (Figma)

<img src="https://github.com/user-attachments/assets/ffba3159-0733-412f-a995-43f7da51d935">

<!-- ## 🖼️ Imagens:

<img src="" alt="Tela inical" height="450px" />
<img src="" alt="Menu lateral" height="450px" />
<img src="" alt="Tela de Favoritos" height="450px" />
<img src="" alt="Tela de Detalhes da pergunta" height="450px" />
<img src="" alt="Área de assinatura premium" height="450px" /> -->

## 🎥 Vídeos:

| Pergunta + Detalhes | Favoritos + Filtragens |
|---------|---------|
| <video src="https://github.com/user-attachments/assets/7e8b3d67-5799-45b7-b115-8636b143b40b" autoplay loop muted height="450px"></video> | <video src="https://github.com/user-attachments/assets/e846bc1c-dfbd-4c82-9d03-1ae2b3abe1da" autoplay loop muted height="450px"></video> |

<a name="challenge"></a>

## 📌 Desafio:

**Desenvolver um aplicativo React Native que consuma a API da OpenAI e armazene os dados localmente no dispositivo.**

## 📄 Sobre o Projeto:

**IA Responde** é um aplicativo React Native desenvolvido para interagir com a API da OpenAI, oferecendo uma experiência de perguntas e respostas (Q&A) personalizada. Os dados são salvos localmente no dispositivo, garantindo fácil acesso offline.


## Acessando o App:

Para testar o aplicativo, instale o **Expo Go** e escolha uma das opções abaixo:

#### 1. Com QR Code:

  - **Android:** Abra o **Expo Go** e escaneie o código QR abaixo.

  - **iOS:** Escaneie o código QR abaixo e clique no link do **Expo Go**.

<img src="https://github.com/user-attachments/assets/8254aa1d-cd74-4f94-850e-784d2e29fa33" height="250px">

#### 2. Com Link:

  - Abra o **Expo Go** no seu dispositivo.
  - No campo **"Enter URL manually"**, cole o link abaixo:


```
https://expo.dev/preview/update?message=deploy%3A%20test%20deployment%20using%20EAS%20update&updateRuntimeVersion=1.0.0&createdAt=2024-11-26T17%3A22%3A40.113Z&slug=exp&projectId=d34507d7-c465-4ddf-b9c0-b0b5aad3c7a8&group=59f8a026-7288-4609-8412-e0c65c777ac9
```

## Versão do Aplicativo:

- **Versão do aplicativo:** 1.0.0
- **Data de publicação:** Nov 26, 2024, 2:22 PM
- **Plataformas:** Android, iOS


## 🔗 Funcionalidades Principais:

- **Tela inicial:** Envie perguntas à API da OpenAI.
  - Perguntas e respostas são salvas, junto com a contagem de tokens utilizados.
  - Perguntas já respondidas não geram novas chamadas à API.
- **Detalhes da Pergunta:** Exibe a resposta gerada e opções para copiar, favoritar ou excluir.
  - **Bottom Sheets:** Painéis deslizantes que mostram informações extras, como tokens usados e planos de assinatura premium.
- **Menu lateral:** Exibe lista de perguntas com navegação para detalhes, favoritos e tela inicial.
  - Filtros por nome e agrupamento por data.
- **Favoritos:** Lista de perguntas favoritas, com opção de desfavoritar.
  - Ordenação por `Nome`, `Data (Mais recentes)` e `Data (Mais antigas)`
- **Header:** Acesso ao menu lateral e área de assinatura premium.

<a name="technologies"></a>

## 🛠️ Tecnologias Utilizadas:

- **[React Native](https://reactnative.dev/)**
- **[Expo@latest](https://docs.expo.dev/workflow/upgrading-expo-sdk-walkthrough/)**
- **[TypeScript](https://www.typescriptlang.org/)**
- **[API OpenAI](https://platform.openai.com/docs/api-reference/introduction)**
- **[NativeWind](https://www.nativewind.dev/)**

## 🔗 Principais Bibliotecas Utilizadas:

- **Async Storage:** Armazenamento persistente de dados localmente no dispositivo.
- **Zustand:** Gerenciamento de estado simples, leve e eficiente.
- **Expo router:** Roteamento dinâmico e fácil entre telas no Expo.
- **Tailwind e Nativewind:** Estilos rápidos e responsivos com a conveniência do Tailwind no Expo.
- **Toast:** Notificações simples e eficazes para feedback do usuário.

<a name="install"></a>

## 📋 Executando o Projeto Localmente:

1. Clone o repositório:

```bash
git clone git@github.com:iigorfelipe/ia-responde.git
```

2. Entre na pasta do projeto:

```bash
cd ia-responde
```

3. Instale as dependências:

```bash
npm install
```

4. **Crie o arquivo .env:** Copie o arquivo de exemplo para criar seu próprio arquivo de configuração.

```bash
cp .env.example .env
```

⚠️ **Atenção:** É necessário obter uma chave da API da OpenAI para o funcionamento do projeto. No arquivo `.env.example`, há um passo a passo de como gerar essa chave.

5. Execute o projeto:

```bash
npx expo start
```

ou

```bash
npx expo start --tunnel --clear
```

6. Acesse o projeto no dispositivo:

- **Para Android:** Abra o aplicativo Expo Go, disponível na Google Play Store, e escaneie o QR Code gerado no terminal ou na interface do Expo.
- **Para iOS:** Abra a câmera do seu dispositivo e escaneie o QR Code gerado no terminal ou na interface do Expo.

⚠️ Se encontrar qualquer dificuldade, sinta-se à vontade para me contatar através dos links fornecidos ao final desta documentação.

## 🔧🌐 Testando sem a chave da OpenAI:

Você pode testar a aplicação sem precisar de uma chave da API. Para isso, siga os passos abaixo:

1. Abra o arquivo `src/screens/home.tsx`.

2. Vá até a `linha 40` e substitua o código atual por:

```bash
const response = await fetchOpenAIResponse(question, true);
```

O parâmetro true faz com que a função retorne dados simulados.

3. Para personalizar as respostas falsas, abra o arquivo `src/mock/fake-questions.ts` e adicione novas perguntas e respostas no array `questionsAndAnswers`.

Isso permite que você teste a aplicação com dados simulados, que são idênticos aos da API real.

<a name="api"></a>

## 🌐 API:

A aplicação utiliza a API da OpenAI para gerar respostas. A função fetchRealOpenAIResponse faz uma requisição para o endpoint `https://api.openai.com/v1/chat/completions`, enviando a pergunta do usuário e retornando os seguintes dados:

- **id:** Identificador único da interação, retirado de `response.data.id`.
- **answer:** Resposta gerada pelo modelo, extraída de `response.data.choices[0].message.content`.
- **created:** Timestamp da criação da resposta, vindo de `response.data.created`.
- **tokensUsed:** Detalhes sobre o uso de tokens, proveniente de `response.data.usage`.

Esses dados são salvos para exibir ao usuário e possibilitar o uso offline.

Para mais detalhes sobre os retornos da API, consulte a [documentação oficial da OpenAI](https://platform.openai.com/docs/api-reference/making-requests)

## Estrutura do Projeto

- **src/**
  - **api/**: Contém a chamada à API da OpenAI.
  - **app/**: Contém o layout do aplicativo, incluindo a tela de "Not Found" e o menu lateral que possibilita a navegação entre as telas.
  - **assets/**: Arquivos de mídia.
  - **components/**: Componentes reutilizáveis ao longo do aplicativo.
  - **hooks/**: Hooks com lógicas que podem ser utilizadas pelo app.
  - **mock/**: Dados simulados para testes, evitando chamadas reais à API e economizando créditos da OpenAi.
  - **screens/**: Contém as telas da aplicação, como a tela inicial, detalhes da pergunta e favoritos.
  - **store/**: Gerenciamento de estado global, utilizando zustand.
  - **styles/**: Arquivos de estilo do aplicativo.
  - **types/**: Tipagens utilizadas em todo o app.
  - **utils/**: Funções utilitárias gerais para o funcionamento do app.

## Decisões Tomadas:

1. Planejamento e Pesquisa.

   - Iniciei lendo todos os requisitos e escrevi um passo a passo no bloco de notas.
   - Priorizei o layout, então fui ao Figma para desenhar o projeto, usando como referência os layouts do ChatGPT e Meu Guru.

2. Estruturação do App.

   - Comecei o app React usando o Expo mais recente e seguindo as seguintes referências para configuração: [React Native](https://reactnative.dev/docs/environment-setup) e [Expo](https://docs.expo.dev/router/installation/)

3. Bibliotecas e Ferramentas.

   - Escolhi o NativeWind para os estilos, baseado na documentação de integração do [TailwindCSS com Expo](https://www.nativewind.dev/getting-started/expo-router). Isso me ajudou a configurar arquivos como `metro.config.js` e `babel.config.js`.
   - Utilizei `@expo/vector-icons` para ícones e escolhi o pacote `MaterialIcons` para garantir mais consistência.

4. Imagens e Recursos.

   - As imagens foram obtidas no site [Freepik](https://br.freepik.com/), baixadas como vetores e editadas no VSCode, ajustando cores e posições de elementos (por exemplo, "AI" por "IA").
   - Converti as imagens para o formato WebP para maior compatibilidade com dispositivos móveis.

5. Desafios.
   - O maior desafio foi manter a consistência entre iOS e Android, e felizmente o React Native oferece várias ferramentas para ajudar com isso.
   - Encontrei um problema no iOS: ao abrir o teclado, o campo de texto ficava coberto, o que impedia a visualização do conteúdo. Tentei usar KeyboardAvoidingView como sugere a documentação, mas não obtive sucesso. Para resolver isso, criei um hook chamado `useKeyboardSafeAreaIOS`, que adiciona um espaçamento no rodapé sempre que o teclado aparece no iOS, empurrando o conteúdo para cima.

## 🔧 Melhorias Futuras:

Se houvesse mais tempo, as seguintes melhorias poderiam ser implementadas:

- **Funcionalidades Adicionais:**

  - Fazer perguntas com imagem ou áudio.
  - Stream da resposta.
  - Exibição de markdown/LaTex para perguntas matemáticas.
  - Editar perguntas.
  - Compartilhamento de perguntas.
  - Renomaer o titulo das perguntas listadas.
  - Reorganizar favoritos com arrastar e soltar.
  - Implementar funcionalidades para a tela de assinatura premium.
  - Mover perguntas excluidas para uma lixeira. Perguntas ainda na lixeira evita novas chamadas a API.
  - Tela de login.
  - Deploy.

- **UI/UX:** Refinamentos na interface de usuário para melhorar a experiência do usuário e a usabilidade.
- **Testes Unitários:** Implementação de testes unitários.

<a name="autor"></a>

## 👨‍💻 Autor

**@Igor Felipe**

[![Linkedin Badge](https://img.shields.io/badge/-LinkdedIn-blue?style=for-the-badge&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/iigor-felipe/)](https://www.linkedin.com/in/iigor-felipe/)
[![Gmail Badge](https://img.shields.io/badge/-Gmail-c14438?style=for-the-badge&logo=Gmail&logoColor=white&link=mailto:iigorfelipe@gmail.com)](mailto:iigorfelipe@gmail.com)
