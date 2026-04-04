import os
import redis
from flask import Flask

app = Flask(__name__)

cache = redis.Redis(
    host=os.getenv("REDIS_HOST", "redis"),
    port=int(os.getenv("REDIS_PORT", "6379")),
)

@app.route("/")
def hello():
    count = cache.incr("hits")
    return f"Hello from Docker! I have been seen {count} time(s).\n"

# 🔥 BẮT BUỘC có đoạn này
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)