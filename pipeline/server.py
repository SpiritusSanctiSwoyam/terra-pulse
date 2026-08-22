from flask import Flask, jsonify
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)  # Allow frontend to fetch data

@app.route('/api/severity-grid', methods=['GET'])
def get_severity_grid():
    # Go up one directory from pipeline/ to the root, then into output/
    file_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'output', 'severity_grid.json')
    try:
        with open(file_path, 'r') as f:
            data = json.load(f)
        return jsonify(data)
    except FileNotFoundError:
        return jsonify({"error": "Data not found. Please run the ML pipeline first."}), 404

if __name__ == '__main__':
    print("🚀 Starting Terra Pulse ML API Server on port 5001...")
    app.run(host='0.0.0.0', port=5001)
