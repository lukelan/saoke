import { Hono } from "hono";
import { serveStatic } from "hono/deno";

import { db, tableFts } from "./db.ts";

const app = new Hono();

app.get("/", serveStatic({ root: "./public" }));

app.get("/search", async (c) => {
  let query = c.req.query("query") || "";
  query = query.replace(/[^a-zA-Z\s]/g, " ").trim();
  const page = parseInt(c.req.query("page") || "1");
  const limit = parseInt(c.req.query("limit") || "10");

  if (isNaN(page) || page < 1) {
    return c.json({ error: "Invalid page parameter" }, 400);
  }
  if (isNaN(limit) || limit < 1 || limit > 100) {
    return c.json({ error: "Invalid limit parameter" }, 400);
  }

  const offset = (page - 1) * limit;
  console.log({ query, page, limit, offset });

  try {
    let countSql, searchSql, args;
    let queryColumn = tableFts;

    if (query === "") {
      countSql = `SELECT COUNT(*) as total FROM ${tableFts}`;
      searchSql =
        `SELECT * FROM ${tableFts} ORDER BY Date DESC LIMIT ? OFFSET ?`;
      args = [limit, offset];
    } else {
      countSql =
        `SELECT COUNT(*) as total FROM ${tableFts} WHERE ${queryColumn} MATCH ?`;
      searchSql =
        `SELECT * FROM ${tableFts} WHERE ${queryColumn} MATCH ? ORDER BY rank LIMIT ? OFFSET ?`;
      args = [query, limit, offset];
    }

    const countResult = await db.execute({
      sql: countSql,
      args: query ? [query] : [],
    });
    const total = countResult.rows[0].total;

    const result = await db.execute({ sql: searchSql, args });

    const totalPages = Math.ceil(Number(total) / limit);

    return c.json({
      data: result.rows.map((r) => ({
        date: r.Date,
        code: r.Code,
        value: r.Value,
        desc: r.Description,
      })),
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    });
  } catch (error) {
    console.error("Error executing search query:", error);
    return c.json({ error: "An error occurred while searching" }, 500);
  }
});

Deno.serve(app.fetch);
