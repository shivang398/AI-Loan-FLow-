#!/bin/bash
# LocalStack ready hook (mounted into /etc/localstack/init/ready.d): creates the S3 bucket the backend
# uploads documents to, so a fresh local setup works without manual steps. Name must match AWS_S3_BUCKET.
BUCKET="${AWS_S3_BUCKET:-realmoney-document-personal-loan}"
awslocal s3api head-bucket --bucket "$BUCKET" 2>/dev/null || awslocal s3 mb "s3://$BUCKET"
