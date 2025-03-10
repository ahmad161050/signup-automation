
---
# 🛠️ Signup Automation - Playwright & Cucumber

This project is a **Test Automation Framework** using **Playwright** with **Cucumber (BDD)** to automate user signup scenarios.

## 🚀 **Project Setup**
Follow these steps to set up the project on your local machine.

### **1️⃣ Prerequisites**
Ensure you have the following installed:
- **Node.js (v16 or later)** 👉 [Download](https://nodejs.org/)
- **npm (v8 or later)** (comes with Node.js)
- **VS Code or another editor** for writing and debugging tests
- **Google Chrome** (or preferred browser)

### **2️⃣ Clone the Repository**
```sh
git clone https://github.com/yourusername/signup-automation.git
cd signup-automation
```

### **3️⃣ Install Dependencies**
```sh
npm install
```
_(If there are dependency conflicts, try:)_
```sh
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

---

## 🛠️ **Project Structure**
```
signup-automation/
│── node_modules/                 # Installed dependencies
│── tests/                         # Contains all tests
│   ├── features/                  # Cucumber feature files
│   │   ├── signup.feature          # Signup scenarios
│   ├── step-definitions/           # Step definitions for Cucumber
│   │   ├── signupSteps.ts          # Glue code for feature files
│   ├── page-objects/               # Page Object Model (POM) files
│   │   ├── signupPage.ts           # POM for signup page interactions
│── playwright-report/              # Playwright test reports
│── reports/                        # Cucumber test reports
│   ├── TestsExecutionVideo.mp4     # Test execution recording
│   ├── TestExecution.png           # Screenshot of test results
│── .gitignore                      # Ignored files
│── cucumber.js                     # Cucumber configuration file
│── package.json                     # Project dependencies and scripts
│── tsconfig.json                    # TypeScript configuration
│── README.md                        # This documentation
```

---

## 🎯 **How to Run Tests**
### **1️⃣ Run All Tests**
```sh
npm test
```

### **2️⃣ Run a Single Scenario**
```sh
npx cucumber-js tests/features/signup.feature --tags "@debug"
```

### **3️⃣ Run with Debug Logs**
```sh
DEBUG="pw:api" npm test
```

### **4️⃣ Run Tests in Headed Mode**
```sh
npx playwright test --headed
```

---

## 📊 **Test Execution Results**
- ✅ **Execution Video:** The complete test execution recording can be found in:
  - 📂 `reports/TestsExecutionVideo.mp4`
- 📸 **Test Result Screenshot:** The screenshot of the latest test execution is available at:
  - 📂 `reports/TestExecution.png`

---

## 🔥 **Troubleshooting**
### **1️⃣ Dependencies Conflict**
If `npm install` fails, try:
```sh
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

### **2️⃣ Playwright Issues**
```sh
npx playwright install --with-deps
```

---

## 📌 **Best Practices**
✔ Use **Page Object Model (POM)** for test structure  
✔ Add **waitForSelector** before interacting with elements  
✔ Use **headless mode** for faster test execution  
✔ Ensure **proper waits** before interacting with UI elements  

---

## 🎯 **Contributing**
Contributions are welcome!  
- Fork the repository  
- Create a feature branch (`git checkout -b feature-branch`)  
- Commit your changes (`git commit -m "Add new feature"`)  
- Push to the branch (`git push origin feature-branch`)  
- Open a pull request  

---

## 📝 **License**
This project is licensed under the **MIT License** - feel free to modify and use it as needed.

```
