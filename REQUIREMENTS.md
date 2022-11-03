# The storefronts_dev database schema
List of schemas
  Name  |  Owner   |  Access privileges   |      Description
--------+----------+----------------------+------------------------
 public | postgres | postgres=UC/postgres+| standard public schema
        |          | =UC/postgres         |

# 
Table "public.users"
  Column   |         Type          | Collation | Nullable |              Default
-----------+-----------------------+-----------+----------+-----------------------------------
 id        | integer               |           | not null | nextval('users_id_seq'::regclass)
 firstname | character varying(50) |           |          |
 lastname  | character varying     |           |          |
 account   | character varying(50) |           |          |
 password  | character varying     |           |          |
Indexes:
    "users_pkey" PRIMARY KEY, btree (id)
Referenced by:
    TABLE "orders" CONSTRAINT "orders_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id)

#
Table "public.orders"
 Column  |  Type   | Collation | Nullable |              Default
---------+---------+-----------+----------+------------------------------------
 id      | integer |           | not null | nextval('orders_id_seq'::regclass)
 user_id | bigint  |           | not null |
 status  | integer |           | not null |
Indexes:
    "orders_pkey" PRIMARY KEY, btree (id)
Foreign-key constraints:
    "orders_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id)
Referenced by:
    TABLE "order_products" CONSTRAINT "order_products_order_id_fkey" FOREIGN KEY (order_id) REFERENCES orders(id)

# 
Table "public.products"
  Column  |       Type        | Collation | Nullable |               Default
----------+-------------------+-----------+----------+--------------------------------------
 id       | integer           |           | not null | nextval('products_id_seq'::regclass)
 name     | character varying |           |          |
 price    | integer           |           |          |
 category | integer           |           |          |
Indexes:
    "products_pkey" PRIMARY KEY, btree (id)
Referenced by:
    TABLE "order_products" CONSTRAINT "order_products_product_id_fkey" FOREIGN KEY (product_id) REFERENCES products(id)

# Data shapes for order_products table
Table "public.order_products"
   Column   |  Type   | Collation | Nullable |                  Default
------------+---------+-----------+----------+--------------------------------------------
 id         | integer |           | not null | nextval('order_products_id_seq'::regclass)
 quantity   | integer |           |          |
 order_id   | bigint  |           |          |
 product_id | bigint  |           |          |
Indexes:
    "order_products_pkey" PRIMARY KEY, btree (id)
Foreign-key constraints:
    "order_products_order_id_fkey" FOREIGN KEY (order_id) REFERENCES orders(id)
    "order_products_product_id_fkey" FOREIGN KEY (product_id) REFERENCES products(id)