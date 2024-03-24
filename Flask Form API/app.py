from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/form', methods=['POST'])
def process_form():
    data = request.json 
    print("Received form data:", data)
    response = {'message': 'Form data received successfully'}
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True) 
