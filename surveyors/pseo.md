# HR Surveyors SEO Implementation Guide

## Overview

This document outlines the SEO strategy implemented for HR Surveyors, focusing on the dynamic page generation system that creates dedicated service and location pages with keyword optimization.

## Dynamic Page Structure

The site now generates two types of SEO-optimized dynamic pages:

1. **Location Pages** (`/[location].astro`)
   - Base URL: `/{location}` (e.g., `/melbourne`, `/perth`)
   - Purpose: Target city-specific searches with comprehensive content
   - Content: Location-specific service offerings, testimonials, contact info

2. **Service+Location Pages** (`/services/[service]/[location].astro`) 
   - Base URL: `/services/{service}/{location}` (e.g., `/services/drone-surveying/melbourne`)
   - Purpose: Target specific service type searches within locations
   - Content: Detailed service information, benefits, applications specific to that location
   - Keyword Optimization: Each page targets specific long-tail keywords for the service+location combination

## Technical Implementation

### SEO Utilities (`/src/utils/seo.ts`)

The SEO implementation centers around the `seo.ts` file, which contains:

- **`locationContent`**: Object with location-specific data
- **`locationKeywords`**: Array of targeted keywords for each location
- **`getKeywordPaths()`**: Function to generate optimized paths for service+location pages
- **`generateLocationSchema()`**: Function to create schema.org markup for locations

### Key Features

1. **Prerendering**: All dynamic pages use `export const prerender = true` to generate static HTML at build time for optimal performance.

2. **Unified Route Structure**: All service and keyword content is now served through a single, clean URL pattern:
   - `/services/{service}/{location}/` (e.g., `/services/drone-surveying/melbourne/`)
   - Eliminates duplicate content issues
   - Provides clear information hierarchy
   - Improves crawlability and indexing

3. **Dynamic Content Generation**: Content automatically adapts based on service type, location, and targeted keywords:
   - Title and meta description
   - Schema.org structured data
   - Page content and sections
   - Related content links

4. **Internal Linking**: Comprehensive cross-linking between related pages to distribute link equity:
   - Location pages link to service pages
   - Service pages link to related location pages
   - Clear hierarchical structure

5. **Schema.org Implementation**: Rich structured data for enhanced SERP features:
   - Service schemas with location data
   - Organization and LocalBusiness schemas
   - Comprehensive provider and area served information

## Common Mistakes to Avoid

1. **Missing Trailing Slashes**: The site is configured with `trailingSlash: 'always'` in Astro config. All internal links must include trailing slashes.

2. **Bypassing the Type System**: Always define proper interfaces and types, especially for the `locationContent` and `locationKeywords` data structures.

3. **Hardcoded Content**: Avoid hardcoding location-specific content. Instead, use the centralized data structures in `seo.ts`.

4. **Inconsistent Naming**: Maintain consistency between URL slugs and display text:
   - Use kebab-case for URL slugs (e.g., `drone-surveying`)
   - Use Title Case for displayed headers (e.g., "Drone Surveying")

5. **Forgetting Null Checks**: Always include null checks when accessing potentially undefined properties, especially with dynamic content.

## Best Practices for Maintaining and Extending

1. **Adding New Keywords**:
   - Add new keywords to the appropriate location in the `locationKeywords` object in `seo.ts`
   - Follow existing format and naming conventions
   - Ensure keywords map to appropriate service types

2. **Adding New Locations**:
   - Add the new location to the `locationContent` object in `seo.ts`
   - Create corresponding entries in the `locationKeywords` object
   - Update any location-specific types (like `LocationKey`)

3. **Content Optimization**:
   - Keep service descriptions unique and valuable
   - Include location-specific information whenever possible
   - Use heading tags (H1, H2, H3) appropriately for content hierarchy
   - Include relevant keywords naturally in content
   - Balance keyword usage with readability and user experience

4. **Image Optimization**:
   - Always include descriptive, keyword-rich alt text
   - Use responsive images with appropriate width/height attributes
   - Follow the established pattern for image paths
   - Consider implementing the `compile` image service for Cloudflare deployment

5. **Monitoring and Improvement**:
   - Regularly check Google Search Console for performance metrics
   - Update content based on search data and user engagement
   - Monitor for broken links or rendering issues

## Technical Debt Considerations

The current implementation has some areas that could be improved in future iterations:

1. **Centralized Content Repository**: Consider moving service-specific content into a centralized content collection for easier management.

2. **Dynamic Image Handling**: Images are currently hardcoded paths. Consider implementing a more flexible system for associating images with services.

3. **Image Service**: Consider implementing the `compile` image service for Cloudflare deployment to handle image optimization at build time.

## Error Prevention

The dynamic page system includes several safeguards to prevent 500 errors and ensure robustness:

1. **Fallback Content**: Default content is provided for cases where specific content is not found:
   - Default service content for unknown service types
   - Default location content for unknown locations
   - Fallback schema generation

2. **Null Checks**: Comprehensive null checks throughout the templates:
   - Optional chaining (`?.`) for all object property access
   - Fallback values using logical OR (`||`) operators
   - Type guards for safer TypeScript usage

3. **Safe String Operations**: All string operations include checks to prevent errors:
   - Safe capitalization with null/undefined checks
   - Safe string replacements with default values
   - Protected string template literals

These safeguards ensure the site remains functional even when:
- New locations or services are added without complete content
- Keywords are mapped to non-existent service types
- External data sources change or fail
- Edge cases like unusual keyword strings are encountered

## Build Process

The build process automatically:

1. Generates all location pages
2. Creates all service+location combinations with keyword optimization
3. Sets up all internal links with proper trailing slashes
4. Creates appropriate schema.org structured data

Running `npm run build` will regenerate all pages with the latest content and configurations.

## Recent Updates

### March 2025 - URL Structure and Content Optimization
- Consolidated all service and keyword pages into a single, clean URL structure
- Removed duplicate routes to improve SEO and reduce maintenance
- Enhanced schema.org implementation with more detailed service information
- Improved content generation with better location-specific context
- Added support for service-specific benefits and applications sections
- Updated image handling recommendations for Cloudflare deployment 