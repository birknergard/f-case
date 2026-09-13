package com.fcase.facility;

import com.fcase.facility.repos.FacilityRepo;
import com.fcase.facility.repos.FishRepo;
import com.fcase.facility.repos.OrganizationRepo;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class FacilityFactory {
  private final FacilityRepo facilities;
  private final FishRepo fishes;
  private final OrganizationRepo orgs;

  public List<FacilityDto> getAll() {
    var facilities = this.facilities.fetchAll();
    return facilities.stream().map(f -> new FacilityDto(f)).toList();
  }

  public FacilityDto get(Double facilityId) {
    var details = this.facilities.fetch(facilityId);
    var fishes = this.fishes.fetchByFacility(facilityId);
    var orgs = this.orgs.fetchByFacility(facilityId);

    return new FacilityDto(details, fishes, orgs);
  }

  public FacilityDto create(FacilityDto dto) {
    List<Double> fish_ids = dto.getSpecies().stream().map((f) -> f.getId()).toList();
    List<Double> org_ids = dto.getOrgs().stream().map((f) -> f.getId()).toList();

    var details = this.facilities.create(dto.getDetails(), fish_ids, org_ids);
    return new FacilityDto(details);
  }

  public FacilityDto update(FacilityDto dto) {
    var details = this.facilities.update(dto.getDetails());
    return new FacilityDto(details);
  }

  // Deletes linked values through cascade so this is sufficient
  public Double remove(Double facilityId) {
    return this.facilities.remove(facilityId);
  }
}
