// Define valid location keys
type LocationKey = 'melbourne' | 'perth' | 'brisbane' | 'adelaide' | 'geelong';

// Create descriptions type using Record utility type
type LocationDescriptions = Record<LocationKey, string>;

export const locationMetaDesc: LocationDescriptions = {
  melbourne: "Expert land and engineering surveyors in Melbourne. Providing construction surveys, infrastructure mapping and development solutions across Metro Melbourne and Eastern Victoria.",
  perth: "Professional land surveying services in Perth. Specializing in engineering surveys, construction surveys and aerial mapping across Perth Metro and Regional WA.",
  brisbane: "Leading land surveyors in Brisbane and Gold Coast. Offering expert engineering surveys, construction surveys and development solutions across Queensland.",
  adelaide: "Experienced land surveyors in Adelaide. Delivering precise engineering surveys, construction surveys and mapping solutions across South Australia.",
  geelong: "Professional land surveying services in Geelong and Western Victoria. Expert engineering surveys, construction surveys and development solutions."
};

function isValidLocation(location: string): location is LocationKey {
  return Object.keys(locationMetaDesc).includes(location.toLowerCase());
}

export function getLocationMetaDesc(location: string): string {
  const lowercaseLocation = location.toLowerCase();
  return (lowercaseLocation in locationMetaDesc) 
    ? locationMetaDesc[lowercaseLocation as LocationKey]
    : "Professional land surveying services across Australia. Engineering surveys, construction surveys and aerial mapping in Melbourne, Perth, Brisbane, Adelaide and regional areas.";
}

// Generate static paths at build time
export const getStaticPaths = () => {
  const locations = Object.entries(locationMetaDesc)
    .map(([location, description]) => ({
      params: { location: location as LocationKey },
      props: { description }
    }));
  
  return locations;
};