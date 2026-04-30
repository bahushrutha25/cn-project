# OPTICS Clustering Dashboard 🚀

A modern, full-stack web application designed to demonstrate **OPTICS (Ordering Points To Identify the Clustering Structure)** clustering. This dashboard allows users to upload datasets, perform density-based clustering, and visualize results interactively.

![OPTICS Clustering](https://img.shields.io/badge/Algorithm-OPTICS-blue)
![Python](https://img.shields.io/badge/Backend-Python%20%7C%20Flask-green)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-black)

## ✨ Features

- **Interactive Dashboard**: Sleek UI built with modern CSS and Google Fonts.
- **Dynamic Clustering**: Adjust `min_samples` on the fly to see how the OPTICS algorithm adapts.
- **Data Visualization**: High-performance scatter plots powered by **Plotly.js**, supporting zoom, pan, and cluster identification.
- **Anomaly Detection**: Automatically identifies and highlights outliers in the dataset.
- **Downloadable Results**: Export your clustering results directly to a CSV file.
- **Vercel Ready**: Optimized for seamless deployment as a single unified application (Frontend + Serverless Backend).

## 🛠️ Tech Stack

### **Frontend**
- **HTML5/CSS3**: Custom design with a dark-mode aesthetic.
- **JavaScript (Vanilla)**: For UI interaction and client-side data processing.
- **Plotly.js**: For rich, interactive data visualization.

### **Backend**
- **Python**: Core logic and data processing.
- **Flask**: Lightweight API framework.
- **Scikit-learn**: Implementation of the OPTICS clustering algorithm.
- **Pandas**: Efficient CSV data handling.

## 🚀 Getting Started

### **Local Development**

1. **Clone the repository**:
   ```bash
   git clone <your-repo-url>
   cd cn-project
   ```

2. **Set up the backend**:
   ```bash
   pip install -r requirements.txt
   python api/index.py
   ```

3. **Run the frontend**:
   Simply open `index.html` in your browser, or use a Live Server.

### **Vercel Deployment**

This project is configured for **Vercel** zero-config deployment.

1. Install the Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the root directory.
3. Vercel will automatically detect the `api/` folder and deploy the Flask app as a Serverless Function.

## 📊 How to Use

1. **Upload**: Select a CSV file containing `x` and `y` columns.
2. **Configure**: Set the `min_samples` parameter for the OPTICS algorithm.
3. **Run**: Click "Run Clustering" to process the data.
4. **Visualize**: Hover over points in the graph to see cluster labels.
5. **Export**: Click "Download" to save the results.

## 📄 License

This project is for educational purposes. Feel free to use and modify it!
