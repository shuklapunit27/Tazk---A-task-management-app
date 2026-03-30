# 🚀 TAZK - Task Management System

![App Screenshot](Tazk.png)

A high-performance, modern Task Management Web Application built for the **HCLTech Graduate Engineer Trainee** hiring drive.

## 🛠️ Tech Stack

- **Backend:** .NET 10 Web API
- **Frontend:** Angular 21 (Standalone Components & Signals)
- **Database:** EF Core In-Memory
- **Styling:** Custom "Fire" Theme with Angular Material 3

## ✨ Key Features

- **Modern State Management:** Utilizes Angular 21 **Signals** for reactive UI updates and real-time progress tracking.
- **Clean Architecture:** Implemented a 3-layer pattern (Controller -> Service -> Repository) for scalability.
- **Performance:** Optimized for speed with .NET 10's latest Minimal API features.

## 🧱 Architectural Choice: EF Core In-Memory

For this evaluation, I implemented the **In-Memory Database Provider**.

- **Portability:** Ensures the application runs immediately on the reviewer's machine without SQL Server configuration.
- **Speed:** Zero-latency CRUD operations for demonstration purposes.
- _Note: In a production environment, this would be swapped for MS SQL Server using EF Migrations._

## 🏃‍♂️ How to Run

1. **Backend:** Navigate to `/TaskManagerApi` and run `dotnet run`.
2. **Frontend:** Navigate to `/task-management-client`, run `npm install`, then `ng serve`.
3. Open `http://localhost:4200` in your browser.
