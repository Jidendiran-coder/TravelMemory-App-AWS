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
- 
![image](https://github.com/user-attachments/assets/87d151f6-e23c-4285-baa5-d996dfa37f27)

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
![image](https://github.com/user-attachments/assets/dee74197-589c-4f91-86a8-c8648f8954e9)
![image](https://github.com/user-attachments/assets/287b4e43-b657-4940-bca1-cbc74fbd0bc3)
![image](https://github.com/user-attachments/assets/265b60dc-99ba-4a85-803d-b336052820e4)
![image](https://github.com/user-attachments/assets/23543b95-2160-41e4-a9d1-aa1252c2c86d)


#### 🔁 Configure NGINX Reverse Proxy

```bash
sudo apt install nginx
sudo systemctl status nginx

sudo unlink /etc/nginx/sites-enabled/default
cd /etc/nginx/sites-available/
sudo nano custom_server.conf
```
![image](https://github.com/user-attachments/assets/759bfc65-a3cd-46dd-95f1-688dae57e52d)

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
![image](https://github.com/user-attachments/assets/724f8b4a-8f05-40ca-a380-00e12baed91b)

Now, backend is accessible at **port 80** via public IP.

![image](https://github.com/user-attachments/assets/c6c5bd98-3cef-4f6f-bb68-c2c3cbb85477)

---

### 2️⃣ Frontend Setup & Backend Connection

#### 🚀 Launch Frontend EC2 (Instance: `Jidendiran_TM_frontend`)

* **AMI**: Ubuntu
* **Type**: t2.micro

![image](https://github.com/user-attachments/assets/4df489bf-09a6-4c79-bff6-1f233f1cfa06)

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
![image](https://github.com/user-attachments/assets/2dbf898d-dbf4-48c2-a0a8-82f32514f67a)

![image](https://github.com/user-attachments/assets/a6840c12-d5c0-4b60-a86a-60a1a7a07d6d)

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
    server_name <frontend_IP>;

    location / {
        proxy_pass http://<frontend_IP>:3000;
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
![image](https://github.com/user-attachments/assets/4d56f215-90aa-4ac5-a24e-bed169acbd2c)

Now change the backend url from 3000 to 80

![image](https://github.com/user-attachments/assets/8653f5fc-78d1-455d-958f-428bede3a885)

Now, the frontend is available on **port 80**.

![image](https://github.com/user-attachments/assets/97b25b1f-b8af-4c24-90f8-2526e7ee6b17)

---

### 🔁 Restarting Application (Post Shutdown)

**Backend**
If stopped, easy steps to turn the app again in EC2:
```bash
# cd /etc/nginx/sites-available/
# sudo nano custom_server.conf
    server { 
    listen 80;
    location / {
    proxy_pass http://<backend_Updated_IP>:3000;
    }}
# nginx -t
# sudo service nginx configtest
# sudo service nginx restart
# cd /home/ubuntu/TravelMemory-App-AWS/backend
# node index.js
```

**Frontend**

```bash
# cd /home/ubuntu/TravelMemory-App-AWS/frontend/src
# sudo nano url.js
    export const baseUrl = process.env.REACT_APP_BACKEND_URL || "http://<backend_Updated_IP>:3000";
# cd /etc/nginx/sites-available/
# sudo nano custom_server.conf
    server {
        listen 80;
        server_name <frontend_Updated_ip>;

        location / {
            proxy_pass http://<frontend_updated_ip>:3000;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }
    }
# nginx -t
# sudo service nginx configtest
# sudo service nginx restart
# cd /home/ubuntu/TravelMemory-App-AWS/frontend/
# npm start
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

![image](https://github.com/user-attachments/assets/e736c915-5ba2-4347-a8bf-389782631634)

![image](https://github.com/user-attachments/assets/9c79d1c7-6f92-43be-99cb-28931ed6f885)

Ensure:

* Load balancers are deployed in **multiple Availability Zones (AZs)**.
* Associate appropriate target groups with the load balancers.

![image](https://github.com/user-attachments/assets/29009401-9b7c-41f9-98d3-df0916062fb2)

![image](https://github.com/user-attachments/assets/238481ea-bdc7-483b-9fb2-cd82e908a58e)

![image](https://github.com/user-attachments/assets/475ce3bb-c1a7-4d2b-90d2-0c9fa6f7f218)

![image](https://github.com/user-attachments/assets/58b15bf9-38e7-4ef6-9952-298c20481f23)

Now Both the Load Balancers are working good

![image](https://github.com/user-attachments/assets/12c0804e-6766-43b4-baf3-b2cc03958710)

![image](https://github.com/user-attachments/assets/37665d7a-43e9-49e5-b280-539a3dd4843a)

---

### 4️⃣ Domain Configuration via Cloudflare

* Custom domain: **Jidendir.in**
* Subdomain for backend: **back.Jidendir.in**

#### 🛠 Steps:

* Add **CNAME** record in Cloudflare pointing to frontend Load Balancer.
* Add **CNAME or A record** for backend (subdomain → backend ELB or IP).
* Update `url.js` in frontend:
* 
![image](https://github.com/user-attachments/assets/583727ae-de30-42eb-a40a-edad10a093dd)

![image](https://github.com/user-attachments/assets/60cd9a42-5b10-48e8-b8fd-2081c8061ad8)

![image](https://github.com/user-attachments/assets/e480d1ea-234d-4258-ac8c-fbfa4f2907ff)

```js
export const baseUrl = process.env.REACT_APP_BACKEND_URL || "https://back.adarshkumars.co.in";
```

Now you can access the application via domain names:

* Frontend: (http://travelmemory.jidendir.in)
* Backend: (http://back.jidendir.in)

![image](https://github.com/user-attachments/assets/7bafc528-7b1b-4487-b335-1f9765e7a00f)


---

📌 **Maintained by:** [@Jidendiran-coder](https://github.com/Jidendiran-coder)

```
