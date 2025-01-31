# FAQ Management System

This is a backend application for managing FAQs (Frequently Asked Questions). The application supports multiple languages, WYSIWYG formatting for answers, caching, and integrates with Google Translate for automatic translations.

## Features

- Create, retrieve, update, and delete FAQs.
- Support for multiple languages (translations handled via Google Translate API).
- Caching mechanism with Redis for faster responses.
- WYSIWYG support for formatting FAQ answers.
- REST API for interacting with FAQ data.

## Tech Stack

- **Node.js** - Backend JavaScript runtime.
- **Express** - Web framework for building RESTful APIs.
- **Sequelize** - ORM for interacting with the MySQL database.
- **MySQL** - Relational database to store FAQ data.
- **Redis** - Caching for translations to improve performance.
- **Google Translate API** - For automatic translation of FAQ content.
- **dotenv** - Manage environment variables.

## Installation

### Prerequisites

- Node.js and npm
- MySQL database
