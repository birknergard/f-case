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
* FishController og OrganizationController er lagt opp for å videreutvikles senere. Tabellene i databasen kan få flere felter over tid, og begge har distinkte Repo klasser. De har ikke DTO klasser da de ikke hentes ut på noen måte som krever det.  


## Generelle videreutviklings ideer, ting jeg ikke hadde tid til
* Data validering på backend (f. eks.dato, stedstype). Dersom man kun bruker frontend blir det ingen problemer (slik det er nå), men det bør være trygg request validering på controllerne.

* ORM (Object Relational Mapping) bør vurderes for mindre sjanse for feilaktig data, bedre developer-experience og enklere debugging.

* Filtrering/søk av liste på frontend.

* Query-baserte spørringer til backend. For eksempel et endpoint som kun henter anlegg med en spesifikk fisk.
#
