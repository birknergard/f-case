CREATE TABLE IF NOT EXISTS Fish (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS Organization (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS Facility (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    location_type ENUM('sjø', 'land') NOT NULL,
    created TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS FacilityFish (
    facility_id VARCHAR(36),
    fish_id VARCHAR(36),

    PRIMARY KEY (facility_id, fish_id),

    CONSTRAINT fk_facility_fish
        FOREIGN KEY (facility_id)
        REFERENCES Facility(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_fish_facility
        FOREIGN KEY (fish_id)
        REFERENCES Fish(id)
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS FacilityOrganization (
    facility_id VARCHAR(36),
    organization_id VARCHAR(36),

    PRIMARY KEY (facility_id, organization_id),

    CONSTRAINT fk_facility_orgs
        FOREIGN KEY (facility_id)
        REFERENCES Facility(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_orgs_facility
        FOREIGN KEY (organization_id)
        REFERENCES Organization(id)
        ON DELETE CASCADE
);

INSERT INTO fish (id, name)
VALUES
    ('1', 'Laks'),
    ('2','Torsk'),
    ('3','Makrell'),
    ('4','Sild'),
    ('5','Sei');

INSERT INTO organization (id, name)
VALUES
    ('1','Nordic Havbruk AS'),
    ('2','Fjordlaks Organisasjon'),
    ('3','Norsk Oppdrettsforbund'),
    ('4','Havets Ressurser SA'),
    ('5','Blå Næring Norge'),
    ('6', 'Fjord & Fisk Oppdrett'),
    ('7', 'Nordhavet Akvakultur'),
    ('8', 'Kystens Oppdrettere'),
    ('9', 'Arctic Salmon Group'),
    ('10', 'Vestfjord Havbruk');

INSERT INTO facility (
    id,
    name,
    location_type,
    created
)
VALUES
    (
        '1',
        'Oppdrett Bergen',
        'sjø',
        '2022-03-18 08:42:15'
    ),
    (
        '2',
        'Oppdrett Stavanger',
        'sjø',
        '2023-11-07 13:27:49'
    ),
    (
        '3',
        'Fiskefarm Oslo',
        'land',
        '2025-02-24 16:05:31'
    ),
    (
        '4',
        'Forskningsstasjon Tromsø',
        'sjø',
        '2021-08-12 10:18:06'
    );

INSERT INTO FacilityFish (facility_id, fish_id)
VALUES
    (
        '1',
        '1' 
    ),
    (
        '1',
        '2'
    ),
    (
        '1',
        '3'
    ),
    (
        '2',
        '3'
    ),
    (
        '3',
        '1'
    ),
    (
        '3',
        '4'
    ),
    (
        '4',
        '5'
    );


INSERT INTO FacilityOrganization (facility_id, organization_id)
VALUES
    (
        '1',
        '1'
    ),
    (
        '1',
        '2' 
    ),
    (
        '2',
        '5'
    ),
    (
        '2',
        '7'
    ),
    (
        '3',
        '4'
    ),
    (
        '3',
        '5'
    );
