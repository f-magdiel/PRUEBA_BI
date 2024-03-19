from dotenv import load_dotenv
import os

load_dotenv()

DB_USR = os.environ['DB_USR']
DB_PASS = os.environ['DB_PASS']
DB_HOST = os.environ['DB_HOST']
DB_NAME = os.environ['DB_NAME']

PORT = os.environ['PORT']