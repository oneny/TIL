# SQL(PostgreSQL)

## SELECT

- `SELECT` is the most common statement used, and it allows us to retrieve information from a table.

### Example syntaxfor SELECT statement

```sql
SELECT column_name FROM table_name
SELECT * FROM table_1
SELECT c1, c2 FROM table_2
```

- In general, it is not good practice to use an asterisk in the SELECT statement if you don't really need all columns.
- It will automatically query everything, which increases traffic between the database server and the apoplication, which can slow down the retrieval of results.
- If you only need certian columns, do your best to only query for those columns.
- 따라서 모든 열을 포함한 테이블의 전체 정보가 정말 필요한 경우메만 별표를 사용한다.

### SELECT DISTINCT

- Sometimes a table contains a column that has duplicate values, and you may find yourself in a situation where you only want to list the unique/distinct values.
- The `DISTINCT` keyword can be used to return only the distinct values in a column.
- The `DISTINCT` keyword operates `on` a column. The syntax looks like this:
  ```sql
  SELECT DISTINCT column FROM table
  ```
- To clarify which column `DISDICT` is being applied to, you can also use parenthesis for clarity:
  ```sql
  SELECT DISTINCT(column) FROM table
  ```
- if adding more calls such as `COUNT` and `DISTINCT` together, the parenthesis will be necessary.
  ```sql
  SELECT DISTINCT column FROM table
  ```

### COUNT

- The `COUNT` function returns the number of input rows that match a specific confition of a query.
- We can apply `COUNT` on a specific column or just pass `COUNT(*)`, we will soon see this should return the same result.
- `COUNT` is much more useful when combined with other commands, such as `DISTINCT`

### SELECT WHERE

- `SELECT` and `WHERE` are the most fundamental SQL statements and you will find yourself useing them often!
- The `WHERE` statement allows us to specify conditions on colmns for the rows to be returned.
- The `WHERE` clause appears immediately after the FROM clause of the SELECT statement.
- The conditions are used to filter the rows returned from the SELECT statement.
- PostgreSQL provides a variety of standard operators to construct the conditions.

### ORDER BY

- You may have noticed PostgreSQL sometimes returns the same request query results in a different order.
- You can use `ORDER BY` to sort rows based on a column value, in either ascending or descending order.
- Basic syntax for `ORDER BY`
  ```sql
  SELECT column_1, column_2 FROM table ORDER BY column_1 ASC / DESC
  ```
- Notice `ORDER BY` towards the end of a query, since we want to do any selection and filtering firsrt, before finally sorting.
  - **`ORDER BY`를 쿼리 가장 끝에 두어 SQL이 가장 마지막에 실행하게 한다**
- If you leave it blank, `ORDER BY` uses `ASC` by default.
- You can also `ORDER BY` multiple columns

### LIMIT

- The `LIMIT` command allows us to limit the number of rows returned for a query.
- Useful for not wanting to return every single row in a table, but only view the top few rows to get an idea of the table layout.
- `LIMIT` also becomes useful in combination with `ORDER BY`
- `LIMIT` goes at the very end of a query request and is the last command to be executed.
  - 왜냐하면 `LIMIT`이 하는 일은 `WHERE` 문으로 필터링하고 `ORDER BY`로 정렬 및 분류하고 쿼리하려는 기타 모든 종류의 조건이나 필터를 적용한 후에 `LIMIT`이 등장하여 최종적으로 몇 개의 행으로 표시하고 싶은지를 묻는다.

### BETWEEN

- The `BETWEEN` operator can be used to match a value against a range of values:
  ```sql
  value_1 BETWEEN low AND high
  ```
- You can also combine `BETWEEN` with the `NOT` logical operator:
  ```sql
  value_1 NOT BETWEEN low AND high
  ```
- When using `BETWEEN` operator with dates that also include timestamp information, pay careful attention to useing `BETWEEN` versus `<=`, `>=` comparison operators, due to the fact that a datetime starts at `0:00`

### IN

- In certain cases you want to check for multiple possible value options, for example, if a user's name shows up `IN` a list of known names.
- We can use the `IN` operator to create a condition that checks to see if a value in included in a list of multiple options.
- The general syntax is:
  ```sql
  value_1 IN (option1, option2, ..., option_n)
  ```

### LIKE & ILIKE

- The `LIKE` operator allows us to perform pattern matching against string data with the use of `wildcard` characters:
  - **Percent %**
    - Matches any sequence of characters
  - **Underscore _**
    - Matches any single character
- All names that begin with an `A`
  ```sql
  WHERE name LIKE 'A%'
  ```
- All names that end with an `a`
  ```sql
  WHERE name LIKE '%a'
  ```
- Notice that `LIKE` is case-sensitive, we can use `ILIKE` which is case-insensitive
- Using the underscore allows us to replace just a single character
  - Get all Mission Impossible films
    ```sql
    WHERE title LIKE 'Mission Impossible _'
    ```
- You can use multiple underscores
- Imagine we had version string codes in the format 'Version#A4', 'Version#B7', etc...
  ```sql
  WHERE value_1 LIKE 'Version#__'
  ```
- We can also combine pattern matching operators to create more complex patterns
  ```sql
  # Cheryl, Theresa, Sherri
  WHERE name LIKE '_her%'
  ```
- Here we just focus on `LIKE` and `ILIKE` for now, but keep in mind PostgreSQL does support full regex capabilities:
  - https://www.postgresql.org/docs/12/functions-matching.html
