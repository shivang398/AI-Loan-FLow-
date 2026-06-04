#!/bin/bash
# Creates all 6 platform databases in MySQL 8 on first start.
set -e

mysql -uroot -p"$MYSQL_ROOT_PASSWORD" << 'SQL'
CREATE DATABASE IF NOT EXISTS platform_auth          CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE DATABASE IF NOT EXISTS platform_sales_ops     CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE DATABASE IF NOT EXISTS platform_customer_docs CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE DATABASE IF NOT EXISTS platform_loan_core     CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE DATABASE IF NOT EXISTS platform_communications CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE DATABASE IF NOT EXISTS platform_analytics_reporting CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
SQL

echo "All 6 MySQL databases created."
