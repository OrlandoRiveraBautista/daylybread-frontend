# Platform Dashboard

A comprehensive management dashboard for churches and organizations using Daylybread.

## Overview

The Platform Dashboard provides a centralized location for organizations to manage their church or organization, including NFC device configuration, organization settings, analytics, and member management.

## Features

### 1. Dashboard Layout
- **Responsive Sidebar Navigation**: Easy-to-use menu with sections for all management features
- **Mobile-Friendly**: Overlay menu that works seamlessly on mobile devices
- **Organization Branding**: Displays organization name and logo

### 2. Dashboard Sections

#### Overview (Home)
- Quick statistics cards showing:
  - Active NFC Devices
  - Total Members (Coming Soon)
  - Monthly Engagement (Coming Soon)
  - Active Events (Coming Soon)
- Quick Actions panel for common tasks
- Navigate to any section with one click

#### NFC Devices
- Full NFC device configuration (previously the only feature)
- Configure title, description, and main button
- Set up optional links:
  - Giving/Donation links
  - Member registration
  - Events calendar
- File or URL-based content
- Social media integration

#### Organization Settings
- Organization profile management
- Type selection (Church, Non-Profit, Ministry, etc.)
- Contact information (address, phone, email)
- Website and social media links
- Comprehensive organization details

#### Analytics (Coming Soon)
- NFC tap tracking
- Page view metrics
- Social share statistics
- Engagement rate monitoring
- Placeholder cards showing upcoming features

#### Members (Coming Soon)
- Member profile management
- Attendance tracking
- Communication tools
- Registration form integration
- Directory management
- Placeholder with feature list

## Components Created

### Layout Components
1. **DashboardLayout.tsx** - Main layout with sidebar navigation
   - Handles routing between sections
   - Responsive menu system
   - Organization branding display

### Section Components
2. **DashboardOverview.tsx** - Overview/home screen
   - Statistics cards
   - Quick action buttons
   - Section navigation

3. **NFCConfigForm.tsx** - Already existed, now integrated
   - NFC device configuration
   - Retained all existing functionality

4. **OrganizationSettings.tsx** - Organization management
   - Profile information
   - Contact details
   - Social media links

5. **AnalyticsDashboard.tsx** - Analytics placeholder
   - Metric cards (prepared for future data)
   - Feature preview

6. **MembersManagement.tsx** - Members placeholder
   - Feature preview
   - Integration points for future development

## File Structure

```
src/
├── components/Platform/
│   ├── DashboardLayout.tsx & .scss
│   ├── DashboardOverview.tsx & .scss
│   ├── OrganizationSettings.tsx & .scss
│   ├── AnalyticsDashboard.tsx & .scss
│   ├── MembersManagement.tsx & .scss
│   ├── NFCConfigForm.tsx (existing)
│   └── PlatformHeader.tsx (existing)
├── pages/Platform/
│   └── Platform/
│       ├── Platform.tsx (updated)
│       └── Platform.scss
```

## Usage

### Accessing the Dashboard
Navigate to `/platform` (or your configured route) after authentication.

### Navigation
- **Desktop**: Sidebar menu always visible
- **Mobile**: Hamburger menu button to open overlay

### Section Management
The dashboard uses a centralized state management approach:
- Active section tracked in Platform.tsx
- Section changes update via `handleSectionChange`
- Content rendered conditionally based on active section

## Future Enhancements

### Short Term
1. **Organization Settings Backend Integration**
   - Connect to API for saving organization data
   - Load existing organization details

2. **Analytics Implementation**
   - Real-time NFC tap tracking
   - Integration with analytics service
   - Chart components for data visualization

### Medium Term
3. **Member Management**
   - Member database
   - Communication tools
   - Registration form builder
   - Attendance tracking

4. **Additional Features**
   - Event management
   - Giving/donation tracking
   - Email campaigns
   - Custom forms

## Styling

All components follow the existing Daylybread design system:
- Uses Ionic components for consistency
- Responsive design patterns
- Dark/light mode support
- CSS custom properties for theming

## Development Notes

### TypeScript Types
- `DashboardSection` type defined in `DashboardLayout.tsx`
- Exported for use across components
- Type-safe navigation between sections

### State Management
- Local state in Platform.tsx for section management
- Organization name stored in component state
- Toast notifications for user feedback

### Best Practices
- All new components are functional with TypeScript
- Props interfaces clearly defined
- Responsive design mobile-first
- Accessible with semantic HTML

## Testing

### Manual Testing Checklist
- [ ] Navigate between all sections
- [ ] NFC configuration saves successfully
- [ ] Organization settings form validation
- [ ] Mobile menu opens/closes
- [ ] Responsive layout on different screen sizes
- [ ] Dark/light mode compatibility

## Support

For issues or questions about the Platform Dashboard, please refer to the main Daylybread documentation or contact support.

---

**Created**: February 2026  
**Status**: Active Development  
**Version**: 1.0.0
