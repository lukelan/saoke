## Usage

### window subsytem start

```
wsl
```

### Connect turso db

turso db shell saoke-mttq
turso db show saoke-mttq -> get db TURSO_DATABASE_URL
turso db tokens create saoke-mttq -> create TURSO_AUTH_TOKEN

### Setup .env file

create .env file

TURSO_DATABASE_URL="libsql://saoke-mttq-vuminhkhang009.turso.io"
TURSO_AUTH_TOKEN="eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MjY3MTYwODksImlkIjoiMjJhMGY4ZjctMWIyZC00MGY0LTgwYjYtMTgxN2M0OGExZTIzIn0.ir1jjCBPwLCjSwiYyZv6Na14Zv55qgnNpEgTlb_srEtyC8dq_d0Ut4rnNU9YXyWpWspkGB_641UFTXhHkQeXAQ"

### Import data & create FTS

```
deno run --allow-net --allow-read --allow-env import_csv.ts 
```

### Start the app

```
deno task start
```

This command will start the Deno server and serve the web application.

### Clean the data

1. Convert PDF to text:
   ```
   pdftotext -layout saoke.pdf
   ```

2. Clean the data:
   ```
   deno run -A clean-data.js
   ```

This process uses regular expressions to extract and format the necessary data from the PDF text.

## Demo

![saoke](demo.png "Demo")
