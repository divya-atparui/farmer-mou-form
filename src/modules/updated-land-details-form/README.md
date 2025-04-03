# Updated Land Details Form

A simplified version of the land details form that only includes the landowner and property details sections. This component is designed for Client 2 who only needs these two sections, rather than the full four-section form used by Client 1.

## Features

- Two-step form process instead of four steps
- Reuses existing components for consistency
- Supports both creation and editing of land details
- Form validation on each step
- Responsive design matching the original form

## Usage

### Basic Usage

```tsx
import UpdatedLandDetailsForm from '@/modules/updated-land-details-form/UpdatedLandDetailsForm';

function LandFillUpPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Land Owner & Property Details</h1>
      <UpdatedLandDetailsForm />
    </div>
  );
}

export default LandFillUpPage;
```

### With Edit Mode

```tsx
import UpdatedLandDetailsForm from '@/modules/updated-land-details-form/UpdatedLandDetailsForm';

function EditLandDetailsPage({ landDetails }) {
  const handleEditComplete = () => {
    // Handle completion, e.g., redirect or show success message
    console.log('Edit completed');
  };
  
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Edit Land Details</h1>
      <UpdatedLandDetailsForm 
        isEditMode={true}
        initialData={landDetails}
        onEditComplete={handleEditComplete}
      />
    </div>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| isEditMode | boolean | false | Whether the form is in edit mode |
| initialData | object | undefined | Initial data for edit mode |
| onEditComplete | function | undefined | Callback when edit is completed |
| initialStep | number | 0 | Initial step to show |

### initialData Structure

```typescript
{
  id?: string;
  landOwners?: {
    id?: string | null;
    landownerName?: string;
    aadhaar?: string;
    address?: string;
    email?: string;
    mobile?: string;
  }[];
  propertyDetails?: {
    id?: string | null;
    itemName?: string;
    cropDetails?: string;
    totalArea?: number;
    surveyNumbers?: string;
    location?: string;
  }[];
}
```

## API Integration

The current implementation logs form data to the console. To integrate with a real API:

1. Replace the `saveCurrentStep` function with real API calls
2. Replace the final submit logic in `handleSubmit` with API submission
3. Add proper error handling for API responses

## Customization

### Styling

The component uses the same styling as the original form for consistency. To customize:

1. Modify the Card component styling in the return statement
2. Adjust spacing and layout in the individual form components

### Form Validation

Validation is handled by Zod through the `updatedFormSchema`. To modify validation rules:

1. Update the schema in `src/types/schema.ts`
2. Ensure the component correctly references the updated schema

## Notes

- This component is designed to be used at the `/land-fill-up` route
- It reuses existing components from the main form implementation
- The component handles internal state management and validation 