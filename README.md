# dry_cleaning

Веб-приложение для химчистки. Стек технологий Spring Boot + React.js + PostgreSQL.

## Серверная часть

Технологии для запуска:
* Java
* PostgreSQL
* Maven

Предварительно в PostgreSQL создаётся база данных с именем dry_cleaning.

Серверная часть приложения находится в папке demo. В папке src/main/resources откройте файл application.properties. Нужно указать порт базы данных, имя пользователя, пароль и порт сервера.  
```
spring.datasource.url= jdbc:postgresql://localhost:5432/dry_cleaning
spring.datasource.username= postgres
spring.datasource.password= 123
server.port=8081
```
В папке controller/OrderController.java проверьте источник запросов

```@CrossOrigin(origins = "http://localhost:8081")```

Запустите приложение

```mvn spring-boot:run```

## Клиентская часть

Технологии для запуска:
* Node.js

Клиентская часть приложения находится в папке react-crud. В папке src/http-common.js проверьте URL-адрес 

```baseURL: "http://localhost:8081/api"```

Осуществите установку зависимостей 

```npm install bootstrap```

```npm install axios```

```npm install react-router-dom```


Запустите приложение

```npm start```

Откройте приложение в браузере 

```http://localhost:8081/```



