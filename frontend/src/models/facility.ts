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
  name: string;
}

export interface Organization {
  name: string;
}
