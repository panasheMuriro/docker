**Markdown code** you can copy-paste directly:

````md
# Simple Backend Monitoring with Prometheus & Grafana

This is a minimal monitoring stack using:
- **Node.js backend** exposing Prometheus metrics
- **Prometheus** to scrape and store metrics
- **Grafana** to visualize metrics

---

## 🚀 Getting Started

### 1️⃣ Clone the repo
```bash
git clone https://github.com/yourusername/monitoring-app.git
cd monitoring-app
````

### 2️⃣ Install backend dependencies

```bash
cd app
npm install
cd ..
```

### 3️⃣ Start the stack

```bash
docker compose up --build
```

---

## 📡 Services & Ports

| Service    | URL                                                            | Notes                         |
| ---------- | -------------------------------------------------------------- | ----------------------------- |
| Backend    | [http://localhost:4000](http://localhost:4000)                 | Main API endpoint             |
| Metrics    | [http://localhost:4000/metrics](http://localhost:4000/metrics) | Prometheus-formatted metrics  |
| Prometheus | [http://localhost:9090](http://localhost:9090)                 | Query and explore raw metrics |
| Grafana    | [http://localhost:4001](http://localhost:4001)                 | Dashboards & visualizations   |

---

## 🔑 Grafana Login

* **Username:** `admin`
* **Password:** `admin` *(change on first login)*

---

## 📊 Usage

1. **Generate metrics**:
   Visit `http://localhost:4000` in your browser or run:

   ```bash
   curl http://localhost:4000
   ```

   Each request increments `http_requests_total` and records a request duration.

2. **View raw metrics**:
   Go to `http://localhost:4000/metrics`

3. **Explore in Prometheus**:
   Open `http://localhost:9090` → search for:

   ```
   http_requests_total
   ```

4. **Visualize in Grafana**:

   * Open `http://localhost:4001`
   * Add a new data source → Prometheus → URL: `http://prometheus:9090`
   * Create dashboards using metrics like:

     * `http_requests_total`
     * `rate(http_requests_total[1m])`
     * `histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[1m]))`

---

## 🗂 Project Structure

```
monitoring-app/
├── docker-compose.yml
├── prometheus.yml
├── app/
│   ├── Dockerfile
│   ├── server.js
│   └── package.json
```

---

## 🛑 Stopping the stack

```bash
docker compose down
```

---

## 📌 Notes

* Prometheus scrapes metrics every **5 seconds**.
* Grafana admin password is set in `docker-compose.yml`.
* Internal Docker networking means Prometheus scrapes `app:3000` even though host port is `4000`.

---