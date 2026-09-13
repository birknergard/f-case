enum LocationType {
  OCEAN = "Sjø",
  LAND = "Land",
}

export interface FishFacility {
  id: string;
  name: string;
  species: Species[]; //TODO: may be datatype later
  organizations: Organization[];
  locationType: LocationType;
  creationDate: Date;
}

export interface Species {
  id: string;
  name: string;
}

export interface Organization {
  id: string;
  name: string;
}
