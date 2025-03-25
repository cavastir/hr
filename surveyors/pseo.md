# HR Surveyors SEO Implementation Guide

## Overview

This document outlines the SEO strategy implemented for HR Surveyors, focusing on the dynamic page generation system that creates dedicated keyword-targeted pages and their technical implementation.

## Dynamic Page Structure

The site now generates three types of SEO-optimized dynamic pages:

1. **Location Pages** (`/[location].astro`)
   - Base URL: `/{location}` (e.g., `/melbourne`, `/perth`)
   - Purpose: Target city-specific searches with comprehensive content
   - Content: Location-specific service offerings, testimonials, contact info

2. **Service+Location Pages** (`/services/[service]/[location].astro`) 
   - Base URL: `/services/{service}/{location}` (e.g., `/services/drone-surveying/melbourne`)
   - Purpose: Target specific service type searches within locations
   - Content: Detailed service information, FAQs, benefits specific to that location

3. **Keyword Pages** - implemented in two routes for maximum SEO benefit:
   - Primary route: `/services/[keyword].astro` (e.g., `/services/land-surveyors-in-south-east-melbourne/`)
   - Secondary route: `/keyword/[slug].astro` (e.g., `/keyword/land-surveyors-in-south-east-melbourne/`)
   - Purpose: Target specific long-tail keyword phrases with dedicated content
   - Content: Keyword-optimized content with service and location context

## Technical Implementation

### SEO Utilities (`/src/utils/seo.ts`)

The SEO implementation centers around the `seo.ts` file, which contains:

- **`locationContent`**: Object with location-specific data
- **`locationKeywords`**: Array of targeted keywords for each location
- **`getKeywordPaths()`**: Function to generate paths for all keyword pages
- **`getServiceLocationPaths()`**: Function to generate paths for service+location pages
- **`generateLocationSchema()`**: Function to create schema.org markup for locations

### Key Features

1. **Prerendering**: All dynamic pages use `export const prerender = true` to generate static HTML at build time for optimal performance.

2. **Dual Routes for Keywords**: Keyword content is accessible via two URL patterns:
   - `/services/{keyword}/` - Primary route (more SEO-friendly URL structure)
   - `/keyword/{slug}/` - Secondary route (provides alternative indexing opportunity)

3. **Dynamic Content Generation**: Content automatically adapts based on keyword, service type, and location:
   - Title and meta description
   - Schema.org structured data
   - Page content and sections
   - Related content links

4. **Internal Linking**: Comprehensive cross-linking between related pages to distribute link equity:
   - Location pages link to service pages and keyword pages
   - Service pages link to related keyword pages
   - Keyword pages link to relevant location and service pages

5. **Schema.org Implementation**: Rich structured data for enhanced SERP features:
   - Service schemas with location data
   - FAQ schemas for common questions
   - Organization and LocalBusiness schemas

## Common Mistakes to Avoid

1. **Missing Trailing Slashes**: The site is configured with `trailingSlash: 'always'` in Astro config. All internal links must include trailing slashes (e.g., `/services/keyword/` not `/services/keyword`).

2. **Bypassing the Type System**: Always define proper interfaces and types, especially for the `locationContent` and `locationKeywords` data structures.

3. **Hardcoded Content**: Avoid hardcoding location-specific content. Instead, use the centralized data structures in `seo.ts`.

4. **Inconsistent Naming**: Maintain consistency between URL slugs and display text:
   - Use kebab-case for URL slugs (e.g., `drone-surveying`)
   - Use Title Case for displayed headers (e.g., "Drone Surveying")

5. **Forgetting Null Checks**: Always include null checks when accessing potentially undefined properties, especially with dynamic content.

6. **Duplicate Location Information**: Avoid adding location information to headings when the keyword already contains location references (e.g., use "land surveyors in south east melbourne" instead of "land surveyors in south east melbourne in Melbourne").

## Best Practices for Maintaining and Extending

1. **Adding New Keywords**:
   - Add new keywords to the appropriate location in the `locationKeywords` object in `seo.ts`
   - Follow existing format and naming conventions
   - Build the site to verify the new pages are generated correctly

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
   - Keep headings clean and avoid redundancy (particularly when keywords already contain location references)
   - Ensure image alt text includes both keyword and location (e.g., "HR Surveyors drone surveying - Melbourne")

4. **Image Optimization**:
   - Always include descriptive, keyword-rich alt text
   - Use responsive images with appropriate width/height attributes
   - Follow the established pattern for image paths

5. **Monitoring and Improvement**:
   - Regularly check Google Search Console for performance metrics
   - Update content based on search data and user engagement
   - Monitor for broken links or rendering issues

## Technical Debt Considerations

The current implementation has some areas that could be improved in future iterations:

1. **Content Duplication Management**: While the dual routes provide SEO benefits, they require careful management to avoid potential duplicate content issues. Consider implementing canonical tags on the `/keyword/[slug]` routes.

2. **Centralized Content Repository**: Consider moving service-specific content into a centralized content collection for easier management.

3. **Dynamic Image Handling**: Images are currently hardcoded paths. Consider implementing a more flexible system for associating images with services and keywords.

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

4. **Safe Data Access**: Functions that access data objects include error handling:
   - Checking for existence before accessing nested properties
   - Providing sensible defaults when data is missing
   - Type checking before operations

These safeguards ensure the site remains functional even when:
- New locations or services are added without complete content
- Keywords are mapped to non-existent service types
- External data sources change or fail
- Edge cases like unusual keyword strings are encountered

## Build Process

The build process automatically:

1. Generates all location pages
2. Creates all service+location combinations
3. Generates all keyword pages at both URL patterns
4. Sets up all internal links with proper trailing slashes
5. Creates appropriate schema.org structured data

Running `npm run build` will regenerate all pages with the latest content and configurations. 

## Recent Updates

### May 2023 - Heading and Image Alt Text Improvements
- Fixed duplicate location information in headings for keyword pages
- Updated the `/services/[keyword].astro` template to display cleaner headings
- Enhanced image alt text to include both keyword and location information
- Improved heading hierarchy and removed redundant location mentions
- Applied consistent heading format across all dynamically generated pages 