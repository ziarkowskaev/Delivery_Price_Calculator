import axios from "axios";

export const staticInfoVenue = async (venueSlug: string) => {
  const promise = axios.get(
    `https://consumer-api.development.dev.woltapi.com/home-assignment-api/v1/venues/${venueSlug}/static`,
  );
  return promise;
};

export const dynamicInfoVenue = (venueSlug: string) => {
  const promise = axios.get(
    `https://consumer-api.development.dev.woltapi.com/home-assignment-api/v1/venues/${venueSlug}/dynamic`,
  );
  return promise;
};
