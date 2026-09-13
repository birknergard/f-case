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

  public FacilityDto getDto(String facilityId) {
    var details = this.facilities.fetch(facilityId);
    var fishes = this.fishes.fetchByFacility(facilityId);
    var orgs = this.orgs.fetchByFacility(facilityId);

    return new FacilityDto(details, fishes, orgs);
  }
}
