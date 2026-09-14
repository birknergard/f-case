## Stack
Backend: Java, Spring Boot

Database: H2 minnedatabase med JDBC-API (SQL)

Frontend: TypeScript, React

## Hvordan kjøre applikasjonen

### Docker

Dersom du har docker-cli installert kan du kjøre denne kommandoen:
```
docker compose up --build
```
Appen er tilgjengelig gjennom addressen: http://localhost:3000

### Uten Docker (trenger to terminalvinduer)

I terminalvindu for backend (krever maven):
```
cd ./backend \
mvn spring-boot:run
```
I terminalvindu for frontend (krever npm):
```
cd ./frontend \
npm install \
npm run dev
```

Appen er tilgjengelig gjennom addressen: http://localhost:3000

## Fremgangsmetode for utviklingen
Jeg startet med å laste ned skjelettet backenden for prosjektet gjennom Spring initializr (start.spring.io). Jeg bruker Neovim så jeg har ikke tilgang til prosjekt-generasjon slik som i Intellij Idea.

Deretter satt jeg opp infrastruktur for frontend, hvor jeg tok utgangspunkt strukturen fra bachelorprosjektet mitt.

Deretter jobbet jeg med å sette opp den generelle infrastrukturen: Dependencies, plugins, oppsett av H2 Database, og ExceptionHandler, samt gjøre en del research på hvordan Spring boot funker, siden jeg har svært lite erfaring med rammeverket.

Så kartla jeg FacilityDto modellen, som et utgangspunkt for data-modelleringen. Jeg brukte denne som utgangspunkt, og laget et ER-diagram for H2-databasen (se bilde "ER_DIAGRAM.png"). Så lagde jeg data.sql filen for oppsett av databasen.

Deretter begynte jeg utviklingen av ControllerFacility, spesifikt getFacility og getFacilities. 

Når disse var ferdige begynte jeg å lage frontend. Her startet jeg med å sette opp navigasjon mellom sidene. Så lagde jeg facilityForm.tsx, slik at jeg kunne teste fremtidige skriv-operasjoner (delete, put, post) gjennom grensesnittet. I denne konteksten satt jeg opp FishController og OrganizationController på backend for å hente de statisk listene med valg.

Parallelt med dette utviklet jeg skriv-operasjonene postFacility, putFacility, og deleteFacility. Da disse var ferdige koblet jeg dem med facilityForm, hvor jeg fikk testet og fikset feil.

Når dette var ferdig finpusset jeg stylingen og gjorde diverse opprydning og bugfixing på både frontend og backend. Jeg satt også opp kontainerisering med Docker, hvor jeg testet med en annen maskin.

## Backend-frontend tilknytning
Prosjektet bruker openapi-typescript-codegen for å generere API grensensnitt i frontend, basert på OpenApi docs fra backend. Dette gjør det mye enklere å iterere på backend, da man ikke trenger å skrive api-boilerplate på frontend.

## Testing
Jeg har ikke gjort noen unit testing. Har testet applikasjonen manuelt, eller gjennom frontend-kode gjennom hele prosessen.

## Vurderinger for skalering
* FishController og OrganizationController er lagt opp for å videreutvikles senere. Tabellene i databasen kan få flere felter over tid, og begge har distinkte Repo klasser. De har ikke DTO klasser da de ikke hentes ut på noen måte som krever det.  

## Generelle videreutviklings ideer, ting jeg ikke hadde tid til
* Verktøy for database-migrasjoner. Prøvde litt Flyway men hadde ikke tid til å fikse det så ga opp.

* Data validering på backend (f. eks.dato, stedstype). Dersom man kun bruker frontend blir det ingen problemer (slik det er nå), men det bør være trygg request validering på controllerne.

* ORM (Object Relational Mapping) bør vurderes for mindre sjanse for feilaktig data, bedre developer-experience og enklere debugging.

* Filtrering/søk av liste på frontend.

* Query-baserte spørringer til backend. For eksempel et endpoint som kun henter anlegg med en spesifikk fisk.

* Bedre kartlegging av error i GlobalExceptionHandler. Med mer tid til testing vil man finne exceptions som bør håndteres som andre HTTP feil, fremfor 500 Internal Server Error som mange er nå. Dette er bad practice, feil i serveren bør gi riktige status koder.
#
