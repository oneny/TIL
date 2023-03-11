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

| RESULTS |         |        |         |
| ------- | ------- | ------ | ------- |
| red_id  | name    | log_id | name    |
| 3       | Charlie | null   | null    |
| 4       | David   | null   | null    |
  


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
-  EXTRACT()
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


