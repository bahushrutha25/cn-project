from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import pandas as pd
from sklearn.cluster import OPTICS
import os

app = Flask(__name__)
CORS(app)

if not os.path.exists("static"):
    os.makedirs("static")

@app.route('/cluster', methods=['POST'])
def cluster():

    file = request.files['file']
    min_samples = int(request.form.get('min_samples', 3))

    df = pd.read_csv(file)
    X = df[['x','y']]

    model = OPTICS(min_samples=min_samples)
    labels = model.fit_predict(X)

    df['cluster'] = labels
    df.to_csv("static/result.csv", index=False)

    return jsonify({
        "x": df['x'].tolist(),
        "y": df['y'].tolist(),
        "labels": labels.tolist()
    })

@app.route('/download')
def download():
    return send_file("static/result.csv", as_attachment=True)

if __name__ == '__main__':
    app.run(debug=True)