# Eventløsning Frontend, Setup and documentation

## Commands
### Installing dependencies
  
```bash
npm install
```

### Running application locally

```bash
npm run dev
```

### Building For Production

To build this application for production:

```bash
npm run build
```

## Styling

This project uses [styled-components](https://styled-components.com/) for styling, along with the global css file "src/styled.css".

## Formatting

This project uses [prettier](https://prettier.io/) for formatting.

```bash
npm run format
```

## Routing

This project uses [TanStack Router](https://tanstack.com/router). The initial setup is a file based router. Which means that the routes are managed as files in `src/routes`.

### Adding A Route

To add a new route to your application just add another a new file in the `./src/routes` directory.

TanStack will automatically generate the content of the route file for you.

Now that you have two routes you can use a `Link` component to navigate between them.

### Adding Links

To use SPA (Single Page Application) navigation you will need to import the `Link` component from `@tanstack/react-router`.

```tsx
import { Link } from "@tanstack/react-router";
```

Then anywhere in your JSX you can use it like so:

```tsx
<Link to="/about">About</Link>
```

This will create a link that will navigate to the `/about` route.

More information on the `Link` component can be found in the [Link documentation](https://tanstack.com/router/v1/docs/framework/react/api/router/linkComponent).

### Using A Layout

In the File Based Routing setup the layout is located in `src/routes/__root.tsx`. Anything you add to the root route will appear in all the routes. The route content will appear in the JSX where you use the `<Outlet />` component.

Here is an example layout that includes a header:

```tsx
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import { Link } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <>
      <header>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
        </nav>
      </header>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});
```

The `<TanStackRouterDevtools />` component is not required so you can remove it if you don't want it in your layout.

More information on layouts can be found in the [Layouts documentation](https://tanstack.com/router/latest/docs/framework/react/guide/routing-concepts#layouts).

## Data Fetching

There are multiple ways to fetch data in your application. You can use TanStack Query to fetch data from a server. But you can also use the `loader` functionality built into TanStack Router to load the data for a route before it's rendered.

For example:

```tsx
const peopleRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/people",
  loader: async () => {
    const response = await fetch("https://swapi.dev/api/people");
    return response.json() as Promise<{
      results: {
        name: string;
      }[];
    }>;
  },
  component: () => {
    const data = peopleRoute.useLoaderData();
    return (
      <ul>
        {data.results.map((person) => (
          <li key={person.name}>{person.name}</li>
        ))}
      </ul>
    );
  },
});
```

Loaders simplify your data fetching logic dramatically. Check out more information in the [Loader documentation](https://tanstack.com/router/latest/docs/framework/react/guide/data-loading#loader-parameters).

### React-Query

React-Query is an excellent addition or alternative to route loading and integrating it into you application is a breeze.

First add your dependencies:

```bash
npm install @tanstack/react-query @tanstack/react-query-devtools
```

Next we'll need to create a query client and provider. We recommend putting those in `main.tsx`.

```tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// ...

const queryClient = new QueryClient();

// ...

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>,
  );
}
```

You can also add TanStack Query Devtools to the root route (optional).

```tsx
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const rootRoute = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <ReactQueryDevtools buttonPosition="top-right" />
      <TanStackRouterDevtools />
    </>
  ),
});
```

Now you can use `useQuery` to fetch your data.

```tsx
import { useQuery } from "@tanstack/react-query";

import "./App.css";

function App() {
  const { data } = useQuery({
    queryKey: ["people"],
    queryFn: () =>
      fetch("https://swapi.dev/api/people")
        .then((res) => res.json())
        .then((data) => data.results as { name: string }[]),
    initialData: [],
  });

  return (
    <div>
      <ul>
        {data.map((person) => (
          <li key={person.name}>{person.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
```

You can find out everything you need to know on how to use React-Query in the [React-Query documentation](https://tanstack.com/query/latest/docs/framework/react/overview).

## openapi-typescript-codegen

This project uses [openapi-typescript-codegen](https://https://www.npmjs.com/package/openapi-typescript-codegen) for generating API calls.

```bash
npm run generate:api
```
The code is generated to the directory 'src/generated/'.

## TanStack documentation

You can learn more about all of the offerings from TanStack in the [TanStack documentation](https://tanstack.com).

# What is the next steps?

### Kjente bugs / undefined behaviour

* Dersom man endrer en event med aktiviteter til datorekkevidde som er utenfor aktivitetens opprinnelige dato, vil aktivitetene ikke lengre vises, men fortsatt eksistere på eventet.

* DatePicker har uforventet oppførsel, ikke basert på routing men initial innlastning av siden. Man kan se dette dersom man endrer en events dato (/admin/$eventId/edit/info), og navigerer frem og tilbake.

### Admnistrator sider

#### Opprett påmeldingsskjema

- Aktiviteter av typen "Aktivitet" (markert med oransje farge), laget i tidslinjen, skal automatisk overføres til siden "Opprett påmeldingsskjema". Aktivitetene skal befinne seg i en egen seksjon i bunnen. _Se Figma prototype_

- Skal kunne forhåndsvise påmeldingsskjemaet, før det publiseres. En knapp med navn "Forhåndsvisning" skal plasseres ved siden av "Publiser" knappen. _Se Figma prototype_

- Når et event publiseres, ser admin en `toast` om publisering var vellykket. I Figma prototypen, er det et forslag til en mer utfyllende modal, bestående av to deler.
  1. En modal som viser en kort oppsummering av det man er i ferd med å publisere. Her kan man velge å avbryte eller publisere. _Se Figma prototype_
  2. En modal som viser en godkjennelse på at publiseringen var vellykket. _Se Figma prototype_

#### Påmeldingsstatus / Dashbord

- Når et event er markert som "Aktiv" skal admin fra "Arrangementoversikt" siden, kunne trykke på eventet for å se påmeldingsstatus/dashbord.
- Admin skal her kunne se all påmeldingsinformasjon. En side meny skal inneholde 4 tabs
  1. Oversikt
  - Se alle inviterte
  - Se alle påmeldte
  - Se alle som ikke kommer
  - Se alle som ikke har svart
  - Kunne exportere en eller alle lister til excel.
  - _Se Figma prototype_
  2. Deltakere
  - Se alle inviterte
  - Trykke inn på en person og see all påmeldingsinformasjon
  - Kunne redigere påmeldingsinformasjon
  - Kunne exportere en eller alle lister til excel.
  - _Se Figma prototype_
  3. Kommunikasjon
  - Kunne sende mail/melding til en, noen eller en gruppe
  - _Mangler Figma prototype_
  4. Event
  - Mulighet for å endre informasjon i eventet etter at det er publisert?
  - _Mangler Figma prototype_

### Bruker sider

#### Arrangement detaljer

- Bruker trykker inn på et event og blir tatt til "Arrangement detaljer" siden. Her får de informasjon om alle aktiviteter på turen og kan trykke "Jeg kommer ikke" eller "Meld deg på".
- Trykkes _jeg kommer ikke_ må registrerings status oppdateres, da man i dag kun får en `toast` med "Påmelding feilet, mangler implementasjon". En modal hvor man kan fortelle om hvorfor man ikke kan komme, vil komme opp. _Se Figma prototype_
- Trykkes _meld deg på_ skal bruker bli tatt til påmeldingsskjemaet som admin har laget. _Se Figma prototype_ Per i dag vises kun en `toast` med "Påmelding feilet, mangler implementasjon"
- Når bruker har fylt ut påmeldingsskjema og trykker "Påmeld", skal en modal vise at påmelding var vellykket. _Se Figma prototype_

#### Videre arbeid, ikke prototypet i Figma

- Bruker må kunne se sin påmeldingsinformasjon i etterkant.
- Bruker må kunne endre sin påmeldingsinformasjon i etterkant, frem til påmeldingsfristen.

### Publisering og deployment

Innen for pipeline kjører vi en produksjonsversjon av generate:api (generate:api-prod). Denne gjør et kall mot backend-serveren som er publisert, henter ut OpenAPI grensesnittet, og genererer funksjon og datamodeller som brukes i frontend løsningen. Det er dermed viktig at backend serveren publiseres før frontend, slik at frontenden kan gjøre kall mot backend før deployment.

