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

## Fremgangsmetode for utviklingen
Jeg startet med å laste ned skjelletet backenden for prosjektet gjennom Spring initializr (start.spring.io). Jeg bruker Neovim så jeg har ikke tilgang til prosjekt-generasjon slik som i Intellij Idea.

Deretter jobbet jeg med å sette opp den generelle infrastrukturen: ExceptionHandler og H2 Database, samt gjøre en del research på hvordan Spring boot funker, siden jeg har svært lite erfaring med rammeverket.

Så kartla jeg FacilityDto modellen, som et utgangspunkt for data-modelleringen. Jeg brukte denne som utgangspunkt, og laget et ER-diagram for H2-databasen.

## Vurderinger for skalering
* FishController og OrganizationController er lagt opp for å videreutvikles senere. Tabellene i databasen kan få flere felter over tid, og begge har distinkte Repo klasser. De har ikke DTO klasser da de ikke hentes ut på noen måte som krever det.  

## Generelle videreutviklings ideer, ting jeg ikke hadde tid til
* Data validering på backend (f. eks.dato, stedstype). Dersom man kun bruker frontend blir det ingen problemer (slik det er nå), men det bør være trygg request validering på controllerne.

* ORM (Object Relational Mapping) bør vurderes for mindre sjanse for feilaktig data, bedre developer-experience og enklere debugging.

* Filtrering/søk av liste på frontend.

* Query-baserte spørringer til backend. For eksempel et endpoint som kun henter anlegg med en spesifikk fisk.

* Bedre kartlegging av error i GlobalExceptionHandler. Med mer tid til testing vil man finne exceptions som bør håndteres som andre HTTP feil, fremfor 500 Internal Server Error som mange er nå. Dette er bad practice, feil i serveren bør gi riktige status koder.
#
