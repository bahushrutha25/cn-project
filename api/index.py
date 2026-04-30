from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from sklearn.cluster import OPTICS
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
# Allow CORS from a specific frontend URL if defined in .env, otherwise allow all
frontend_url = os.getenv("FRONTEND_URL", "*")
CORS(app, resources={r"/api/*": {"origins": frontend_url}})

@app.route('/api/cluster', methods=['POST'])
def cluster():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    
    file = request.files['file']
    min_samples = int(request.form.get('min_samples', 3))

    try:
        df = pd.read_csv(file)
        if 'x' not in df.columns or 'y' not in df.columns:
            return jsonify({"error": "CSV must contain 'x' and 'y' columns"}), 400
            
        X = df[['x', 'y']]

        model = OPTICS(min_samples=min_samples)
        labels = model.fit_predict(X)

        return jsonify({
            "x": df['x'].tolist(),
            "y": df['y'].tolist(),
            "labels": labels.tolist()
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# For local development
if __name__ == '__main__':
    app.run(debug=True)
