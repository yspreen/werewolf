# terraform {
#   cloud {
#     organization = "spreen"

#     workspaces {
#       name = "werewolf"
#     }
#   }
# }


terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.8.0"
    }
    random = {
      source  = "hashicorp/random"
      version = "~> 3.1.0"
    }
    archive = {
      source  = "hashicorp/archive"
      version = "~> 2.2.0"
    }

    doppler = {
      source  = "DopplerHQ/doppler"
      version = "1.0.0" # Always specify the latest version
    }
  }

  required_version = "~> 1.0"
}

provider "aws" {
  region  = "us-east-1"
  profile = "hockey"
}

resource "null_resource" "build" {
  provisioner "local-exec" {
    command     = "./build.sh"
    working_dir = "../express"
  }

  triggers = {
    build_trigger = "${timestamp()}"
  }
}

data "archive_file" "lambda_zip" {
  depends_on  = [null_resource.build]
  type        = "zip"
  source_dir  = "../express/bundle"
  output_path = "./express.zip"
}


resource "random_pet" "function_name" {
  prefix = "werewolf"
  length = 2
}

resource "aws_lambda_function" "express_lambda" {
  function_name = random_pet.function_name.id
  handler       = "lambda.handler"

  runtime = "nodejs18.x"
  timeout = 60

  filename         = data.archive_file.lambda_zip.output_path
  source_code_hash = base64sha256(filebase64(data.archive_file.lambda_zip.output_path))

  role = aws_iam_role.lambda_exec.arn

  environment {
    variables = {
      PROD       = "true"
      REDIS_USER = "admin"
      REDIS_PW   = "***REMOVED***"
      REDIS_HOST = "***REMOVED***"
      REDIS_PORT = "15645"
    }
  }
}

resource "aws_iam_role" "lambda_exec" {
  name = "${random_pet.function_name.id}_role"

  assume_role_policy = jsonencode({
    "Version" : "2012-10-17",
    "Statement" : [
      {
        "Action" : "sts:AssumeRole",
        "Principal" : {
          "Service" : "lambda.amazonaws.com"
        },
        "Effect" : "Allow",
        "Sid" : ""
      }
    ]
  })
}

resource "aws_api_gateway_rest_api" "example" {
  name        = "${random_pet.function_name.id}_api"
  description = "Serverless Application"
}

resource "aws_api_gateway_resource" "proxy" {
  rest_api_id = aws_api_gateway_rest_api.example.id
  parent_id   = aws_api_gateway_rest_api.example.root_resource_id
  path_part   = "{proxy+}"
}

resource "aws_api_gateway_method" "proxy" {
  rest_api_id   = aws_api_gateway_rest_api.example.id
  resource_id   = aws_api_gateway_resource.proxy.id
  http_method   = "ANY"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "lambda" {
  rest_api_id = aws_api_gateway_rest_api.example.id
  resource_id = aws_api_gateway_method.proxy.resource_id
  http_method = aws_api_gateway_method.proxy.http_method

  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.express_lambda.invoke_arn
}

resource "aws_api_gateway_method" "proxy_root" {
  rest_api_id   = aws_api_gateway_rest_api.example.id
  resource_id   = aws_api_gateway_rest_api.example.root_resource_id
  http_method   = "ANY"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "lambda_root" {
  rest_api_id = aws_api_gateway_rest_api.example.id
  resource_id = aws_api_gateway_method.proxy_root.resource_id
  http_method = aws_api_gateway_method.proxy_root.http_method

  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.express_lambda.invoke_arn
}

resource "aws_api_gateway_deployment" "example" {
  depends_on = [
    aws_api_gateway_integration.lambda,
    aws_api_gateway_integration.lambda_root,
  ]

  rest_api_id = aws_api_gateway_rest_api.example.id
  stage_name  = "prod"
}

resource "aws_lambda_permission" "apigw" {
  statement_id  = "${random_pet.function_name.id}_invoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.express_lambda.function_name
  principal     = "apigateway.amazonaws.com"

  # The /*/* portion grants access from any method on any resource
  # within the API Gateway "REST API".
  source_arn = "${aws_api_gateway_rest_api.example.execution_arn}/*/*"
}

output "base_url" {
  value = aws_api_gateway_deployment.example.invoke_url
}
