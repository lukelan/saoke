import "jsr:@std/dotenv/load";

//export const config = {
//  dbUrl: Deno.env.get("TURSO_DATABASE_URL")!,
//  dbAuthToken: Deno.env.get("TURSO_AUTH_TOKEN")!,
//  env: Deno.env.get("ENV")!,
//};

export const config = {
  dbUrl: "libsql://saoke-mttq-vuminhkhang009.turso.io",
  dbAuthToken: "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MjY3MTYwODksImlkIjoiMjJhMGY4ZjctMWIyZC00MGY0LTgwYjYtMTgxN2M0OGExZTIzIn0.ir1jjCBPwLCjSwiYyZv6Na14Zv55qgnNpEgTlb_srEtyC8dq_d0Ut4rnNU9YXyWpWspkGB_641UFTXhHkQeXAQ",
  env: Deno.env.get("ENV")!,
};
