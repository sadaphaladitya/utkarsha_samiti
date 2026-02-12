-- Database for Sevabhai Utkarsha Samiti
CREATE DATABASE IF NOT EXISTS utkarsha_db;
USE utkarsha_db;

-- Table for Gallery Photos
CREATE TABLE IF NOT EXISTS gallery (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    image_path VARCHAR(255) NOT NULL,
    likes INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table for Comments
CREATE TABLE IF NOT EXISTS gallery_comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    photo_id INT NOT NULL,
    comment TEXT NOT NULL,
    user_name VARCHAR(100) DEFAULT 'Guest',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (photo_id) REFERENCES gallery(id) ON DELETE CASCADE
);

-- Table for Admission Forms
CREATE TABLE IF NOT EXISTS admissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_name VARCHAR(255) NOT NULL,
    dob DATE NOT NULL,
    parent_name VARCHAR(255) NOT NULL,
    mobile VARCHAR(15) NOT NULL,
    standard VARCHAR(50) NOT NULL,
    address TEXT NOT NULL,
    notes TEXT,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
