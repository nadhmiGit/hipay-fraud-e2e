Feature: Record a waste collection journey
  As a field contributor
  I want to record a journey while walking
  So that I can report wild waste with geolocated photos

  @smoke
  Scenario: Successfully record a waste journey
    Given I am on the waste journey page
    When I start a waste journey
    When I complete the waste journey

# Then the journey should be in recording status

# When I capture a waste photo
# Then the photo should be attached to the current journey

# When I finish the journey
# Then the journey should be saved successfully