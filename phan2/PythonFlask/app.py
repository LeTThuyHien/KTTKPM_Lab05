from flask import Flask
app = Flask(__name__)

@app.route('/')
def hello():
    return "<h1>Kết quả Bài 9: Python Flask chạy thành công!</h1>"

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)