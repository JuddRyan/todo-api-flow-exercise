# A RESTful Todo-API

## Introductie

In deze demo maak je een API waarmee je een todo lijstje kan maken. Je gebruikt hiervoor Express, FileSystem, SQLlite3, Middleware en we eindigen met het opzetten van ESLint.

## Overzicht

We doorlopen verschillende stappen:
- [Stap 1: Opzetten van je programmeeromgeving](#stap-1-opzetten-van-je-programmeeromgeving)
- [Stap 2: TodoFile verder uitwerken](#stap-2-todofile-verder-uitwerken)
- [Stap 3: Maak je API endpoints](#stap-3-maak-je-api-endpoints)
- [Stap 4: Vervang wegeschrijven naar je filesystem met SQLite](#stap4-vervang-wegschrijven-naar-je-filesystem-met-sqlite)
- [Stap 5: Implementeer middleware](#stap-5-implementeer-middleware)
- [Final: Voeg ESLint toe](#final-voeg-eslint-toe)

## Stap 1: Opzetten van je programmeeromgeving

We doorlopen volgende stappen:

- [Installeer Express JS](https://expressjs.com/)
- [Installeer JSON bodyparser middleware](https://www.npmjs.com/package/body-parser)
- [Installeer dotenv en maak een .env bestand aan](https://www.npmjs.com/package/dotenv)
- Maak een Express JS applicatie aan en gebruik de JSON bodyparser als middleware.
- Haal het poortnummer van je server (6001) uit het dotenv bestand en gebruik deze voor het lanceren van je Express applicatie.
- Maak een eigen logging systeem:
  - [Installeer Chalk](https://www.npmjs.com/package/chalk)
  - Lees de documentatie van Chalk, je kan met deze bibliotheek kleurtjes geven aan je fouten in de console.
  - Maak in een `/src/lib/` folder de file `Logger.js`. Dit is een ES6 module met daarin 6 verschillende functies:
      - `info()`: geeft blauwe tekst in de console
      - `stressedInfo()`: geeft tekst met een blauwe achtergrond in de console
      - `error()`: geeft rode tekst in de console
      - `stressedError()`: geeft tekst met een rode achtergrond in de coonsole
      - `warning()`: geeft oranje tekst in de console (lees de documentatie zodat je weet hoe je dit moet doen)
      - `stressedWarning()`: geeft tekst met een blauwe achtergrond in de coonsole (lees de documentatie zodat je weet hoe je dit moet doen)
      - `json()`: zorgt dat een JSON object wordt uitgeschreven in de console als tekst. De tekst zelf staat in een grijze kleur.
- We starten in deze stap met het opslaan van je `todo.json` bestand in een `data` folder vanaf je root.
  - Maak in je `/src/lib` folder een file `TodoFile.js`. Je maakt hierin een klasse met verschillende functies (zie volgende stappen). Voor nu volstaat:
    - `save()`: dit is een functie waarmee we een JSON bestand wegschrijven in je `data` folder. Voor het aanmaken, wijzigen en wegeschrijven van bestanden gebruik je de [File System module van Node.js](https://nodejs.org/api/fs.html).
- Maak in je Express applicatie een test-functie (bijv. `testToDos`) om een lege array weg te schrijven met daarin een object:
    ```json
    [{
      success: "success!"
    }]
    ```

## Stap 2: TodoFile verder uitwerken
Werk verder op het bestand `TodoFile.js` dat je maakte in stap 1:
- Schrijf een `get()` functie in TodoFile.js om je array op te halen
- Installeer [uuid](https://www.npmjs.com/package/uuid)
- Maak een nieuw todo item en bewaar via een `add(description)` functie. Een todo item heeft een beschrijving en een id:
  ```json
    {
      "id": "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6",
      "description": "Mijn eerste todo item"
    }
  ```
- Gebruik voor het genereren van je id het pakket `uuid` en maak een v4 id.
- Maak een `update(id, description)` functie aan om een todo te wijzigen. Gebruik de id om je todo op te zoeken in je bestand.
- Maak een `delete(id)` functie aan om een todo te verwijderen. Gebruik de id om je todo op te zoeken in je bestand.
- Zorg dat je overal error handling toevoegt met je de `Logger` die je maakte in stap 1 zodat je weet waar er zich een probleem voordoet.
- Test de functies met de test-functie die je maakte in Stap 1.

## Stap 3: Maak je API endpoints
- Maak in je `src`-folder een actions folder, met daarin een folder voor je todo-acties.
- Maak een `crudTodo.js` bestand, met daarin je CRUD (Create, Read, Update & Delete) bewerken die binnenkomen en buitengaan in je API. De `todo` parameter in onderstaande functies slaat op een instantie van je ToDoFile:
  - `getTodos(todo, request, response)`: voor het ophalen van je todos
  - `addTodo(todo, request, response)`: voor het toevoegen van een todo
  - `updateTodo(todo, request, response)`: voor het updaten van een todo
  - `deleteTodo(todo, request, response)`: voor het verwijderen van een todo
- Zorg dat je je fouten goed afhandelt en je, wanneer het fout loopt, de juiste [http response code](https://developer.mozilla.org/nl/docs/Web/HTTP/Status) stuurt naar je client.
- De data die binnenkomt via je API moet voldoen aan een aantal voorwaarden. Maak daarom een `parseTodo` functie in een afzonderlijk bestand waarmee je controleert of die data voldoet:
  - Er moet een `todo` aanwezig zijn.
  - In een `todo` moet een description zitten.
- Maak een functie waarmee je de verschillende endpoints registreert in je Express app.
  - Maak in je actions folder een `registerTodoEndpoints.js` met daarin een functie die aan je Express app volgende endpoints toevoegt:
    - POST "/todos"
    - GET "/todos"
    - PUT "/todos"
    - DELETE "/todos"
- Spreek de `registerTodoEndpoints([Instantie Express App])` aan in je `index.js`-bestand van je applicatie.
- Gebruik [Postman](https://www.postman.com/) om je API te testen.

## Stap 4: Vervang wegschrijven naar je filesystem met SQLite
- [Installeer SQLite](https://www.npmjs.com/package/sqlite3).
- [Installer Knex](https://www.npmjs.com/package/knex).
- Maak een nieuwe folder `db` aan in de root van je applicatie.
- Maak een SQLite database aan in je nieuwe folder: je geeft een leeg bestand de naam `todos.sqlite3`.
- Download en installeer de [SQLite Browser](https://sqlitebrowser.org/).
- Met de SQLite Browser kan je je `todos.sqlite3` openen en een database schema maken:
  - Maak een tabel `todos`.
  - Definieer twee velden in je tabel:
    - `id`: deze is van het type INTEGER, kent geen Non Nullable fields, is de Primary Key en incrementeert automatisch.
    - `description`: deze is van het type TEXT.
- Schrijf je aanpassingen weg naar je bestand door te klikken op `Write Changes`.
- Maak een nieuw bestand aan in je `db`-folder: `knexTodos.js`.
- [Knex](https://knexjs.org/) is een manier om makkelijk(er) te communiceren met databases zoals MSSQL, MySQL, ... en ook SQLite3. De library laat je toe om op een makkelijke en begrijpbare manier data toe te voegen, te wijzigen, te verwijderen, op te halen, etc.
- Maak in je nieuwe `knexTodos.js` een functie die een `knex`-object teruggeeft, geconnecteerd aan jouw SQLite3 database.
- Maak in je `lib`-folder een nieuw bestand `TodoDb.js` en maak verschillende functies aan die gelijkaardig zijn aan je `TodoFile.js`, met dit verschil dat je nu je data zal wegschrijven naar een SQLite3 database. Lees de documentatie van Knex erop na zodat je weet hoe je dit kan aanpakken.
- Pas je endpoints aan zodat deze nu gebruik maken van `TodoDb.js` in plaats van `TodoFile.js`.
- Je API zou op dezelfde manier moeten werken (zelfde HTTP methods) alleen wordt data nu naar je database geschreven.

## Stap 5: Implementeer middleware

- Met Express JS kan je [middleware](https://expressjs.com/en/guide/using-middleware.html) gebruiken en zelf maken.
- Maak in je `src`-folder een mapje `middleware` aan.
- Maak `auth` middleware waarmee je authenticatie simuleert. Gebruik hiervoor een eenvoudige boolean.
- Maak een `todofilter` middleware die de binnenkomende data zal scannen op taalgebruik.
- UITBREIDING: maak een afzonderlijk bestand in `data/filterdata.js` met daarin een lijst van woorden die een user niet mag gebruiken bij het sturen van zijn/haar todo item.

## Final: Voeg ESLint toe
- Valideer en fix je code door [ESlint](https://eslint.org/) te installeren (incl. [airbnb styles](https://www.npmjs.com/package/eslint-config-airbnb)) met: `npm install eslint eslint-config-airbnb-base --save-dev`.