# SQL(PostgreSQL)

## 쿼리 실행 순서

SQL 쿼리문을 실행하는데 순서가 존재❗️❗️

```
SQL Query Execution Order
FROM and JOIN -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY -> LIMIT
                              |
                               ----- window functions execute here
```

### FROM (+ JOIN)

- 쿼리의 첫 번째 실행 순서는 FROM절! FROM 절에서는 조회하는 **테이블 전체**를 가져온다.

### WHERE 절

- WHERE 절에서는 FROM 절에서 읽어온 테이블에서 **조건에 맞는 결과만 갖도록** 데이터를 필터링한다.

### GROUP BY 절

- GROUP BY 절에서는 **선택한 칼럼으로 그룹핑한다.**

### HAVING 절

- HAVING 절은 **그룹핑 후에 각 그룹에 사용되는 조건절**이다.
- **HAVING 절은 각 그룹에 조건을 걸기 때문에 퍼포먼스가 떨어지게 된다.**
  - GROUP BY로 그룹별 집계함수를 구하는 경우를 제외하고는 HAVING 보다는 WHERE절로 한 번에 거는 것이 좋다.(현재는 내부적으로 Optimize 해준다.)

### SELECT 절

- SELECT 절은 여러 조건들을 처리한 후 남은 데이터에서 **어떤 열을 출력해줄지 선택한다.**

### ORDER BY 절

- 어떤 열까지 출력할지 정했다면 행의 순서를 어떻게 보여줄지 **정렬**해주는 절이 ORDER BY이다.

### LIMIT 절

- LIMIT 절은 결과 중 몇 개의 행을 보여줄지 선택한다.

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
  - **Underscore \_**
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
- What customer \_ids are eligible for platinum status?

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

## JOINS

### AS

- Before we learn about JOINs, let's quickly cover the `AS` clause which allows us to create an "alias" for a column or result.
- Syntax
  ```sql
  SELECT column AS new_name FROM table
  ```
  ```sql
  SELECT SUM(column) AS new_name FROM table
  ```
- THe `AS` operator gets executed at the very end of a query, meaning that we can not use the `ALIAS` inside a `WHERE` operator.
- Error
  ```sql
  # total_spent는 Data Output의 제일 마지막에 존재한다.
  SELECT customer_id, SUM(amount) AS total_spent
  FROM payment
  GROUP BY customer_id
  HAVING total_spent > 100
  ```
  ```sql
  ### 아래 sql도 에러 발생
  SELECT customer_id, amount AS new_name
  FROM payment
  WHERE new_name > 2
  ```

### JOIN operation?

- `JOINs` allow us to combine multiple tables together.
- The main reason for the different `JOIN` types is to decide how to deal with information only present in one of the joined tables.

### INNER JOIN

```
  -----    -----
/      / X \     \
|  A   | X |  B   |
\      \ X /     /
  -----    -----
```

- `INNER JOIN`은 두 테이블을 모두 충족하는 레코드 세트를 결과로 출력한다.
- Syntax

  ```sql
  # 같은 결과
  SELECT * FROM Table_A
  INNER JOIN Table_B
  ON Table_A.col_match = Table_B.col_match

  SELECT * FROM Table_B
  INNER JOIN Table_A
  ON Table_A.col_match = Table_B.col_match
  ```

- Remember that table order won't matter in an `INNER JOIN`
- Also if you see just `JOIN` without the `INNER`, **PostgreSQL** will treat it as an `INNER JOIN`

### OUTER JOIN

- They will allow us to specify how to deal with values only present in one of the tables being joined.
  - 결합되는 테이블 중 하나에만 표시되는 값을 처리하는 방식이다.
  - OUTER JOIN은 단순한 INNER JOIN 보다 복잡항ㄴ JOIN이다.
- These are the more complex `JOINs`, take your time whe trying to undestand them!
- In these lectures we will explain:
  - `FULL OUTER JOIN`
    - Clarifying `WHERE` null


  - `LEFT OUTER JOIN`
    - Clarifying `WHERE` null


  - `RIGHT OUTER JOIN`
    - Clarifying `WHERE` null



### FULL OUTER JOIN

```
  ------     ------
/ X X X / X \ X X X \
| X A X | X | X B X |
\ X X X \ X / X X X /
  ------     ------
```

- Syntax
  ```sql
  # 위 아래 같은 결과가 나옴
  # 벤다이어그램이 대칭이기 때문에 테이블 순서를 서로 바꿀 수 있다.
  SELECT * FROM Table_A
  FULL OUTER JOIN Table_B
  ON Table_A.col_match = Table_B.col_match
  SELECT * FROM Table_B
  FULL OUTER JOIN Table_A
  ON Table_A.col_match = Table_B.col_match
  ```

#### FULL OUTER JOIN Example

```sql
SELECT * FROM Registrations FULL OUTER JOIN Logins
ON Registartions.name = Logins.name
```

| REGISTRATIONS |         |
| ------------- | ------- |
| reg_id        | name    |
| 1             | Andrew  |
| 2             | Bob     |
| 3             | Charlie |
| 4             | Davie   |

| LOGINS |         |
| ------ | ------- |
| 1      | Xavier  |
| 2      | Andrew  |
| 3      | Yolanda |
| 4      | Bob     |

| RESULTS |         |        |         |
| ------- | ------- | ------ | ------- |
| red_id  | name    | log_id | name    |
| 1       | Andrew  | 2      | Andrew  |
| 2       | Bob     | 4      | Bob     |
| 3       | Charlie | null   | null    |


| 4       | David   | null   | null    |


| null    | null    | 1      | Xavier  |


| null    | null    | 3      | Yolanda |



#### FULL OUTER JOIN with WHERE

```
  ------     ------
/ X X X /   \ X X X \
| X A X |   | X B X |
\ X X X \   / X X X /
  ------     ------
```

- Get rows unique to either table(rows not found in both tables)
  - 이것을 이용하여 둘 중 하나의 테이블에 고유한 행을 구할 수 있다.
  - 두 테이블에 모두 나와있지 않은 행을 구하는 것
  - 기본적으로 INNER JOIN과 정반대되는 개념이다.
  ```sql
  SELECT * FROM Table_A
  FULL OUTER JOIN Table_B
  ON Table_A.col_match = Table_B.col_match
  WHERE Table_A.id IS null OR TableB.id IS null


  ```
- Example
  ```sql
  SELECT * FROM Registrations FULL OUTER JOIN Logins
  ON Registartions.name = Logins.name
  WHERE Registartions.reg_id IS null OR


  Logins.log_id IS null


  ```
  | RESULTS |         |        |         |
  | ------- | ------- | ------ | ------- |
  | red_id  | name    | log_id | name    |
  | 3       | Charlie | null   | null    |


  | 4       | David   | null   | null    |


  | null    | null    | 1      | Xavier  |


  | null    | null    | 3      | Yolanda |



#### FULL OUTER JOIN with WHERE Exampler

- 우리 대여점에서 실제로 아무것도 구매하지 않은 사람의 고객 ID는 보유하지 않으려고 한다.
- 새로운 개인정보 보호법이고, 아무것도 구매하지 않은 고객의 ID가 존재하거나 결제 정보에 고객 ID가 없으면 위반

```sql
SELECT * FROM customer
FULL OUTER JOIN payment
ON customer.customer_id = payment.customer_id
WHERE customer.customer_id IS null OR


payment.customer_id IS null


```

- 결과가 0이 나오면 성공

### LEFT OUTER JOIN

```
  ------     ------
/ X X X / X \       \
| X A X | X |   B   |
\ X X X \ X /       /
  ------     ------
```

- A `LEFT OUTER JOIN` results in the set of records that are in the left table, if there is no match with the right table, if there is no match with the right table, the results are null.


  ```sql
  SELECT * FROM Table_A
  LEFT OUTER JOIN Table_B
  ON Table_A.col_match = Table_B.col_match
  ```
  - 테이블 A에서 정보를 가져올 것인데 이 정보 중에서 테이블 A에만 해당되는 것도 있고, 테이블 B에 있는 것 중 테이블 A와 겹치는 부분만 가져온다.

#### LEFT OUTER JOIN Example

```sql
SELECT * FROM Registrations
LEFT OUTER JOIN Logins
ON Registrations.name = Logins.name
```

| RESULTS |         |        |        |
| ------- | ------- | ------ | ------ |
| red_id  | name    | log_id | name   |
| 1       | Andrew  | 2      | Andrew |
| 2       | Bob     | 4      | Bob    |
| 3       | Charlie | null   | null   |


| 4       | David   | null   | null   |



#### LEFT OUTER JOIN With WHERE

```
  ------     ------
/ X X X /   \       \
| X A X |   |   B   |
\ X X X \   /       /
  ------     ------
```

```sql
SELECT * FROM Table_A
LEFT OUTER JOIN Table_B
ON Table_A.col_match = Table_B.col_match
WHERE Table_B.id Is null


```

- What if we only wanted entries unique to Table A? Those rows found in Table A and **not** found int Table B
- Get rows unique to left table

```sql
SELECT * FROM Registrations
LEFT OUTER JOIN Logins
ON Registrations.name = Logins.name
WHERE Logins.log_id IS null


```

| RESULTS |         |        |      |
| ------- | ------- | ------ | ---- |
| red_id  | name    | log_id | name |
| 3       | Charlie | null   | null |


| 4       | David   | null   | null |



#### LEFT OUTER JOIN Example

- film 테이블에만 있거나 film과 inventory 모두에 있는 행만 확인할 것

```sql
SELECT film.film_id, film.title, inventory_id
FROM film
LEFT OUTER JOIN inventory
ON inventory.film_id = film.film_id
```

- inventory를 가지고 있지 않은 영화를 찾기 - 42개 나오면 성공
- Alice Fantasia는 어떤 매장에 있냐 물었을 때 아래 쿼리를 통해 없다는 것을 확인할 수 있다.

```sql
SELECT film.film_id, film.title, inventory_id
FROM film
LEFT OUTER JOIN inventory
ON inventory.film_id = film.film_id
WHERE inventory.film_id IS null


```

### RIGHT JOIN

```
  ------     ------
/       / X \ X X X \
|   A   | X | X B X |
\       \ X / X X X /
  ------     ------
```

- A `RIGHT JOIN` is essentially the same as a `LEFT JOIN`, except the tables are switched.
- This would be the same as switching the table order in a `LEFT OUTER JOIN`.
  ```sql
  SELECT * FROM Table_A
  RIGHT OUTER JOIN Table_B
  ON Table_A.col_match = Table_B.col_match
  ```

#### RIGHT JOIN With WHERE

```
  ------     ------
/       /   \ X X X \
|   A   |   | X B X |
\       \   / X X X /
  ------     ------
```

```sql
SELECT * FROM Table_A
RIGHT OUTER JOIN Table_BQ
ON Table_A.col_match = Table_B.col_match
WHERE Table_A.id IS null


```

### UNIIONs

- The `UNION` operator is used to combine the result-set of two or more `SELECT` statements.
  - 2개 이상의 SELECT 문의 결과 세트를 결합할 수 있다.
- It basically serves to directly concatenate two results together, essentially "pasting" them together.
  - JOIN과 UNION의 기본적인 차이는 UNION은 두 결과를 직접 붙인다는 것이다.
  - 두 SELECT 문의 결과를 서로의 바로 위에 붙여준다.
- Syntax
  ```sql
  SELCT column_name(s) FROM table1
  UNION
  SELECT column_name(s) FROM table2
  ```

### JOINS Challenges

#### JOINS Challenges 1

- California sales tax laws have changed and we need to alert our customers to this through email.
- What are the emails of the customers who live in California?

```sql
SELECT district, email FROM customer
JOIN address
ON customer.address_id = address.address_id
WHERE address.district = 'California';
```

#### JOINS Challenge 2

- A customer walks in and is a huge fan of the actor "Nick Wahlberg" and wants to know which movies he is in.
- Get a list of all the movies "Nick Wahlberg" has been in.

```sql
SELECT title, first_name, last_name
FROM film_actor
INNER JOIN film ON film.film_id = film_actor.film_id
INNER JOIN actor ON actor.actor_id = film_actor.actor_id
WHERE first_name = 'Nick' AND last_name = 'Wahlberg'
```

## Advanced SQL Topics

- Timestamps and EXTRACT
- Math Functions
- String Functions
- Sub-query
- Self-Join

### Timestamps and Extract

- We've already seen that **PostgreSQL** can hold date and time information:
  - `TIME` - Contains only time
  - `DATE` - Contains only date
  - `TIMESTAMP` - Contains date and time
  - `TIMESTAMPTZ` - Contains date, time, and timezone
- Careful considerations should be made when designing a table and database and choosing a time data type.
- Depending on the situation you may or may not need the full level of `TIMESTAMPTZ`
- Remember you can always remove historial information, but you can't add it!
- Let's explore functions and operations related to these specific data types:
  - TIMEZONE
  - NOW
  - TIMEOFDAY
  - CURRENT_TIME
  - CURRENT_DATE
- Extracting information from a time based data type using:
  - EXTRACT()
  - AGE()
  - TO_CHAR()
- EXTRACT()
- Allows you to "extract" or obtain a sub-component of a data value
  - YEAR
  - MONTH
  - DAY
  - WEEK
  - QUARTER
- AGE()
  - Calculates and returns the current age given a timestamp
  - Usage:
    - AGE(data_col)
  - Returns
    - 13 years 1 mon 5 days 01:34:13.003423
- TO_CHAR()
  - General function to convert data types to text
  - Useful for timestamp for formatting
  - Usage
    - TO_CHAR(data_cool, 'mm-dd-yyyy')
  - https://www.postgresql.org/docs/15/functions-formatting.html

### Timestamps and Extract Challenge

#### Timestamps and Extract Challenge 1

- During which months did payments occur?
- Format your answer to return back the full month name.

```sql
SELECT DISTINCT(TO_CHAR(payment_date, 'MONTH'))
FROM payment;
```

#### Timestamps and Extract Challenge 2

- How many payments occurred on a Monday?
- NOTE: We didn't show you exactly how to do this, but use the documentation or Google to figure this out!

```sql
SELECT COUNT(*)
FROM payment
WHERE EXTRACT(dow FROM payment_date) = 1;
```

### Mathematical Functions

- This is best shown through examples and the documentation.
  - https://www.postgresql.org/docs/current/functions-math.html

### String Functions and Operations

- PostgreSQL also provides a variety of string functions and operators that allow us to edit, combine, and alter text data columns.
  - https://www.postgresql.org/docs/current/functions-string.html

```sql
SELECT upper(first_name) || ' ' || upper(last_name) as name FROM customer;
```

### SubQuery

- A subquery allows you to construct complex queries, essentially performing a query on the results of another query.
- The syntax is straightforward and involves two `SELECT` statements.
- Standard Query
  ```sql
  SELECT student, grade
  FROm test_scores
  ```
- How can we get a list of students who scored better than the average grade?
  - It looks like we need two steps, first get the average grade, then compare the rest of the table against it.
  - This is where a subquery can helps us get the result in a "single" query request
  ```sql
  SELECT student, grade
  FROM test_scores
  WHERE grade > (SELECT AVG(grade) FROM test_scores)
  ```
- The subquery is performed first since it is inside the parenthesis.
- We can also use the `IN` operator in confunction with a subquery to check againnst multiple results returned.
- The `EXISTS` operator is used to test for existence of rows in a subquery.
- Typically a subquery is passed in the `EXISTS()` funciton to check if any rows are returned with the subquery.
- Typical Syntax
  ```sql
  SELECT column_name
  FROM table_name
  WHERE EXISTS
  (SELECT column_name FROM table_name WHERE condition)'
  ```

#### Subquery + IN Operator Example

- rental이 2005-05-29일자인 영화 제목을 보여주세요.
- 서브쿼리가 다양한 결과를 가져오면, IN 오퍼레이터를 사용해야 한다.

```sql
SELECT film_id, title
FROM film
WHERE film_id IN
(SELECT inventory.film_id
FROM rental
INNER JOIN inventory ON inventory.inventory_id = rental.inventory_id
WHERE rental_date BETWEEN '2005-05-29' AND '2005-05-30')
```

#### Subquery + WHERE EXISTS Example

- 11 달러 초과로 한 번 이상 지급한 고객의 이름과 성을 알고 싶어요.

```sql
SELECT first_name, last_name
FROM customer AS c
WHERE EXISTS(
	SELECT * FROM payment as p
	WHERE p.customer_id = c.customer_id
	AND amount > 11
)
```

- 고객표의 각 고객에 대해 서브 쿼리가 지급표를 확인해 한 번 이상의 지급을 했는지 확인
- 이 기준에 맞게 한 번 이상의 지급을 한 특정 고객이 있고, 그 금액이 11달러를 초과했는지를 확인

### Self-Join

- A self-join is a query in which a table is joined to itself.
- Self-joins are useful for comparing values in a column of rows within the same table.
  - 평범한 INNER JOIN처럼 일반적이지 않다.
- The self join can be viewed as a join of two copies of the same table.
- The table is not actually copied, but SQL performs the command as though it were.
- There is no special keyword for a self join, its simply standard `JOIN` syntax with the same table in both parts.
- However, when using a self join it is necessary to use an alias for the table, otherwise the table names would be ambiguous.
- Syntax
  ```sql
  SELECT table_A.col, table_B.col
  FROM table AS table_A
  JOIN table AS table_B
  ON table_A.some_col = table_B.other_col
  ```

#### Example

- 영화 길이는 같지만 다른 영화 제목을 가진 데이터를 주세요.

```sql
SELECT f1.title, f2.title, f1.length
FROM film AS f1
INNER JOIN film AS f2
ON f1.film_id != f2.film_id
AND f1.length = f2.length
```

## Creating Databases and Tables

### Data Types

- Boolean
  - True or False
    \_ Character
  - char, varchar, and text
- Numeric
  - integer and floating-point number
- Temporal
  - date, time, timestamp, and interval
- UUID
  - Universally Unique Identifiers
  - 특정 열의 고유 식별자를 만들기 위한 본질적인 알고리즘 고유 코드인 UUID
- Array
  - Stores an array of stirngs, numbers, etc.
- JSON
- Hstore key-value pair
- Special types such as network address and geometric data
- When creating databases and tables, you should carefully consider which data types should be used for the data to be stored.
- Review the documentation to see limitations of data types:
  - https://www.postgresql.org/docs/current/datatype.html
- Based on the limitations, you may think it makes sense to store it as a `BIGINT` data type, but we should really be thinking what is best for the situation.
- Why bother with numerics at all?
- We don't perform arithmetic with numbers, so it probably makes more sense as a `VARCHAR` data type instead.
- In fact, searching for best practice online, you will discover its usually recommended to store as a text based data type due to a variety of issues
  - No arithmetic performed
  - Leading zeros could cause issues, 7 and 07 treated same numerically, but are not the same phone number

### Primary and Foreign Keys

- A primary key is a column or a group of columns used to identify a row uniquely in a table.
- For example, in our dvdrental database we saw customers had a unique, non-null 

customer_id column as their primary key.
- A foreign key is a field or group of fileds in a table that uniquely identifies a row in another table.
- A foreign key is defined in a table taht references to the primary key of the other table.
- The table that contains the foreign key is called referencing table or child table.
- The table to which the foreign key references is called referenced table or parent table.
- A table can have multiple foreign keys depending on its relationships with other tables.
- You may begin to realize primary key and foreign key typically make good column choices for joining together two or more tables.
- When creating tables and defining columns, we can use constraints to define columns as being a primary key, or attaching a foreign key relationship to another table.

### Constraints

- Constraints are the rules enforced on data columns on table.
- There are used to prevent invalid data from being entered into the database.
- This ensures the accuracy and reliability of the data in the database.
- Constraints can be divided into two main categories:
  - Column Constraints
    - Constraints the data in a column to adhere to certain conditions.
  - Table Constraints
    - applied to the entire table rather than to an individual column.

#### The most common constraints used:

- **NOT NULL** Constraint
  - Ensures that a column cannot have NULL value.
- **UNIQUE** Constraint
  - Ensures that all values in a column are different.
- **PRIMARY Key**
  - Uniquely identifies each row/record in a database table.
- **FOREIGN Key**
  - Constraints data based on columns in other tables.
- **CHECK** Constraint
  - Ensures that all values in a column satisfy certain conditions.
  - 행의 모든 값이 특정한 조건읆 만족하도록 함
- **EXCLUSION** Constraint
  - Ensures that if any two rows are compared on the specified column or expression using the specified operator, not all of these comparisons will return **TRUE**.
  - 특정 오퍼레이터를 사용한 특정 열이나 식에서 어떤 두 열이 비교될 떄 모든 비교 값이 참으로 판명되지 않아야 한다는 조건

#### Table Constraints

- **CHECK** (condition)
  - to check a condition when inserting or updating data.
  - 전체 표에 데이터를 삽입하거나 업데이트할 때 조건을 적용할 수 있다.
- **REFERENCES**
  - to constrain the value stored in the column that must exist in a column in another table.
  - 세로단의 값에 제한을 거는 것으로 다른 표 세로단에 존재해야 한다는 조건
- **UNIQUE** (column_list)
  - forces the values stored in the columns listed inside the parentheses to be unique.
- **PRIMARY KEY** (column_list)
  - Allows you to define the primary key that consists of multiple columns.

### CREATE

#### Full General Syntax

```sql
CREATE TABLE table_name (
  column_name TYPE column_constraint,
  column_name TYPE column_constraint,
  table_constraint table_constraint
) INHERITS existing_table_name;
```

```sql
CREATE TABLE account(
	user_id SERIAL PRIMARY KEY,
	username VARCHAR(50) UNIQUE NOT NULL,
	password VARCHAR(50) NOT NULL,
	email VARCHAR(250) UNIQUE NOT NULL,
	created_on TIMESTAMP NOT NULL,
	last_login TIMESTAMP
)

CREATE TABLE job(
	job_id SERIAL PRIMARY KEY,
	job_name VARCHAR(200) UNIQUE NOT NULL
)

CREATE TABLE account_job(
	user_id INTEGER REFERENCES account(user_id),
	job_id INTEGER REFERENCES job(job_id),
	hire_date TIMESTAMP
)
```

#### SERIAL

- In PostgreSQL, a sequence is a special kind of database object that generates a sequence of integers.
- A sequence is often used as the primary key column in a table.
- It will create a sequence object and set the next value generated by the sequence as the default value for the column.
- This is perfect for a primary key, because it logs unique integer entries for you automatically upon insertion.
- If a row is later removed, the column with the **SERIAL** data type will **not** adjust,
  marking the fact that a row was removed from the sequence, for example
  - 1, 2, 3, 5, 6, 7
    - You know row 4 was removed at some point

### INSERT

- `INSERT` allows you to add in rows to a table.
- General Syntax
  - INSERT INTO table (column1, column2, ...) VALUES (value1, value2), (value1, value2), ...;
- Keep in mind, the inserted row values must match up for the table, including constraints.
- `SERIAL` columns do not need to be provided a value

```sql
INSERT INTO account(username, password, email, created_on)
VALUES ('Jaewon', 'password', 'jaewon@mail.com', CURRENT_TIMESTAMP);

INSERT INTO job(job_name) VALUES ('Web Programmer')

INSERT INTO account_job(user_id, job_id, hire_date)
VALUES (1, 1, CURRENT_TIMESTAMP)
```

### UPDATE

- The `UPDATE` keyword allows for the changing of values of the columns in a table.
- General Syntax
  ```sql
  UPDATE table
  SET column1 = vbalue1, column2 = value2, ...
  WHERE condition;
  ```
- Example
  ```sql
  UPDATE account
  SET last_login = CURRENT_TIMESTAMP
  WHERE last_login IS NULL:
  ```
- Using another table's values (UPDATE join)

  ```sql
  UPDATE Table_A
  SET original_col = Table_B.new_col
  FROM table_B
  WHERE Table_A.id = Table_B.id

  UPDATE account_job
  SET hire_date = account.created_on
  FROM account
  WHERE account_job.user_id = account.user_id;
  ```

- Return affected rows
  ```sql
  UPDATE account
  SET last_login = created_on
  RETURNING account_id, last_login
  ```
  - 결과값에 영향이 있는 값을 불러올 수 있다.
  - `UPDATE` 명령을 쓸 떄, 결과가 보여지지 않지만 영향을 받은 특정 세로단을 확인하고 싶은 경우 명령할 수 있다.

### DELETE

- We can use the `DELETE` clause to remove rows from a table.
  ```sql
  DELETE FROM table
  WHERE row_id = 1
  ```
- We can delete rows based on their presence in toehr tables.
  ```sql
  DELETE FROM table_A
  USING table_B
  WHERE table_A.id = Table_B.id
  ```
- We can delete all rows from a table.
  ```sql
  DELETE FROM table
  ```
- Similar to `UPDATE` command, you can also add in a `RETURNING` call to return rows that were removed.

### ALTER

> https://www.postgresql.org/docs/current/sql-altertable.html

- The `ALTER` clause allows for changes to an existing table structure, such as:
  - Adding, dropping, or renaming columns
  - Changing a column's data type
  - Set `DEFAULT` values for a column
  - Add `CHECK` constraints
  - Rename table
- General Syntax

  ```sql
  ALTER TABLE table_name action

  # Example
  ALTER TABLE information RENAME TO new_info
  ```

- Adding Columns
  ```sql
  ALTER TABLE table_name
  ADD COLUMN new_col TYPE
  ```
- Removing Columns
  ```sql
  ALTER TABLE table_name
  DROP COLUMN col_name
  ```
- Alter constraints
  ```sql
  ALTER TABLE table_name
  ALTER COLUMN col_name
  SET DEFAULT value # SET NO NULL # DROP DEFAULT # DROP NOT NULL # ADD CONSTRAINT constraint_name
  ```

### DROP TABLE

- `DROP` allows for the complete removal of a column in a table.
- In PostgreSQL, this will also automatically remove all of its indexes and constraints involving the column.
- However, it will not remove columns used in views, triggers, or stored procedures without the additional `CASCADE` clause.
- General Syntax
  ```sql
  ALTER TABLE table_name
  DROP COLUMN col_name
  ```
- Remove all dependencies
  ```sql
  ALTER TABLE table_name
  DROP COLUMN col_name CASCADE
  ```
- Check for existence to avoid error

```sql
ALTER TABLE table_name
DROP COLUMN IF EXISTS col_name
```

- Drop multiple columns
  ```sql
  ALTER TABLE table_name
  DROP COLUMN col_one,
  DROP COLUMN col_two
  ```

### CHECK Constraint

- The `CHECK` constraint allows us to create more customized constraints that adhere to a certain condition.
- Such as making sure all inserted integer values fall below a certain threshold.
- General Syntax
  ```sql
  CREATE TABLE example(
    ex_id SERIAL PRIMARY KEY,
    age SMALLINT CHECK (age > 21),
    parent_age SMALLINT CHECK (parent_age > age)
  )
  ```

#### Example

```sql
CREATE TABLE employees(
	  emp_id SERIAL PRIMARY KEY,
	  first_name VARCHAR(50) NOT NULL,
	  last_name VARCHAR(50) NOT NULL,
	  birthdate DATE CHECK (birthdate > '1900-01-01'),
	  hire_date DATE CHECK (hire_date > birthdate),
	  salary INTEGER CHECK (salary > 0)
);

# ERROR:  new row for relation "employees" violates check constraint "employees_birthdate_check"
INSERT INTO employees(first_name, last_name, birthdate, hire_date, salary)
VALUES ('Jose', 'Portilla', '1899-11-03', '2010-01-01', 100);
```

## Conditional Expressions and Operators(조건식과 프로시저)

### CASE

- We can use the `CASE` statement to only execute SQL code when certain conditions are met.
- This is very similar to `IF/ELSE` statements in other programming languages.
- There are two main ways to use a `CASE` statement, either a general `CASE` or a `CASE` expression.
- Both methods can load to the same results.
- General Syntax

  ```sql
  CASE
    WHEN condition1 THEN result1
    WHEN condition2 THEN result2
    ELSE some_other_result
  END

  SELECT a,                             ---------------------
  CASE WHEN a = 1 THEN 'one'           |    a     |   label  |
       WHEN a = 2 THEN 'two'           |---------------------|
  ELSE 'other' AS label                |    1     |    one   |
  END                                  |    2     |    two   |
  FROM test;                            ---------------------
  ```

- CASE Expression Syntax

  ```sql
  CASE expression
    WHEN value1 THEN result1
    WHEN value2 THEN result2
    ELSE some_other_result
  END

  SELECT a,
    CASE a WHEN 1 THEN 'one'
           WHEN 2 THEN 'two'
           ELSE 'other'
    END
  FROM test;
  ```

#### CASE Example

```sql
SELECT customer_id,
CASE
	WHEN (customer_id <= 100) THEN 'Preminum'
	WHEN (customer_id BETWEEN 100 and 200) THEN 'Plus'
	ELSE 'Normal'
END AS customer_class
FROM customer;

SELECT customer_id,
CASE customer_id
	WHEN 2 THEN 'Winner'
	WHEN 5 THEN 'Second Place'
	ELSE 'Normal'
END AS raffle_results
FROM customer;

SELECT
SUM(CASE rental_rate
	WHEN 0.99 THEN 1
	ELSE 0
END) AS number_of_bargains,
SUM(CASE rental_rate
   WHEN 2.99 THEN 1
   ELSE 0
END) AS regular,
SUM(CASE rental_rate
   WHEN 4.99 THEN 1
   ELSE 0
END) AS premium
FROM film;
```

#### Challenge

- We want to know and compare the various amouns of films we have per movie rating.
- Use `CASE` and the dvdrental database to re-create this table:
  ```sql
  SELECT
    SUM(CASE rating WHEN 'R' THEN 1 ELSE 0 END) AS r,
    SUM(CASE rating WHEN 'PG' THEN 1 ELSE 0 END) AS pg,
    SUM(CASE rating WHEN 'PG-13' THEN 1 ELSE 0 END) AS pg13
  FROM film;
  ```

### COALESCE

- The `COALESCE` function accepts an unlimited number of arguments. It returns the first argument that is not null. If all arguments are null, the `COALESCE` function 

will return null.


  - COALESCE (arg_1, arg_2, ..., arg_n)
- Example
  - SELECT COALESCE (1, 2) --> 1
  - SELECT COALESCE (NULL, 2, 3) --> 2
- The `COALESCE` function becomes useful when querying a table that contains null 

values and substituting it with another value.

```sql
SELECT item, (price - COALESCE(discount, 0)) AS final FROM table;
```

- Keep the `COALESCE` function in mind in case you encounter a table with null values 

that you want to perform operations on!

## CAST

- The `CAST` operator let you convert from one data type into another.
- Keep in mind not every instance of a data type can be `CAST` to another data type, it must be reasonable to convert the data, for example `5` to an integer wil work, `five` to an integer will not.
- Syntax from `CAST` function
  - SELECT CAST('5' AS INTEGER)
- PostgreSQL CAST operator
  - SELECT '5'::INTEGER
- Keep in mind you can then use this in a `SELECT` query with a column name instead of a single instance.
  - **SELECT CAST(data AS TIMESTAMP) FROM table**

```sql
# inventory_id -> integer
SELECT CHAR_LENGTH(CAST(inventory_id AS VARCHAR)) FROM rental;

# ERROR:  function char_length(integer) does not exist
SELECT CHAR_LENGTH(inventory_id) FROM rental;
```

### NULLIF

- The `NULLIF` function takes in 2 inputs and returns `NULL` if both are equal, otherwise it returns the first argument passed.
  - NULLIF(arg1, arg2)
- Example
  - NULLIF(10, 10)
    - Returns NULL
  - NULLIF(10, 12)
    - Returns 10
- This becomes very useful in cases where a `NULL` value would cause an error or unwanted result.

#### Example

- Given this table calculate the ratio of Department A to Department B
  - We can see easily the ratio of A to B is 2:1 or 200%

| Name   | Department |
| ------ | ---------- |
| Lauren | A          |
| Vinton | A          |
| Claire | B          |

```sql
# 2가 나온다.
SELECT (
	SUM(CASE WHEN department = 'A' THEN 1 ELSE 0 END) /
	SUM(CASE WHEN department = 'B' THEN 1 ELSE 0 END)
) AS department_ratio
FROM depts 

# B 부서 사람이 없다면?
DELETE FROM depts
WHERE department = 'B'

# ERROR:  division by zero
SELECT (
	SUM(CASE WHEN department = 'A' THEN 1 ELSE 0 END) /
	SUM(CASE WHEN department = 'B' THEN 1 ELSE 0 END)
) AS department_ratio
FROM depts

# 해결
SELECT (
	SUM(CASE WHEN department = 'A' THEN 1 ELSE 0 END) /
	NULLIF(SUM(CASE WHEN department = 'B' THEN 1 ELSE 0 END), 0)
) AS department_ratio
FROM depts
```

| Name   |
| ------ |
| [null] |

### VIEWS

- Often there are specific combinations of tables and conditions that you find yourself using quite often ofr a project.
- Instead of having to perform the same query over and over again as a starting point, you can create a `VIEW` to quickly see this query with a simple call.
- A `VIEW` is a database object that is of a stored query.
- A view can be accessed as a virtual table in PostgreSQL.
- Notice that a view does not store data physically, it simply stores the query.
- You can also update and alter existing views.

```sql
CREATE (OR REPLACE) VIEW customer_info AS
SELECT first_name, last_name, address
FROM customer
INNER JOIN address
ON customer.address_id = address.address_id;

SELECT * FROM customer_info;

DROP VIEW IF EXISTS customer_info;

ALTER VIEW customer_info RENAME TO c_info;
```

