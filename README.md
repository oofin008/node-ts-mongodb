# Note
###### Author: Santi Liwsakphaiboon

### Get start
```sh
  npm i
  docker compose up -d
  npm run dev
```

### Explain
#### For Data Seeding
I implement it as `[POST] localhost:3001/seed`
So, before calling any API, call `/seed` first.

#### Available API
Base path: localhost:3001
| Method | Path |
| ---------- | ---------- |
| GET | /ping |
| POST | /seed |
| GET | /prices |
| GET | /averagePrices |

