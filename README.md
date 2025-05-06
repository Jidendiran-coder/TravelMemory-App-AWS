Here's a professionally formatted `README.md` file based on your provided content:

---

````markdown
# 🌍 Travel Memory Application Deployment Guide

## 📁 Project Repository

Access the complete codebase of the Travel Memory application here:  
🔗 [https://github.com/UnpredictablePrashant/TravelMemory](https://github.com/UnpredictablePrashant/TravelMemory)

---

## 🎯 Objective

- Set up the backend running on Node.js.
- Configure the frontend built with React.
- Ensure seamless communication between frontend and backend.
- Deploy the full-stack application on AWS EC2 instances.
- Scale the application using load balancers and multiple instances.
- Connect a custom domain using Cloudflare.

---

## ✅ Tasks Overview

### 1️⃣ Backend Configuration

#### 🔧 Steps:
1. Clone the repository and navigate to the backend directory.
2. Backend runs on port `3000`; configure reverse proxy via NGINX.
3. Update `.env` with MongoDB connection and port info.

#### 🚀 Launch Backend EC2 (Instance: `Jidendiran_TM_Backend`)
- **AMI**: Ubuntu  
- **Type**: t2.micro

```bash
#!/bin/bash 
sudo apt update
sudo bash
curl -s https://deb.nodesource.com/setup_18.x | sudo bash
sudo apt install nodejs -y
cd /home/ubuntu/
git clone https://github.com/Jidendiran-coder/TravelMemory-App-AWS.git
````

```bash
cd TravelMemory-App-AWS/backend
npm install mongodb
nano .env
# Add the following:
MONGODB_URI='mongodb+srv://joel:<Password>@cluster-mern.c0kcm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster-MERN'
PORT=3000
npm install
node index.js
```

* ✅ Ensure MongoDB Atlas IP Access list includes the EC2 public IP.

#### 🔁 Configure NGINX Reverse Proxy

```bash
sudo apt install nginx
sudo systemctl status nginx

sudo unlink /etc/nginx/sites-enabled/default
cd /etc/nginx/sites-available/
sudo nano custom_server.conf
```

```nginx
server {
    listen 80;
    location / {
        proxy_pass http://<backend_IP>:3000;
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/custom_server.conf /etc/nginx/sites-enabled/custom_server.conf
nginx -t
sudo service nginx restart
```

Now, backend is accessible at **port 80** via public IP.

---

### 2️⃣ Frontend Setup & Backend Connection

#### 🚀 Launch Frontend EC2 (Instance: `Jidendiran_TM_frontend`)

* **AMI**: Ubuntu
* **Type**: t2.micro

```bash
sudo apt update
sudo bash
curl -s https://deb.nodesource.com/setup_18.x | sudo bash
sudo apt install nodejs -y
cd /home/ubuntu/
git clone https://github.com/Jidendiran-coder/TravelMemory-App-AWS.git
```

```bash
cd TravelMemory-App-AWS/frontend/src
nano url.js
# Update with backend IP or ELB URL:
export const baseUrl = process.env.REACT_APP_BACKEND_URL || "http://<backend_ip>:3000";
```

#### 🔁 NGINX Configuration for Frontend

```bash
sudo apt install nginx
sudo unlink /etc/nginx/sites-enabled/default
cd /etc/nginx/sites-available/
sudo nano custom_server.conf
```

```nginx
server {
    listen 80;
    server_name 65.2.6.196;

    location / {
        proxy_pass http://65.2.6.196:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/custom_server.conf /etc/nginx/sites-enabled/custom_server.conf
nginx -t
sudo service nginx restart

cd /home/ubuntu/TravelMemory-App-AWS/frontend/
npm install
npm start
```

Now, the frontend is available on **port 80**.

---

### 🔁 Restarting Application (Post Shutdown)

**Backend**

```bash
cd /home/ubuntu/TravelMemory-App-AWS/backend
node index.js
```

**Frontend**

```bash
cd /home/ubuntu/TravelMemory-App-AWS/frontend/src
nano url.js
# Ensure correct backend URL is configured

cd /home/ubuntu/TravelMemory-App-AWS/frontend/
npm start
```

---

### 3️⃣ Scaling the Application

* Create additional EC2 instances using **Snapshots/AMIs** of existing frontend/backend.
* Add these instances to **Target Groups**.

#### 📦 EC2 > Target Groups

Create:

* `TG-Frontend` → Add all frontend instances
* `TG-Backend` → Add all backend instances

#### 🌐 EC2 > Load Balancers

Create:

* Application Load Balancer for Frontend
* Application Load Balancer for Backend

Ensure:

* Load balancers are deployed in **multiple Availability Zones (AZs)**.
* Associate appropriate target groups with the load balancers.

---

### 4️⃣ Domain Configuration via Cloudflare

* Custom domain: **adarshkumars.co.in**
* Subdomain for backend: **back.adarshkumars.co.in**

#### 🛠 Steps:

* Add **CNAME** record in Cloudflare pointing to frontend Load Balancer.
* Add **CNAME or A record** for backend (subdomain → backend ELB or IP).
* Update `url.js` in frontend:

```js
export const baseUrl = process.env.REACT_APP_BACKEND_URL || "https://back.adarshkumars.co.in";
```

Now you can access the application via domain names:

* Frontend: [adarshkumars.co.in](http://adarshkumars.co.in)
* Backend: [back.adarshkumars.co.in](http://back.adarshkumars.co.in)

---

## ✅ Final Notes

* Monitor NGINX, Node.js status regularly.
* Ensure security groups allow HTTP (80), HTTPS (443), and custom ports as needed.
* Consider using **PM2** for production Node.js process management.
* Apply HTTPS via Cloudflare SSL settings.

---

📌 **Maintained by:** [@Jidendiran-coder](https://github.com/Jidendiran-coder)

```

---

Would you like me to generate and attach this `README.md` file directly for download?
```
