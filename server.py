# server.py 
from jina import Executor

Executor.serve(protocol='websocket', port=12345)