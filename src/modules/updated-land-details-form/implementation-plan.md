# Implementation Plan: UpdatedLandDetailsForm

## Overview

This document outlines the approach for implementing a simplified land details form for Client 2, which only requires the landowner and property details sections. The implementation leverages existing components while providing a focused user experience.

## Components Structure

```
UpdatedLandDetailsForm
├── StepperHeader (reused)
├── StepperNavigation (reused)
├── LandOwnersComponent (reused)
└── PropertyDetailsComponent (reused)
```

## Schema and Data Model

We're using a simplified schema (`updatedFormSchema`) that only includes:
- Landowner information
- Property details

This schema is defined in `src/types/schema.ts` and is a subset of the full form schema used for Client 1.

## Implementation Details

### Routing

1. Create a new route `/land-fill-up` to host the simplified form
2. Ensure the main route continues to use the full form for Client 1

### Component Reuse

The implementation reuses:
- `LandOwnersComponent` and `PropertyDetailsComponent` from the original form
- `StepperHeader` and `StepperNavigation` for consistent UI/UX

### Form State Management

- React Hook Form with Zod validation handles form state
- Form state is persisted across steps using the form context
- Mock API calls (currently console logs) to be replaced with real API integration

### Navigation and Validation

- Each step validates only the fields relevant to that step
- Navigation between steps is controlled by the StepperNavigation component
- Form can only be submitted after both steps are completed and validated

## Testing Plan

1. Verify that the form renders correctly with empty state
2. Test adding/removing landowners
3. Test adding/removing property details
4. Validate form submission with and without required fields
5. Test edit mode with pre-populated data

## Integration Points

Current console.log outputs should be replaced with API calls:

```javascript
// In saveCurrentStep function:
console.log(`Saving step ${currentStep}:`, data);
// Replace with API call

// In handleSubmit function:
console.log('Form submitted successfully with data:', finalData);
// Replace with API call
```

## Future Enhancements

1. Add loading states for API interactions
2. Implement error handling and recovery
3. Add file upload progress indicators
4. Consider adding a summary/review step
5. Add form state persistence to handle browser refresh

## Notes for Developers

- The use of `form as any` in the component rendering section is necessary because the original components expect `FormSchemaType` but we're using `UpdatedFormSchemaType`. This is safe because the relevant structures are compatible.
- The location tracking code from the original form has been removed as it's not needed for this simplified version. 