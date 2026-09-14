## Stack
Backend: Java, Spring Boot

Frontend: TypeScript, React

Database: H2 Database with JDBC.

## Hvordan kjøre applikasjonen

### Docker
```
docker compose up --build
```

### Uten Docker (trenger to terminalvinduer)

I terminalvindu for backend:
```
cd ./backend \
mvn spring-boot:run
```
I terminalvindu for frontend:
```
cd ./frontend \
npm install \
npm run dev
```

## Vurderinger for skalering

## Generelle videreutviklings ideer 
* Data validering på backend (dato, stedstype)
* ORM (Object Relational Mapping)
