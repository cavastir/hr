// src/utils/seo.ts
export type LocationKey = 'melbourne' | 'perth' | 'brisbane' | 'adelaide' | 'geelong';

export interface LocationContent {
  title: string;
  heroText: string;
  description: string;
  services: string[];
  projects: string[];
}

export type LocationContents = Record<LocationKey, LocationContent>;
export type LocationDescriptions = Record<LocationKey, string>;

export const locationContent: LocationContents = {
  melbourne: {
    title: "HR Surveyors Melbourne",
    heroText: "Expert Land Surveyors in Melbourne",
    description: "Professional surveying services across Melbourne and Eastern Victoria. Our Clayton office serves the Greater Melbourne area with comprehensive engineering and construction survey solutions.",
    services: [
      "Building and Construction",
      "Civil Construction",
      "Infrastructure & Mining",
      "Feature and Level Survey",
      "Laser Scanning",
      "Renewable Energy"
    ],
    projects: [
      "Golden Plains Wind Farm & East & Cressy Terminal Station",
      "Penny Lane Moonee Ponds",
      "Childs Road Upgrade, Epping to Mill Park"
    ]
  },
  perth: {
    title: "HR Surveyors Perth",
    heroText: "Leading Survey Solutions in Perth",
    description: "Comprehensive surveying services across Perth Metro and Regional WA. Our West Leederville office delivers expert solutions for construction, infrastructure and development projects.",
    services: [
      "Building and Construction",
      "Civil Construction", 
      "Infrastructure & Mining",
      "Laser Scanning",
      "UAV (Drone Survey)"
    ],
    projects: [
      "Victoria Park-Canning Level Crossing Removal Project",
      "Lumiere Apartments, South Perth",
      "Casuarina Prison Expansion Project"
    ]
  },
  brisbane: {
    title: "HR Surveyors Brisbane",
    heroText: "Trusted Surveyors in Brisbane",
    description: "Complete surveying solutions for Brisbane, Gold Coast and Northern Rivers regions. Our team delivers precise engineering and construction surveys for projects of all sizes.",
    services: [
      "Building and Construction",
      "Civil Construction",
      "Infrastructure & Mining",
      "UAV (Drone Survey)",
      "Machine Control (3D Models & Design)"
    ],
    projects: [
      "Mt Lindesay Highway Upgrade, Woodhill",
      "Park Lane Apartments, Lutwyche"
    ]
  },
  adelaide: {
    title: "HR Surveyors Adelaide",
    heroText: "Professional Surveyors in Adelaide",
    description: "Expert surveying services across Adelaide Metro and Regional SA. Our Edinburgh North office specializes in infrastructure, construction and development projects.",
    services: [
      "Civil Construction",
      "Infrastructure & Mining", 
      "Feature and Level Survey",
      "Laser Scanning",
      "Specification Surveys (A-SPEC & ADAC)"
    ],
    projects: [
      "Bookmark Creek Inlet Regulator, Renmark",
      "Nelwart Street Bridge, Crescent"
    ]
  },
  geelong: {
    title: "HR Surveyors Geelong",
    heroText: "Leading Survey Solutions in Geelong",
    description: "Serving Geelong and Western Victoria with professional land surveying services. Our local team delivers precise engineering and construction surveys for projects of all sizes.",
    services: [
      "Civil Construction",
      "Land Development",
      "Engineering Surveys",
      "Infrastructure Projects",
      "Feature & Level Surveys"
    ],
    projects: [
      "Geelong Port Expansion",
      "Western Victoria Renewables"
    ]
  }
};

export const locationMetaDesc: LocationDescriptions = {
  melbourne: "Expert land and engineering surveyors in Melbourne. Providing construction surveys, infrastructure mapping and development solutions across Metro Melbourne and Eastern Victoria.",
  perth: "Professional land surveying services in Perth. Specializing in engineering surveys, construction surveys and aerial mapping across Perth Metro and Regional WA.",
  brisbane: "Leading land surveyors in Brisbane and Gold Coast. Offering expert engineering surveys, construction surveys and development solutions across Queensland.",
  adelaide: "Experienced land surveyors in Adelaide. Delivering precise engineering surveys, construction surveys and mapping solutions across South Australia.",
  geelong: "Professional land surveying services in Geelong and Western Victoria. Expert engineering surveys, construction surveys and development solutions."
};

export function getLocationMetaDesc(location: string): string {
  const lowercaseLocation = location.toLowerCase();
  return (lowercaseLocation in locationMetaDesc) 
    ? locationMetaDesc[lowercaseLocation as LocationKey]
    : "Professional land surveying services across Australia. Engineering surveys, construction surveys and aerial mapping in Melbourne, Perth, Brisbane, Adelaide and regional areas.";
}

// Generate static paths at build time
export const getStaticPaths = () => {
  return Object.entries(locationContent).map(([location, content]) => ({
    params: { location },
    props: { 
      title: content.title,
      description: content.description,
      location: location as LocationKey
    }
  }));
};