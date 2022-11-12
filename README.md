# Backend Node Template

## ✅ Primero lo primero: instalar las dependencias iniciales del proyecto antes de trabajar:

```
npm install
```

## 🚩 Recomendaciones:

Utilizar la versión de Node v14.x

## 💡 El proyecto utliza Sequelize como ORM. Comandos utiles del CLI:

### Como generar un modelo desde cero

```
npx sequelize model:generate --name Ejemplo --attributes ejemplo:string
```

### Crear la base de datos

```
npx sequelize db:create
```

### Migrar modelos creados previamente

```
npx sequelize db:migrate
```

### Borrar la base de datos que creamos

```
npx sequelize db:drop
```

## 🏗 Algunos datos del proyecto:

- La estructura de carpetas es del patron MVC
- Las respuestas positivas las devuelve como un objecto. Las negativas las gestiona como un HTML
- En el proyecto encontrarán un ejemplo de como se implementa el flujo de información dentro de la app.
- Para el flujo de trabajo utilizaremos Gitflow. Para el mismo deberan crear una rama con el numero de tarjeta con el que esten trabajando

![image](https://user-images.githubusercontent.com/79473217/193649836-2720c8f4-a038-4014-b9a5-c515a9aee273.png)

- Cuando el trabajo este terminado, se debe generar el "Pull Request" o PR como le solemos llamar. El proyecto ya cuenta con un template de PR, por lo que ustedes solo tendran que completar con los datos que les indica el template. Esta seria una imagen de ejemplo de un PR con su evidencia en caso de falla y su caso de éxito.

![image](https://user-images.githubusercontent.com/79473217/193650283-f9d52ece-3548-4a27-8cbf-63fc9fcf72e2.png)

- Las respuestas positivas se gestionan con el helper enpodintResponse, y los negativos con createHtppError de la libreria http-errors.
  Ejemplo de satisfactoria

Ejemplo de respuesta negativa:
![image](https://user-images.githubusercontent.com/79473217/193651690-f0081ce6-9d2e-43ca-9986-bec8a9082d7f.png)

## 🚑 Helpers basicos:

### catchAsync

Es una función para estandarizar la forma en la que se crean los metodos en los controladores. Para ver mas buscar en helpers/catchAsync.js

### endpointResponse:

Estructura las respuestas positivas de toda la app. Dentro del archivo helpers/success.js podran ver que parametros le pueden pasar.

### ErrorObject:

Un objecto de error, el cual puede recibir varios atributos (pueden verlo en helpers/error.js)
El mismo es una extensión de el objecto Error nativo de JS. Sirve para devolver errores cuando esten por fuera del controlador, y que los errores sean interceptados por el CATCH que tendran en los controllers.

### Seeders de usuarios

firstName: 'Mandy'
lastName: 'Pyford'
email: 'mpyford0@xinhuanet.com'
password: '7H1szhPEcLL7'

firstName: 'Tessy'
lastName: 'Hutchinges'
email: 'thutchinges1@archive.org'
password: '212Ztu0rl5o'

firstName: 'Sharron'
lastName: 'De Haven'
email: 'sdehaven2@phoca.cz'
password: 'OTzTrVCp3J3m'

firstName: 'Wanda'
lastName: 'Grushin'
email: 'wgrushin3@reuters.com'
password: 'LF8c4ZDz'

firstName: 'Janice'
lastName: 'Tankard'
email: 'jtankard4@vinaora.com'
password: 'pXm0XtY'

firstName: 'Iosep'
lastName: 'Peasey'
email: 'ipeasey0@creativecommons.org'
password: 'YTEyvDMR'

firstName: 'Nancey'
lastName: 'Garstan'
email: 'ngarstan1@devhub.com'
password: 'pX7PyBdw8HU''

firstName: 'Anna'
lastName: 'Templeman'
email: 'atempleman2@japanpost.jp'
password: '2pJZiofG4'

firstName: 'Amber'
lastName: 'Altoft'
email: 'aaltoft3@redcross.org'
password: 'uOqTWaYbRMo'

firstName: 'Nefen'
lastName: 'Muslim''
email: 'nmuslim4@cam.ac.
password:'yiL1ltQOGFm'

firstName: 'Germayne'
lastName: 'Clarycott'
email: 'gclarycott5@reference.com'
password: 'LWe6lVJa0WF'

firstName: 'Avie'
lastName: 'Lowrey'
email: 'alowrey6@phpbb.com'
password: 'Kqcixc5K'

firstName: 'Mozes'
lastName: 'Top'
email: 'mtop7@soup.io'
password: 'ckMz9Ez6G'

firstName: 'Tybie'
lastName: 'Rennebach'
email: 'trennebach8@bloomberg.com'
password: '7IAaTG'

firstName: 'Myrna'
lastName: 'Follos'
email: 'mfollos9@sogou.com'
password: 'qKy1AS3IiBgP'

firstName: 'Inna'
lastName: 'Noen'
email: 'inoena@umich.edu'
password:'9Ys3pFEoUXS'

firstName: 'Lloyd'
lastName: 'Germain'
email: 'lgermainb@nbcnews.com'
password: 'sZ1zQsCssPLL'

firstName: 'Justine'
lastName: 'Segoe'
email: 'jsegoec@ftc.gov'
password: 'sYdwaw95'

firstName: 'Miriam'
lastName: 'Itzkovwitch'
email: 'mitzkovwitchd@shareasale.com'
password: 'BODQaMiL'

firstName: 'Cordey'
lastName: 'Disman'
email: 'cdismane@kickstarter.com'
password: 'r8psQsZTB1F'
