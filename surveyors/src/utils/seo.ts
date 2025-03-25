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
    title: "HR Surveyors Adelaide | Expert Land & Engineering Surveyors",
    heroText: "Professional Land & Engineering Surveyors in Adelaide",
    description: "Trusted land surveyors delivering precise engineering surveys, construction surveys, and infrastructure solutions across Adelaide Metro and Regional SA. Our Edinburgh North office specializes in civil construction, infrastructure mapping, and development projects with proven expertise.",
    services: [
      "Civil Construction",
      "Infrastructure & Mining", 
      "Feature and Level Survey",
      "Laser Scanning",
      "Specification Surveys (A-SPEC & ADAC)",
      "Engineering Surveys",
      "Construction Surveys"
    ],
    projects: [
      "Bookmark Creek Inlet Regulator, Renmark",
      "Nelwart Street Bridge, Crescent"
    ]
  },
  geelong: {
    title: "Land Surveyors Geelong | HR Surveyors",
    heroText: "Expert Land Surveyors in Geelong",
    description: "Expert land surveyors in Geelong and Western Victoria. Specializing in civil construction surveys, land development, engineering surveys, and infrastructure projects. Local surveying solutions with 10+ years of experience.",
    services: [
      "Building and Construction",
      "Civil Construction",
      "Infrastructure & Mining",
      "Feature and Level Survey",
      "Laser Scanning",
      "UAV (Drone Survey)",
      "Renewable Energy",
      "Specification Surveys (A-SPEC & ADAC)"
    ],
    projects: [
      "Geelong Port Expansion Project",
      "Western Victoria Renewable Energy Projects",
      "Geelong Ring Road Upgrades",
      "Local Subdivision Developments"
    ]
  }
};

export const locationMetaDesc: LocationDescriptions = {
  melbourne: "Expert land and engineering surveyors in Melbourne. Providing construction surveys, infrastructure mapping and development solutions across Metro Melbourne and Eastern Victoria.",
  perth: "Professional land surveying services in Perth. Specializing in engineering surveys, construction surveys and aerial mapping across Perth Metro and Regional WA.",
  brisbane: "Leading land surveyors in Brisbane and Gold Coast. Offering expert engineering surveys, construction surveys and development solutions across Queensland.",
  adelaide: "Adelaide's trusted land & engineering surveyors. Specializing in construction surveys, infrastructure mapping, and development solutions. Serving Adelaide Metro and Regional SA from our Edinburgh North office.",
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

export const locationKeywords: Record<LocationKey, string[]> = {
  melbourne: ['land surveyors in south east melbourne', 'land surveying northern suburbs melbourne', 'engineering surveyors melbourne', 'construction surveyors melbourne', 'drone surveying melbourne'],
  perth: ['surveyors perth', 'drone surveying perth', 'engineering surveys perth', 'construction surveyors perth', 'land surveying perth'],
  brisbane: ['land surveyors brisbane', 'engineering surveyors brisbane', 'drone surveys brisbane', 'construction surveying gold coast', 'building surveyors brisbane'],
  adelaide: ['surveyors adelaide', 'engineering surveyors adelaide', 'construction surveying adelaide', 'land surveying adelaide', 'infrastructure surveying adelaide'],
  geelong: ['surveyors geelong', 'land surveying geelong', 'construction surveyors geelong', 'engineering surveys geelong', 'drone surveys western victoria']
};

export function generateLocationSchema(location: LocationKey, locationName: string, officeInfo: any, content: any) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": `HR Surveyors ${locationName}`,
    "description": content.description,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": officeInfo?.address || "",
      "addressLocality": locationName,
      "addressCountry": "AU"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": content.coordinates?.lat || -25.2744, // Default Australia coords
      "longitude": content.coordinates?.lng || 133.7751
    },
    "areaServed": officeInfo?.areas || locationName,
    "service": content.services.map((service: string) => ({
      "@type": "Service",
      "name": service,
      "serviceArea": {
        "@type": "GeoCircle",
        "geoMidpoint": {
          "@type": "GeoCoordinates",
          "latitude": content.coordinates?.lat || -25.2744,
          "longitude": content.coordinates?.lng || 133.7751
        },
        "geoRadius": "50000"
      }
    }))
  };
}

// Helper function for safe capitalization
export function capitalize(str: string): string {
  return str ? str.charAt(0).toUpperCase() + str.slice(1) : '';
}

export function getServiceLocationPaths() {
  const services = ['drone-surveying', 'engineering-surveying', 'land-surveying'];
  const locations = ['perth', 'melbourne', 'geelong', 'brisbane', 'adelaide'];
  
  const paths = [];
  
  for (const service of services) {
    for (const location of locations) {
      paths.push({
        params: { service, location },
        props: { 
          service,
          location,
          title: `${formatService(service)} in ${capitalize(location)} | HR Surveyors`,
          description: `Professional ${formatService(service)} services in ${capitalize(location)} and surrounding areas. Fast, accurate, and reliable.`
        }
      });
    }
  }
  
  return paths;
}

export function getKeywordPaths() {
  interface KeywordPath {
    params: { slug: string };
    props: { 
      keyword: string;
      location: LocationKey;
      serviceType: string;
      title: string;
      description: string;
    };
  }
  
  const paths: KeywordPath[] = [];
  
  // Go through all location keywords
  Object.entries(locationKeywords).forEach(([location, keywords]) => {
    keywords.forEach(keyword => {
      // Convert keyword to slug
      const slug = keyword.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      
      // Determine relevant service type based on keyword content
      let serviceType = 'land-surveying'; // default
      if (keyword.includes('drone') || keyword.includes('uav')) {
        serviceType = 'drone-surveying';
      } else if (keyword.includes('engineering')) {
        serviceType = 'engineering-surveying';
      }
      
      paths.push({
        params: { slug },
        props: { 
          keyword,
          location: location as LocationKey,
          serviceType,
          title: `${capitalize(keyword)} | Professional Survey Solutions`,
          description: `Expert ${keyword} services with comprehensive solutions for projects of all sizes. Local surveyors with extensive experience in ${location}.`
        }
      });
    });
  });
  
  return paths;
}

function formatService(service: string): string {
  return service.split('-').map(capitalize).join(' ');
}