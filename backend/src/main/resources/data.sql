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
    location_type VARCHAR(20) NOT NULL,
    created TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS FacilityFish (
    facility_id VARCHAR(36) NOT NULL,
    fish_id VARCHAR(36) NOT NULL,

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

CREATE TABLE IF NOT EXISTS FacilityOrgs (
    facility_id VARCHAR(36) NOT NULL,
    organization_id VARCHAR(36) NOT NULL,

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
    ('2', 'Torsk'),
    ('a', 'Makrell'),
    ('b', 'Sild'),
    ('c', 'Sei');

INSERT INTO organization (id, name)
VALUES
    ('3', 'Example AS'),
    ('4', 'Test Fisheries'),
    ('d', 'Nordic Seafood'),
    ('e', 'Bergen Marine'),
    ('f', 'Ocean Research Institute');

INSERT INTO facility (
    id,
    name,
    location_type,
    created
)
VALUES
    (
        '5a',
        'Oppdrett Bergen',
        'OCEAN',
        CURRENT_TIMESTAMP
    ),
    (
        '6a',
        'Oppdrett Stavanger',
        'OCEAN',
        CURRENT_TIMESTAMP
    ),
    (
        '7a',
        'Fiskefarm Oslo',
        'LAND',
        CURRENT_TIMESTAMP
    ),
    (
        '8a',
        'Forskningsstasjon Tromsø',
        'OCEAN',
        CURRENT_TIMESTAMP
    );


-- Bergen:
--   Laks
--   Torsk
--   Makrell
INSERT INTO FacilityFish (facility_id, fish_id)
VALUES
    (
        '5a',
        '1'
    ),
    (
        '5a',
        '2'
    ),
    (
        '5a',
        'a'
    );


-- Stavanger:
--   Laks
--   Sild
INSERT INTO FacilityFish (facility_id, fish_id)
VALUES
    (
        '6a',
        '1'
    ),
    (
        '6a',
        'b'
    );


-- Oslo:
--   Torsk
--   Sei
INSERT INTO FacilityFish (facility_id, fish_id)
VALUES
    (
        '7a',
        '2'
    ),
    (
        '7a',
        'c'
    );


-- Tromsø:
--   Laks
--   Makrell
--   Sild
--   Sei
INSERT INTO FacilityFish (facility_id, fish_id)
VALUES
    (
        '8a',
        '1'
    ),
    (
        '8a',
        'a'
    ),
    (
        '8a',
        'b'
    ),
    (
        '8a',
        'c'
    );


-- ============================================
-- FACILITY <-> ORGANIZATION
-- MANY-TO-MANY RELATIONSHIPS
-- ============================================

-- Bergen:
--   Example AS
--   Test Fisheries
INSERT INTO FacilityOrgs (facility_id, organization_id)
VALUES
    (
        '5a',
        '3'
    ),
    (
        '5a',
        '4'
    );


-- Stavanger:
--   Test Fisheries
--   Nordic Seafood
INSERT INTO FacilityOrgs (facility_id, organization_id)
VALUES
    (
        '6a',
        '4'
    ),
    (
        '6a',
        'd'
    );


-- Oslo:
--   Example AS
--   Nordic Seafood
--   Bergen Marine
INSERT INTO FacilityOrgs (facility_id, organization_id)
VALUES
    (
        '7a',
        '3'
    ),
    (
        '7a',
        'd'
    ),
    (
        '7a',
        'e'
    );


-- Tromsø:
--   Test Fisheries
--   Bergen Marine
--   Ocean Research Institute
INSERT INTO FacilityOrgs (facility_id, organization_id)
VALUES
    (
        '8a',
        '4'
    ),
    (
        '8a',
        'e'
    ),
    (
        '8a',
        'f'
    );
