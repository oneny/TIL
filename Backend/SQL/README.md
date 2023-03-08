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

## GROUP BY와 집계 함수

- `GROUP BY` will allow us to aggregate data and apply functions to better understand how data is distributed per category.

### Aggregate Functions

- SQL provides a variety of aggregate functions.
- The main idea behind an aggregate function is to take multiple inputs and return a single output.
- https://www.postgresql.org/docs/current/functions-aggregate.html
- Most Common Aggregate Functions:
  - `AVG()` - returns average value
  - `COUNT()` - returns number of values
  - `MAX()` - returns maximum value
  - `MIN()` - returns minimum value
  - `SUM()` - returns the sum of all values
- Aggregate function calls happen only in the `SELECT` clause or the `HAVING` clause.
  - 집계 함수는 SELECT 절이나 HAVING 절에서만 호출된다.
- **Special Notes**
  - `AVG()` returns a floating point value many decimal places (e.g. 2.342418)
    - You can use `ROUND()` to specify precision after the decimal.
  - `COUNT()` simply returns the number of rows, which means by convention we just use `COUNT(*)`

### GROUP BY

- `GROUP BY` allows us to aggregate columns per some category.
- Syntax
  ```sql
  SELECT category_col, AGG(data_col) FROM table GROUP BY category_col
  ```
- The `GROUP BY` clause must appear right after a `FROM` or `WHERE` statement.
  ```sql
  SELECT category_col, AGG(data_col)
  FROM table
  WHERE category_col != 'A'
  GROUP BY category_col
  ```
- In the `SELECT` statement, columns must either have an aggregate function or be in the `GROUP BY` call.
  - 실제 SELECT 문에서 열에 집계 함수가 적용되어 있고 다른 열을 불러오려면 `GROUP BY`는 필수❗️❗️❗️
  ```sql
  SELECT company, division, SUM(sales)
  FROM finance_table
  GROUP BY company, division
  ```
  - 이 쿼리의 결과는 회사별 부서별 판매액의 총합이 된다.
- `WHERE` statements should not refer to the aggregation result, later on we will learn to use `HAVING` to filter on those results.
  - 주의할 것은 WHERE문에는 집계 함수를 입력해서는 안된다. 아래 경우는 `sales`가 해당한다.
  - 추후에 `HAVING`문을 이용하여 결과를 필터링하는 방법이 나올 것이다.
  ```sql
  SELECT company, division, SUM(sales)
  FROM finance_table
  WHERE division IN ('marketing', 'transport')
  GROUP BY company, division
  ```
- If you want to sort results based on the aggregate, make sure to reference the entire function
  - 집계를 바탕으로 결과를 분류하려면 전체 함수를 참조해야 한다.
  ```sql
  SELECT company, SUM(sales)
  FROM finance_table
  GROUP BY company
  ORDER BY SUM(sales)
  ```

```sql
# 30. GROUP By - 2부
SELECT DATE(payment_date), SUM(amount) FROM payment
GROUP BY DATE(payment_date)
ORDER BY SUM(amount) DESC
```

### GROUP BY Challenge

#### Challenge 1

- We have two staff members, with Staff IDs 1 and 2. We want to give a bonus to the staff member that handled the most payments. (Most in terms of number of payments processed, not total dollar amount).
- How many payments did each staff member handle and who gets the bonus?

```sql
SELECT staff_id, COUNT(amount)
FROM ayment
GROUP BY staff_id
ORDER BY COUNT(amount) DESC
```

#### Challenge 2

- Corporate HQ is conducting a study on the relationship between replacement cost and a movie MPAA rating (e.g. G, PG, R, etc...).
- What is the average replacement cost per MPAA rating?
  - Note: You may need to expand the AVG column to view correct results.

```sql
SELECT rating, ROUND(AVG(replacement_cost), 2)
FROM film
GROUP BY rating
```

#### Challenge 3

- We are running a promotion to reward our top 5 customers with coupons.
- What are the customer ids of the top 5 customers by total spend?

```sql
SELECT customer_id, SUM(amount)
FROM payment
GROUP BY customer_id
ORDER BY SUM(amount) DESC
LIMIT 5
```

### HAVING

- The `HAVING` clause allows us to filter `after` an aggregation has already taken place.
  - HAVING절은 집계가 이미 수행된 **이후에** 자료를 필터링하기 때문에 GROUP BY 뒤에 있어야 한다.
  ```sql
  SELECT company, SUM(sales)
  FROM finance_table
  GROUP BY company
  ```
- We've already seen we can filter before executing the `GROUP BY`, but what if we want to filter based on `SUM(sales)`?
  - We can not use `WHERE` to filter based off of aggregate results, because those happen **after** a `WHERE` is executed.
  ```sql
  SELECT company, SUM(sales)
  FROM finance_table
  WHERE company != 'Google'
  GROUP BY company
  ```
  - SUM(sales)을 기준으로 필터링하고 싶다면?
    - => 집계 함수는 `GROUP BY`문이 맨 밑에서 수행된 후에야 실행된다.
    - 즉, `WHERE`를 사용해서는 집계된 결과를 바탕으로 필터링할 수 없다.(집계는 WHERE문 실행된 후에 실행되기 떄문에)
  ```sql
  # WHERE 필터리르 적용하고 나서 GROUP BY를 호출한 후에 HAVING에 판매액 총액이 1,000 달러보다 큰 값을 조건으로 다시 필터링
  SELECT company, SUM(sales)
  FROM finance_table
  WHERE company != 'Google'
  GROUP BY company
  HAVING SUM(sales) > 1000  
  ```
    - 따라서 `GROUP BY`를 실행하고 회사별 판매액 총계를 계산한 후에 그 결과를 추가적으로 필터링하기 위해 `HAVING`절을 추가할 수 있다.
    - `HAVING` allows us to use the aggregate result as a filter along with a `GROUP BY`z
    - `GROUP BY`와 마찬가지로 `HAVING`은 집계 결과를 필터로 사용할 수 있다.
      - `WHERE`문처럼 생각할 수 있지만 `GROUP BY`를 통해 집계된 것에만 적용할 수 있다.

### HAVING Challenge

#### Challenge 1

- We are launching a platinum service for our most loyal customers. We will assign platinum status to customers that have had 40 or more transaction payments.
- What customer _ids are eligible for platinum status?

```sql
SELECT customer_id, COUNT(amount)
FROM payment
GROUP BY customer_id
HAVING COUNT(amount) >= 40
```

#### Challenge 2

- What are the customer ids of customemrs who have spent more than $100 in payment transactions with our staff_id member 2?

```sql
SELECT customer_id, SUM(amount)
FROM payment
WHERE staff_id = 2
GROUP BY customer_id
HAVING SUM(amount) > 100
```