# beefree-sdk-hosted-saved-rows-demo
A simple integration to understand and experiment with customizations for Hosted Saved Rows.

# Beefree SDK - Hosted Saved Rows Integration Example

This repository contains an example of how to integrate the **Beefree SDK** into a web application with **Hosted Saved Rows** enabled. The Beefree SDK allows you to embed a powerful no-code email editor into your application, enabling users to create and customize email templates without writing a single line of code.

## Overview

This example showcases how to:
- Load the Beefree SDK into a web application.
- Enable and customize Hosted Saved Rows.
- Configure [Hosted Saved Rows](https://docs.beefree.io/beefree-sdk/rows/storage/hosted-saved-rows) with custom settings.

The example is built using plain HTML, CSS, and JavaScript, making it easy to integrate into any web project.

## Features

- **Hosted Saved Rows**: Save and manage rows for reuse in different templates.
- **Advanced Permissions**: Control user permissions for editing, deleting, and managing rows.
- **Content Services API**: Transform Saved Rows into various content types your end users will enjoy.

## Getting Started

### Prerequisites

- A valid **Beefree SDK** client ID and client secret. These should be stored in a `credentials.js` file as follows:
  ```javascript
  var credentials = {
    client_id: "YOUR_CLIENT_ID",
    client_secret: "YOUR_CLIENT_SECRET"
  };
  ```

### Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/BeefreeSDK/beefree-sdk-hosted-saved-rows-demo.git
   ```
2. Open the `index.html` file in your browser.

### Usage

1. **Load the Editor**: The editor will automatically load when you open the `builder.html` file in your browser.
2. **Load a Template**: Use the file input to load a JSON template. This is optional, because one is already preloaded.
3. **Create and design rows inside the template**: Customize the template with new rows and designs.
4. **Save Rows that are automatically hosted**: Save rows and host them automatically. Reuse rows easily once they are saved.

## Code Structure

- **`index.html`**: The main HTML file that includes a sample landing page.
- **`credentials.js`**: Contains the client ID and client secret for authentication.
- **`builder.html` and `builder-with-csapi.html`**: Additional HTML files you can redirect to using the main HTML that demonstrate examples of how you can load the Beefree SDK builder, and transform saved rows into different content types like plain text, PDF, HTML, or an image.

## Customization

You can customize the editor by modifying the `beeConfig` object in the `builder.html` or the `builder-with-csapi.html` file. Options include:
- **UID**: Set different configurations for Hosted Saved Rows based on UID.
- **saveRows**: Manage who can and cannot save a row.
- **Advanced Permissions**: Control user permissions for editing and managing rows. Manage whether or not the rows tab is locked or shown for a user.
- **defaultTabsOrder**: Reorder the tabs within the builder.
- **Translations**: Override the default text for the the modals and toast messages related to Hosted Saved Rows.
- **Themes**: Customize the theme of the Hosted Saved Rows modals, toast messages, and builder.
- **Transform content**: Transform the Hosted Saved Row JSON into other formats such as plain text, HTML, PDFs, or images.

## Other Resources

- [Beefree SDK](https://docs.beefree.io/beefree-sdk) for the email editor.
- [Developer Console](https://developers.beefree.io) for the email editor credentials.

## Support

For any questions or issues, please contact the Beefree SDK team.
