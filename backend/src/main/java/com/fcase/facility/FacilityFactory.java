package com.fcase.facility;

import com.fcase.fish.FishRepo;
import com.fcase.interfaces.DataEntry;
import com.fcase.organization.OrganizationRepo;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class FacilityFactory {
  private final FacilityRepo facilities;
  private final FishRepo fishes;
  private final OrganizationRepo orgs;

  private List<String> getIdList(List<? extends DataEntry> input) {
    return input.stream().map((f) -> f.getId()).toList();
  }

  public List<FacilityDto> getAll() {
    var facilities = this.facilities.queryAll();
    return facilities.stream().map(f -> new FacilityDto(f)).toList();
  }

  public FacilityDto get(String facilityId) {
    var details = this.facilities.queryById(facilityId);
    var fishes = this.fishes.queryByFacility(facilityId);
    var orgs = this.orgs.queryByFacility(facilityId);

    return new FacilityDto(details, fishes, orgs);
  }

  public FacilityDto create(FacilityDto dto) {
    var fish_ids = getIdList(dto.getFish());
    var org_ids = getIdList(dto.getOrganizations());

    var details = this.facilities.create(dto.getDetails(), fish_ids, org_ids);
    return new FacilityDto(details);
  }

  public FacilityDto update(FacilityDto dto) {
    var fish_ids = getIdList(dto.getFish());
    var org_ids = getIdList(dto.getOrganizations());

    var details = this.facilities.update(dto.getDetails(), fish_ids, org_ids);
    return new FacilityDto(details);
  }

  // Deletes linked values through cascade so this is sufficient
  public String remove(String facilityId) {
    return this.facilities.remove(facilityId);
  }
}
