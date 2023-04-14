# Descrição das entidades do banco de dados

## Entidade "Usuário"

A entidade "Usuário" representa os usuários do sistema.

### Atributos

| Nome      | Tipo   | Obrigatório | Único | Descrição                          |
| --------- | ------ | ----------- | ----- | ---------------------------------- |
| name      | String | Sim         | Não   | Nome do usuário                    |
| email     | String | Sim         | Sim   | Endereço de e-mail do usuário      |
| password  | String | Sim         | Não   | Senha do usuário (criptografada)   |
| createdAt | Date   | Não         | Não   | Data e hora da criação do registro |

### Exemplo

```javascript
{
  "_id": "60a2a68c7b4f4d004e9a25d9",
  "name": "Fulano de Tal",
  "email": "fulano@example.com",
  "password": "***********",
  "createdAt": "2021-05-17T18:30:00.000Z"
}
```

**Importante**

Observe que os atributos "name", "email" e "password" são obrigatórios. O atributo "email" também deve ser único para cada usuário. O valor padrão do atributo "createdAt" é a data e hora atuais.


## Entidade "Patient"

A entidade "Patient" representa os pacientes cadastrados no sistema.

### Atributos

| Nome                | Tipo     | Obrigatório | Único | Descrição                              |
| ------------------- | -------- | ----------- | ----- | -------------------------------------- |
| userId              | ObjectId | Sim         | Não   | ID do usuário proprietário do registro |
| name                | String   | Sim         | Não   | Nome do paciente                       |
| birthdate           | Date     | Sim         | Não   | Data de nascimento do paciente         |
| profession          | String   | Não         | Não   | Profissão do paciente                  |
| schooling           | String   | Não         | Não   | Nível de escolaridade do paciente      |
| demands             | String   | Não         | Não   | Demanda do paciente para tratamento    |
| personalAnnotations | String   | Não         | Não   | Anotações pessoais sobre o paciente    |

### Exemplo

```javascript
{
  "_id": "60a2a68c7b4f4d004e9a25d8",
  "userId": "60a2a68c7b4f4d004e9a25d9",
  "name": "João da Silva",
  "birthdate": "1980-01-01T00:00:00.000Z",
  "profession": "Médico",
  "schooling": "Superior",
  "demands": "Dor nas costas",
  "personalAnnotations": "Paciente com histórico de problemas de coluna."
}
```

**Importante**

Observe que os atributos  "name" e "birthdate" são obrigatórios. O atributo "schooling" é um enum com as opções "Fundamental", "Médio" e "Superior".


## Entidade "Timeline"

A entidade "Timeline" representa as linhas do tempo relacionadas aos pacientes cadastrados no sistema.

### Atributos

| Nome        | Tipo                                                     | Obrigatório | Único | Descrição                                       |
| ----------- | -------------------------------------------------------- | ----------- | ----- | ----------------------------------------------- |
| patientId   | ObjectId (referência à entidade "Patient")               | Sim         | Não   | ID do paciente proprietário da linha do tempo   |
| occurrences | Array de ObjectIds (referências à entidade "Occurrence") | Não         | Não   | IDs das ocorrências associadas à linha do tempo |
| serviceName | String                                                   | Sim         | Não   | Nome do serviço relacionado à linha do tempo    |
| createdOn   | Date                                                     | Não         | Não   | Data de criação da linha do tempo               |
| modifiedOn  | Date                                                     | Não         | Não   | Data de modificação da linha do tempo           |

### Exemplo

```javascript
{
  "_id": "60a2a68c7b4f4d004e9a25e1",
  "patientId": "60a2a68c7b4f4d004e9a25d8",
  "occurrences": [
    "60a2a68c7b4f4d004e9a25d9",
    "60a2a68c7b4f4d004e9a25da",
    "60a2a68c7b4f4d004e9a25db"
  ],
  "serviceName": "Fisioterapia",
  "createdOn": "2021-05-16T18:32:47.000Z",
  "modifiedOn": "2021-05-18T08:14:13.000Z"
}
```

**Importante**

Observe que o atributo "patientId" é obrigatório e é uma referência à entidade "Patient". O atributo "occurrences" é um array de referências à entidade "Occurrence". Os atributos "createdOn" e "modifiedOn" têm um valor padrão de "Date.now".


## Entidade "Occurrence"

A entidade "Occurrence" representa uma ocorrência de uma sessão de terapia ou um fato relevante sobre um paciente. Ela contém informações como título, conteúdo, tipo, arquivos anexos, avaliações, pagamento e datas de criação e modificação.

| Atributo    | Tipo                                          | Descrição                                                                                                                                             |
| ----------- | --------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| title       | String                                        | Título da ocorrência.                                                                                                                                 |
| content     | String                                        | Conteúdo da ocorrência.                                                                                                                               |
| files       | Array de objetos com filename e filesize      | Arquivos anexos à ocorrência. Cada objeto possui dois atributos: `filename` (nome do arquivo) e `filesize` (tamanho em bytes).                        |
| type        | String                                        | Tipo da ocorrência, com valores permitidos definidos pelo enum `["session", "relevant_fact", "attachment", "assessment"]`.                            |
| assessments | Objeto contendo três objetos do tipo ObjectId | Avaliações relacionadas à ocorrência. Cada um dos três objetos possui o ID de uma avaliação do tipo interview, tests ou observation.                  |
| payment     | Objeto contendo value, method e status        | Informações sobre o pagamento da ocorrência. Os atributos são: `value` (valor pago), `method` (método de pagamento) e `status` (status do pagamento). |
| createdOn   | Date                                          | Data de criação da ocorrência.                                                                                                                        |
| modifiedOn  | Date                                          | Data da última modificação da ocorrência.                                                                                                             |

**Exemplo:**

```javascript
{
  "title": "Sessão 1",
  "content": "Hoje conversamos sobre...",
  "files": [
    {
    "filename": "anexo1.pdf",
    "filesize": 128000
    },
    {
    "filename": "anexo2.pdf",
    "filesize": 72000
    }
  ],
  "type": "session",
  "assessments": {
    "interview": "61711d13c799a3347f3ec6f3",
    "tests": null,
    "observation": null
  },
  "payment": {
    "value": 150.00,
    "method": "Cartão de crédito",
    "status": "Aprovado"
  },
  "createdOn": "2022-03-10T13:50:00.000Z",
  "modifiedOn": "2022-03-10T13:50:00.000Z"
}
```

**Importante**

Nesta entidade somente o atributo type é obrigatório. Caso queira criar uma avaliação, passe para o backend type: "assessment" e já serão criadas as occurrences relacionadas.


## Entidade "Assessment"

A entidade "Assessment" representa uma avaliação psicológica. Ela pode ser uma entrevista, uma aplicação de testes ou uma observação comportamental.

| Atributo    | Tipo             | Descrição                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| ----------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| type        | String           | Tipo de avaliação. Deve ser uma das opções do enum ["interview", "tests", "observation"]. É um campo obrigatório.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| status      | String           | Status da avaliação. Deve ser uma das opções do enum ["pending", "done"]. É um campo obrigatório.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| interview   | Array de objetos | Array de objetos que representam as perguntas e respostas de uma entrevista. Cada objeto deve conter os seguintes campos: <ul><li>abstract (String) - Pergunta</li><li>textAnswer (String) - Resposta em texto</li><li>optionAnswer (String) - Resposta de múltipla escolha</li></ul>                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| tests       | Array de objetos | Array de objetos que representam os testes realizados. Cada objeto deve conter os seguintes campos: <ul><li>type (String) - Tipo de teste. Deve ser uma das opções do enum ["attention", "memory", "intelligence"]. É um campo obrigatório.</li><li>name (String) - Nome do teste. É um campo obrigatório.</li><li>points (Number) - Pontuação obtida no teste. É um campo obrigatório.</li><li>percentile (Number) - Percentil obtido no teste. É um campo obrigatório.</li><li>result (String) - Resultado do teste. Deve ser uma das opções do enum ["low", "average-low", "average", "average-high", "high"]. É um campo obrigatório.</li><li>observation (String) - Observações adicionais sobre o teste.</li></ul> |
| observation | String           | Observações adicionais sobre a avaliação.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |

**Exemplo:**

```javascript
{
  type: "interview",
  status: "done",
  interview: [
    {
      abstract: null,
      question: "Qual é a sua idade?",
      textAnswer: "25 anos",
      optionAnswer: ""
    },
    {
      abstract: null,
      question: "Você já teve algum problema de saúde mental?",
      textAnswer: "",
      optionAnswer: "Sim"
    }
  ],
  tests: [
    {
    type: "attention",
    name: "Teste de Atenção Sustentada",
    points: 72,
    percentile: 60,
    result: "average",
    observation: ""
    },
    {
    type: "memory",
    name: "Teste de Memória Verbal",
    points: 42,
    percentile: 30,
    result: "low",
    observation: "O paciente apresentou dificuldades para recordar palavras"
    }
  ],
  observation: "O paciente se mostrou bastante cooperativo durante a avaliação"
}
```

**Importante**

Apesar do exemplo abarcar todos os registros possíveis, você irá adicionar somente um deles por vez. Por exemplo, numa avaliação de tipo "interview", você vai preencher somente a chave interview e não vai enviar as outras. 