-- Create Roles Table
CREATE TABLE roles (
    id INT PRIMARY KEY AUTO_INCREMENT,
    role_name VARCHAR(50) UNIQUE NOT NULL
);

-- Create Users Table
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
);

-- Create Permissions Table
CREATE TABLE permissions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    permission_name VARCHAR(100) UNIQUE NOT NULL
);

-- Create Role-Permissions Table
CREATE TABLE role_permissions (
    role_id INT NOT NULL,
    permission_id INT NOT NULL,
    PRIMARY KEY (role_id, permission_id),
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
    FOREIGN KEY (permission_id) REFERENCES permissions(id) ON DELETE CASCADE
);

-- Create Solar Panels Table
CREATE TABLE solar_panels (
    id INT PRIMARY KEY AUTO_INCREMENT,
    panel_type VARCHAR(50) NOT NULL,
    efficiency DECIMAL(5,2) NOT NULL,
    capacity_kw DECIMAL(6,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Installations Table
CREATE TABLE installations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    client_id INT NOT NULL,
    installer_id INT NOT NULL,
    panel_id INT NOT NULL,
    status ENUM('Pending', 'Installed', 'Maintenance') NOT NULL DEFAULT 'Pending',
    installed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (client_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (installer_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (panel_id) REFERENCES solar_panels(id) ON DELETE CASCADE
);

-- Create Energy Data Table
CREATE TABLE energy_data (
    id INT PRIMARY KEY AUTO_INCREMENT,
    client_id INT NOT NULL,
    panel_id INT NOT NULL,
    energy_produced DECIMAL(10,2) NOT NULL,
    date_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (client_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (panel_id) REFERENCES solar_panels(id) ON DELETE CASCADE
);

-- Create Payments Table
CREATE TABLE payments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    client_id INT NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    status ENUM('Paid', 'Unpaid', 'Pending') NOT NULL DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (client_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create System Logs Table
CREATE TABLE system_logs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    action TEXT NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
