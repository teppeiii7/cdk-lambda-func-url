# cdk-lambda-func-url

Deploy [Lambda function Urls](https://aws.amazon.com/jp/blogs/aws/announcing-aws-lambda-function-urls-built-in-https-endpoints-for-single-function-microservices/) by AWS CDK.

URL Routing Use [@vendia/serverless-express](https://github.com/vendia/serverless-express).


## Requirements

```
$ cdk --version
2.20.0
$ cdk bootstrap aws://{account_no}/{region} --profile {profileName}
```

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template

## API Request

WebStorm HTTP Client🚀

```
$ vim req.http
### /hoge
GET https://{funcUrl}/hoge
### /fuga
GET https://{funcUrl}/fuga
```