# Add any notes about the task here

# Bonus Tasks

# 1
To effectively manage and track changes to the pipeline statuses of targets in a database, a flexible schema should be implemented, featuring a statusHistory array within each target document to log previous statuses, timestamps, and user IDs for every status change. The data update strategy involves retrieving the target document, updating the pipelineStatus and lastUpdated fields, and appending the previous status to the statusHistory. Additionally, a change log collection should be maintained to record all modifications with details such as target ID, previous and new statuses, timestamps, and user IDs. This approach enables real-time UI updates, robust change tracking, and facilitates analytics reporting, ensuring that users stay informed of significant changes while maintaining an audit trail for compliance and review purposes.


# 2

Empty Data Set: If the API response returns an empty array for targets, the dashboard may display incorrectly or cause the bar chart to render without data. To handle this, implement a check in the dashboard component to display a user-friendly message indicating that no targets are available and that users can add new targets.

Invalid Data Format: If the API returns targets with missing or malformed properties (e.g., name, lastUpdated, or pipelineStatus), it could lead to runtime errors when rendering components. Validate the data on the client side after fetching it and provide fallbacks or default values. Implement error boundaries to catch and handle any rendering errors gracefully.

API Rate Limiting: If the application exceeds the API's rate limits (e.g., due to rapid consecutive updates or fetch requests), it may result in failed requests and inconsistent UI states. Implement a throttling mechanism to limit the frequency of API calls and provide user feedback (e.g., a loading spinner) while waiting for the server's response. Consider caching data to reduce unnecessary API calls.

Status Update Errors: If a status update fails due to server-side validation errors (e.g., an invalid status or network issues), users may not receive feedback on the failure. Ensure that the handleStatusChange function captures errors and updates the UI to reflect the failure, allowing users to retry the update. Show error messages that guide users on resolving the issue.

Large Data Sets: If the number of targets grows significantly, performance issues may arise when rendering the table or chart. Optimize rendering by using virtualization libraries (e.g., react-window or react-virtualized) to only render the visible portion of the data. Consider pagination for the table to enhance performance and user experience.

Inconsistent Data Between UI and Backend: When the user updates the status, there might be a scenario where the update fails, yet the UI reflects the change. Use optimistic UI updates cautiously and ensure that after an update, the application fetches the latest data from the server to synchronize the UI state with the backend.

Different User Roles and Permissions: If the application has users with different roles (e.g., admins, editors, viewers), ensure that permissions for updating statuses or viewing certain targets are enforced. Implement role-based access control and provide feedback when users attempt to perform unauthorized actions.


# Suggestions 

User Customization Options: Allow users to customize their dashboard experience, such as selecting which data to display, adjusting table column visibility, and saving preferences for future visits.

Notification System: Implement a notification system to inform users of significant events or updates, such as successful updates to statuses or alerts for any important changes to the targets.

Data Exporting Options: Consider adding functionality for users to export the data in various formats (e.g., CSV, Excel, PDF). This will allow users to analyze and share data outside the application.

Data Visualization Enhancements: Improve data visualization by adding more chart types (e.g., pie charts, line graphs) for better insights into the data. Implement tooltips that provide detailed information on hover and consider using animations for a more engaging experience.