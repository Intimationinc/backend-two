from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from passlib.context import CryptContext


pwd_context = CryptContext(schemes=["sha256_crypt"])

app = FastAPI()


@app.get("/")
def read_root(request: Request):
    content = "Hello World"
    etag = pwd_context.hash(content)
    if request.headers.get("if-None-Match") == etag:
        return JSONResponse(status_code=304)
    headers = {"Cache-Control": "private, max-age=10", "Etag": etag}
    print("Hit")
    return JSONResponse(content=content, headers=headers, status_code=200)
