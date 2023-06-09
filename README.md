
**React Contact Manage**r
This is a React-based contact manager application that allows users to store and update contact information, including profile images, via URL. The application utilizes a JSON server backend for data persistence and Axios for making HTTP requests. The UI is built using the Bootstrap framework for a responsive and visually appealing design.

Features
Create, read, update, and delete contact entries.
Update profile images by providing the URL of the image.
List contacts with their profile images and basic information.
Search for contacts by name.
Sort contacts by name.
Responsive design using Bootstrap for seamless viewing on various devices.
Prerequisites
Before running this application, ensure that you have the following software installed on your machine:

Node.js (v14.0.0 or later)
npm (v6.0.0 or later)
Installation
Clone the repository:
bash
Copy code
git clone https://github.com/Dev-Gyinae/react-contact-manager.git


Navigate to the project directory:
cd react-contact-manager
Install the dependencies:

npm install
Usage
Start the JSON server:

npm run json-server
This will start the JSON server backend at http://localhost:5000 and use the db.json file as the database.

In a separate terminal, start the React application:

npm start
The React application will be served at http://localhost:3000.

Open your web browser and visit http://localhost:3000 to access the React Contact Manager application.
Configuration
If you need to change the configuration of the JSON server, such as the port or database file, you can modify the json-server.json file located in the project root directory.

Technologies Used
React
JSON Server
Axios
Bootstrap
Acknowledgments
This application was developed as a learning project and was inspired by various React tutorials and examples available online.
