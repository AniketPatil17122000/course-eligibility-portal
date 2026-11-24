# Course Eligibility Portal

A web-based application that evaluates student admission eligibility based on personal details, academic marks, entrance examination results, and selected courses.


## Repository

[Course Eligibility Portal](https://github.com/AniketPatil17122000/course-eligibility-portal.git)

## Features

- Student registration with form validation.
- Eligibility checking based on course-specific criteria.
- Support for Engineering, Medicine, Commerce, and Humanities.
- Entrance examination qualification checks for JEE and NEET.
- Clear eligibility results with rejection reasons.
- Recommendations for up to three alternative courses.
- Submission history with date filtering and search.
- MongoDB database integration.
- API error handling and loading indicators.
- Responsive user interface.

## Technology Stack

### Frontend
- React
- TypeScript
- Vite
- React Bootstrap
- Ant Design
- React Hook Form
- Redux Toolkit
- Axios
- Day.js

### Backend
- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose

## Project Structure

```text
course-eligibility-portal/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── interfaces/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── app.ts
│   │   └── server.ts
│   ├── .env
│   ├── package.json
│   └── tsconfig.json
│
├── src/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   ├── routes/
│   ├── services/
│   ├── interfaces/
│   ├── validations/
│   ├── utils/
│   └── store/
│
├── .env
├── package.json
└── README.md
```

## Installation and Setup

### 1. Clone the repository

```bash
git clone <repository-url>
cd course-eligibility-portal
```

### 2. Frontend setup

Install dependencies:

```bash
npm install
```

Create a `.env` file in the project root:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

### 3. Backend setup

Navigate to the backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside the backend folder:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
```

Start the backend:

```bash
npm run dev
```

Backend URL:

```text
http://localhost:5000
```

Health check:

```text
GET http://localhost:5000/api/health
```

## API Documentation

### 1. Check Student Eligibility

**Endpoint:**

```http
POST /api/students/check-eligibility
```

Evaluates the student's eligibility and saves the submission in MongoDB.

**Request Body:**

```json
{
  "studentName": "Rahul Sharma",
  "age": 20,
  "gender": "Male",
  "subjects": [
    { "subject": "Physics", "marks": 85 },
    { "subject": "Chemistry", "marks": 80 },
    { "subject": "Mathematics", "marks": 90 },
    { "subject": "English", "marks": 75 },
    { "subject": "Computer Science", "marks": 88 },
    { "subject": "Biology", "marks": 70 }
  ],
  "jeeQualified": true,
  "neetQualified": false,
  "courseCategory": "Engineering",
  "desiredCourse": "Computer Science Engineering"
}
```

### 2. Get Submission History

**Endpoint:**

```http
GET /api/students/history
```

Returns previously submitted student eligibility records, sorted by submission date.

## Eligibility Criteria

### Engineering

- Requires Physics, Chemistry, and Mathematics.
- JEE qualification is mandatory.
- Course-specific minimum average marks apply.

### Medicine

- Requires Physics, Chemistry, and Biology.
- NEET qualification is mandatory.
- Course-specific minimum average marks apply.

### Commerce

- Requires Accountancy, Business Studies, and Economics.

### Humanities

Required subjects depend on the selected course.

The application evaluates the selected course's criteria and provides alternative course recommendations when the student is not eligible.

## Database

MongoDB is used to store:

- Student personal details.
- Subject-wise marks.
- Entrance examination qualification.
- Selected course and category.
- Eligibility status and reason.
- Recommended alternative courses.
- Submission timestamps.

## Screenshots

Add screenshots of the following application screens before submission:

1. Student Registration
2. Eligibility Result
3. Submission History

Suggested folder:

```text
screenshots/
├── student-registration.png
├── eligibility-result.png
└── submission-history.png
```

## Validation and Error Handling

- Frontend form validation.
- Backend request validation.
- Age and marks range validation.
- Course and category validation.
- Meaningful API error responses.
- Loading indicators during API requests.
- Empty-state handling for submission history.

## Security Notes

- Keep database credentials in environment variables.
- Do not commit `.env` files.
- Configure production CORS and database access before deployment.

## Author

Developed as a Course Eligibility Portal assessment project.
