# Platform Dashboard - File Organization

## New Folder Structure

All Platform components have been reorganized into individual subfolders for better organization and maintainability. Each component now lives in its own directory with its TypeScript file, styles, and index export.

### Directory Layout

```
src/components/Platform/
├── AnalyticsDashboard/
│   ├── AnalyticsDashboard.tsx
│   ├── AnalyticsDashboard.scss
│   └── index.ts
├── CalendarManagement/
│   ├── CalendarManagement.tsx
│   ├── CalendarManagement.scss
│   └── index.ts
├── DashboardLayout/
│   ├── DashboardLayout.tsx
│   ├── DashboardLayout.scss
│   └── index.ts
├── DashboardOverview/
│   ├── DashboardOverview.tsx
│   ├── DashboardOverview.scss
│   └── index.ts
├── MembersManagement/
│   ├── MembersManagement.tsx
│   ├── MembersManagement.scss
│   └── index.ts
├── NFCConfigForm/
│   ├── NFCConfigForm.tsx
│   └── index.ts
├── NFCDevicesList/
│   ├── NFCDevicesList.tsx
│   ├── NFCDevicesList.scss
│   └── index.ts
├── OrganizationSettings/
│   ├── OrganizationSettings.tsx
│   ├── OrganizationSettings.scss
│   └── index.ts
├── PlatformHeader/
│   ├── PlatformHeader.tsx
│   └── index.ts
└── SermonsManagement/
    ├── SermonsManagement.tsx
    ├── SermonsManagement.scss
    └── index.ts
```

## Benefits

### 1. **Better Organization**
- Each component and its styles are grouped together
- Easy to locate component files
- Clear separation of concerns

### 2. **Cleaner Imports**
Thanks to `index.ts` files, imports remain clean:

```typescript
// Before: Would have been messy with flat structure
import { DashboardLayout } from '../../../components/Platform/DashboardLayout';

// Now: Clean and clear
import { DashboardLayout } from '../../../components/Platform/DashboardLayout';
```

### 3. **Scalability**
- Easy to add component-specific files (tests, stories, etc.)
- Can add component variants in same folder
- Better for team collaboration

### 4. **Visual Hierarchy**
In your IDE, you'll see:
```
📁 DashboardLayout
  └─ 📄 DashboardLayout.tsx
  └─ 🎨 DashboardLayout.scss
  └─ 📄 index.ts
```

## Component Descriptions

### Core Layout Components

#### **DashboardLayout**
- Main layout wrapper with sidebar navigation
- Handles menu state and routing
- Mobile-responsive with overlay menu

#### **DashboardOverview**
- Homepage dashboard with statistics
- Quick action buttons
- Navigation to all sections

### Feature Components

#### **NFCDevicesList**
- List view of all NFC devices
- Create, edit, delete operations
- Device status and tap tracking
- Links to public NFC pages

#### **SermonsManagement**
- Sermon library management
- Audio/video/notes upload
- Series organization
- Status management (Draft/Published/Scheduled)

#### **CalendarManagement**
- Event scheduling and management
- Date/time selection
- Location and registration settings
- Recurring event support
- Filter by upcoming/past

#### **OrganizationSettings**
- Organization profile editor
- Contact information
- Social media links
- Organization type selection

#### **AnalyticsDashboard**
- Analytics metrics (placeholder)
- Engagement tracking
- Future data visualization

#### **MembersManagement**
- Member management (placeholder)
- Future member directory
- Attendance tracking

### Utility Components

#### **NFCConfigForm**
- Reusable NFC configuration form
- Used by NFCDevicesList for create/edit
- Handles all NFC device settings

#### **PlatformHeader**
- Header component for platform pages
- Logo and branding
- (Currently minimal, can be expanded)

## Import Patterns

### From Platform.tsx (Main Page)
```typescript
import { DashboardLayout } from "../../../components/Platform/DashboardLayout";
import { DashboardOverview } from "../../../components/Platform/DashboardOverview";
import { NFCDevicesList } from "../../../components/Platform/NFCDevicesList";
// etc...
```

### Between Components
```typescript
// From DashboardOverview to DashboardLayout
import { DashboardSection } from "../DashboardLayout";

// From NFCDevicesList to NFCConfigForm  
import { NFCConfigForm } from "../NFCConfigForm";
```

### From Other Pages
```typescript
// If you need to use these components elsewhere
import { CalendarManagement } from "../../components/Platform/CalendarManagement";
```

## Routing Structure

The platform uses nested routing within each section:

```
/platform
├── /                      → DashboardOverview
├── /nfc                   → NFCDevicesList
├── /sermons              → SermonsManagement
├── /calendar             → CalendarManagement
├── /organization         → OrganizationSettings
├── /analytics            → AnalyticsDashboard
└── /members              → MembersManagement
```

## Adding New Components

To add a new Platform component:

1. **Create folder**
   ```bash
   mkdir src/components/Platform/NewComponent
   ```

2. **Add component file**
   ```typescript
   // NewComponent.tsx
   export const NewComponent: React.FC = () => {
     return <div>New Component</div>;
   };
   ```

3. **Add styles (optional)**
   ```scss
   // NewComponent.scss
   .new-component {
     // styles
   }
   ```

4. **Create index.ts**
   ```typescript
   // index.ts
   export * from './NewComponent';
   ```

5. **Add to Platform.tsx**
   - Import the component
   - Add route in Switch
   - Add to DashboardLayout menu if needed

## File Naming Conventions

- **Component files**: PascalCase matching folder name
  - `DashboardLayout/DashboardLayout.tsx`
  
- **Style files**: PascalCase matching component
  - `DashboardLayout/DashboardLayout.scss`
  
- **Index files**: Lowercase
  - `DashboardLayout/index.ts`

- **Folder names**: PascalCase
  - `src/components/Platform/DashboardLayout/`

## Migration Complete ✅

All Platform components have been successfully reorganized:
- ✅ 10 component folders created
- ✅ All files moved to respective folders
- ✅ Index exports added
- ✅ Import paths updated
- ✅ No linter errors
- ✅ Routing maintained

## Next Steps

Future enhancements to consider:

1. **Add Tests**
   ```
   DashboardLayout/
   ├── DashboardLayout.tsx
   ├── DashboardLayout.scss
   ├── DashboardLayout.test.tsx
   └── index.ts
   ```

2. **Add Storybook Stories**
   ```
   DashboardLayout/
   ├── DashboardLayout.tsx
   ├── DashboardLayout.scss
   ├── DashboardLayout.stories.tsx
   └── index.ts
   ```

3. **Add Component Documentation**
   ```
   DashboardLayout/
   ├── DashboardLayout.tsx
   ├── DashboardLayout.scss
   ├── README.md
   └── index.ts
   ```

---

**Last Updated**: February 2026  
**Status**: Complete ✅  
**Maintained By**: Development Team
