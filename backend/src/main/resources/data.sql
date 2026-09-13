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

CREATE TABLE IF NOT EXISTS FacilityAffiliate (
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
    ('11111111-1111-1111-1111-111111111111', 'Laks'),
    ('22222222-2222-2222-2222-222222222222', 'Torsk');

INSERT INTO organization (id, name)
VALUES
    ('33333333-3333-3333-3333-333333333333', 'Example AS'),
    ('44444444-4444-4444-4444-444444444444', 'Test Fisheries');

INSERT INTO facility (
    id,
    name,
    location_type,
    created
)
VALUES
    (
        '55555555-5555-5555-5555-555555555555',
        'Oppdrett Bergen',
        'OCEAN',
        CURRENT_TIMESTAMP
    );
